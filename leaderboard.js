document.addEventListener("DOMContentLoaded", () => {
  const SOUND_KEY = "aksarayaSoundEnabled";
  const soundButton = document.getElementById("soundButton");
  const soundIcon = document.getElementById("soundIcon");
  const soundManager = window.AksaRayaSound || null;

  // Pemutar cadangan jika aksaraya-sound.js gagal dimuat
  let fallbackAudio = null;
  if (!soundManager) {
    fallbackAudio = new Audio("assets/backsound.mp3");
    fallbackAudio.loop = true;
    fallbackAudio.volume = 0.45;
  }

  let isSoundOn = true;
  try {
    const saved = sessionStorage.getItem(SOUND_KEY);
    if (saved !== null) {
      isSoundOn = saved === "true";
    } else if (soundManager && typeof soundManager.isEnabled === "function") {
      isSoundOn = Boolean(soundManager.isEnabled());
    }
  } catch (e) {}

  function renderSoundIcon(enabled) {
    isSoundOn = Boolean(enabled);
    if (soundIcon) {
      soundIcon.textContent = isSoundOn ? "🔊" : "🔇";
    }
    if (soundButton) {
      soundButton.setAttribute(
        "aria-label",
        isSoundOn ? "Matikan backsound" : "Nyalakan backsound",
      );
      soundButton.setAttribute("aria-pressed", String(isSoundOn));
    }
  }

  async function toggleSound() {
    const targetState = !isSoundOn;
    renderSoundIcon(targetState);

    try {
      sessionStorage.setItem(SOUND_KEY, String(targetState));
    } catch (e) {}

    if (soundManager && typeof soundManager.setEnabled === "function") {
      const actual = await soundManager.setEnabled(targetState);
      renderSoundIcon(actual);
    } else if (fallbackAudio) {
      if (targetState) {
        try {
          await fallbackAudio.play();
        } catch (err) {}
      } else {
        fallbackAudio.pause();
      }
    }
  }

  // Inisialisasi status awal & hubungkan klik tombol speaker
  renderSoundIcon(isSoundOn);

  if (soundManager) {
    if (isSoundOn) {
      soundManager.playIfEnabled?.();
    }
    soundManager.onChange?.(renderSoundIcon);
  } else if (fallbackAudio && isSoundOn) {
    fallbackAudio.play().catch(() => {
      const resumeOnClick = () => {
        if (isSoundOn && fallbackAudio.paused) {
          fallbackAudio.play().catch(() => {});
        }
        document.removeEventListener("pointerdown", resumeOnClick);
      };
      document.addEventListener("pointerdown", resumeOnClick);
    });
  }

  soundButton?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleSound();
  });

  // URL WEB APP APPS SCRIPT
  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbwhptKhl-7U2SeCwvJDjSUVFAK2McFxBvL5gTVgrezU9uWOONTWpwGX6CLAQvTkxDH1/exec";

  const loading = document.getElementById("loading");
  const tableContainer = document.getElementById("tableContainer");
  const tbody = document.getElementById("leaderboardBody");

  function formatWaktu(totalDetik) {
    const m = String(Math.floor(totalDetik / 60)).padStart(2, "0");
    const s = String(totalDetik % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  fetch(GAS_URL)
    .then((response) => response.json())
    .then((data) => {
      loading.hidden = true;
      tableContainer.hidden = false;

      tbody.innerHTML = "";

      data.forEach((siswa, index) => {
        const rank = index + 1;
        let rankClass = "";
        let rankIcon = rank;

        if (rank === 1) {
          rankClass = "rank-1";
          rankIcon = "🥇 1";
        } else if (rank === 2) {
          rankClass = "rank-2";
          rankIcon = "🥈 2";
        } else if (rank === 3) {
          rankClass = "rank-3";
          rankIcon = "🥉 3";
        }

        const row = document.createElement("tr");
        if (rankClass) row.className = rankClass;

        row.innerHTML = `
          <td>${rankIcon}</td>
          <td>${siswa.nama}</td>
          <td>${siswa.absen}</td>
          <td>${siswa.skor} Pts</td>
          <td>${formatWaktu(siswa.waktu)}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      loading.textContent =
        "Gagal memuat papan peringkat. Coba refresh halaman 🔄";
      console.error(error);
    });
});
