document.addEventListener("DOMContentLoaded", () => {
  // Sinkronkan & nyalakan backsound utama di halaman papan peringkat
  const soundButton = document.getElementById("soundButton");
  const soundIcon = document.getElementById("soundIcon");
  const soundManager = window.AksaRayaSound || null;

  function syncSoundButton(isEnabled) {
    if (soundIcon) {
      soundIcon.textContent = isEnabled ? "🔊" : "🔇";
    }
    if (soundButton) {
      soundButton.setAttribute(
        "aria-label",
        isEnabled ? "Matikan backsound" : "Nyalakan backsound",
      );
      soundButton.setAttribute("aria-pressed", String(isEnabled));
    }
  }

  if (soundManager) {
    syncSoundButton(soundManager.isEnabled());
    soundManager.playIfEnabled();
    soundManager.onChange(syncSoundButton);

    soundButton?.addEventListener("click", () => {
      soundManager.setEnabled(!soundManager.isEnabled());
    });
  } else {
    const saved = sessionStorage.getItem("aksarayaSoundEnabled");
    syncSoundButton(saved !== "false");
  }

  // URL WEB APP APPS SCRIPT
  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbwhptKhl-7U2SeCwvJDjSUVFAK2McFxBvL5gTVgrezU9uWOONTWpwGX6CLAQvTkxDH1/exec";

  const loading = document.getElementById("loading");
  const tableContainer = document.getElementById("tableContainer");
  const tbody = document.getElementById("leaderboardBody");

  // Format detik jadi MM:SS
  function formatWaktu(totalDetik) {
    const m = String(Math.floor(totalDetik / 60)).padStart(2, "0");
    const s = String(totalDetik % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  // Tarik data dari Google Sheets (GET Request)
  fetch(GAS_URL)
    .then((response) => response.json())
    .then((data) => {
      loading.hidden = true;
      tableContainer.hidden = false;

      tbody.innerHTML = "";

      // Loop data dan masukkan ke tabel
      data.forEach((siswa, index) => {
        const rank = index + 1;
        let rankClass = "";
        let rankIcon = rank;

        // Styling khusus top 3
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
