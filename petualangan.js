let sedangMengirim = false;

document.addEventListener("DOMContentLoaded", () => {
  // Putar backsound HANYA JIKA pengguna tidak mematikannya
  if (window.parent && window.parent.AksaRayaSound) {
    window.parent.AksaRayaSound.playIfEnabled();
  }

  // Ambil data progres siswa dari sessionStorage
  const posTerbuka = parseInt(sessionStorage.getItem("pos_terbuka") || "1", 10);
  const skorPos1 = sessionStorage.getItem("skor_pos1");
  const skorPos2 = sessionStorage.getItem("skor_pos2");
  const skorPos3 = sessionStorage.getItem("skor_pos3");

  const pos1Card = document.getElementById("pos1Card");
  const pos2Card = document.getElementById("pos2Card");
  const pos3Card = document.getElementById("pos3Card");

  const pos1Btn = document.getElementById("pos1Button");
  const pos2Btn = document.getElementById("pos2Button");
  const pos3Btn = document.getElementById("pos3Button");

  const pos1Status = document.getElementById("pos1Status");
  const pos2Status = document.getElementById("pos2Status");
  const pos3Status = document.getElementById("pos3Status");

  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");

  let posSelesai = 0;

  // --- POS 1 ---
  if (skorPos1 !== null) {
    if (pos1Card) pos1Card.className = "pos-card pos-completed";
    if (pos1Status) pos1Status.textContent = `✓ SELESAI (${skorPos1} Pts)`;
    if (pos1Btn) {
      pos1Btn.innerHTML = `<span>Nilai: ${skorPos1}</span><span class="button-arrow">✓</span>`;
      pos1Btn.disabled = true;
      pos1Btn.onclick = null;
    }
    posSelesai++;
  } else {
    if (pos1Card) pos1Card.className = "pos-card pos-open";
    if (pos1Status) pos1Status.textContent = "★ TERBUKA";
    if (pos1Btn) {
      pos1Btn.innerHTML = `<span>Mulai Misi</span><span class="button-arrow">→</span>`;
      pos1Btn.disabled = false;
      pos1Btn.onclick = () => {
        window.location.href = "pos1.html";
      };
    }
  }

  // --- POS 2 ---
  const isPos2Open = posTerbuka >= 2 || skorPos1 !== null;

  if (isPos2Open && pos2Card && pos2Btn) {
    pos2Card.classList.remove("pos-locked");

    if (skorPos2 !== null) {
      pos2Card.className = "pos-card pos-completed";
      if (pos2Status) pos2Status.textContent = `✓ SELESAI (${skorPos2} Pts)`;
      if (pos2Btn) {
        pos2Btn.innerHTML = `<span>Nilai: ${skorPos2}</span><span class="button-arrow">✓</span>`;
        pos2Btn.disabled = true;
        pos2Btn.onclick = null;
      }
      posSelesai++;
    } else {
      pos2Card.className = "pos-card pos-open";
      if (pos2Status) pos2Status.textContent = "★ TERBUKA";
      if (pos2Btn) {
        pos2Btn.disabled = false;
        pos2Btn.innerHTML = `<span>Mulai Misi</span><span class="button-arrow">→</span>`;
        pos2Btn.onclick = () => (window.location.href = "pos2.html");
      }
    }
  } else if (pos2Btn) {
    pos2Btn.disabled = true;
  }

  // --- POS 3 ---
  const isPos3Open = posTerbuka >= 3 || skorPos2 !== null;

  if (isPos3Open && pos3Card && pos3Btn) {
    pos3Card.classList.remove("pos-locked");

    if (skorPos3 !== null) {
      pos3Card.className = "pos-card pos-completed";
      if (pos3Status) pos3Status.textContent = `✓ SELESAI (${skorPos3} Pts)`;
      if (pos3Btn) {
        pos3Btn.innerHTML = `<span>Nilai: ${skorPos3}</span><span class="button-arrow">✓</span>`;
        pos3Btn.disabled = true;
        pos3Btn.onclick = null;
      }
      posSelesai++;
    } else {
      pos3Card.className = "pos-card pos-open";
      if (pos3Status) pos3Status.textContent = "★ TERBUKA";
      if (pos3Btn) {
        pos3Btn.disabled = false;
        pos3Btn.innerHTML = `<span>Mulai Misi</span><span class="button-arrow">→</span>`;
        pos3Btn.onclick = () => (window.location.href = "pos3.html");
      }
    }
  } else if (pos3Btn) {
    pos3Btn.disabled = true;
  }

  // Update Progress Bar
  const persenProgress = (posSelesai / 3) * 100;
  if (progressFill) progressFill.style.width = `${persenProgress}%`;
  if (progressText)
    progressText.textContent = `${posSelesai} dari 3 pos selesai`;

  // --- JIKA 3 POS SUDAH SELESAI SEMUA ---
  if (posSelesai === 3) {
    // 1. Hitung Akumulasi Total Poin
    const s1 = parseInt(skorPos1 || "0", 10);
    const s2 = parseInt(skorPos2 || "0", 10);
    const s3 = parseInt(skorPos3 || "0", 10);
    const totalSkor = s1 + s2 + s3;

    // 2. Hitung Total Waktu (Detik)
    const w1 = parseInt(sessionStorage.getItem("waktu_pos1") || "0", 10);
    const w2 = parseInt(sessionStorage.getItem("waktu_pos2") || "0", 10);
    const w3 = parseInt(sessionStorage.getItem("waktu_pos3") || "0", 10);
    const totalWaktu = w1 + w2 + w3;

    // 3. Simpan ke sessionStorage untuk Leaderboard
    sessionStorage.setItem("skor_total", totalSkor);
    sessionStorage.setItem("waktu_total", totalWaktu);

    // 4. Tampilkan Banner Rekapitulasi Akhir
    const completionBanner = document.getElementById("completionBanner");
    const totalScoreText = document.getElementById("totalScoreText");
    const totalTimeText = document.getElementById("totalTimeText");
    const btnKirim = document.getElementById("btnKirimData");

    if (completionBanner) {
      completionBanner.hidden = false;
      if (totalScoreText) totalScoreText.textContent = totalSkor;

      const mins = String(Math.floor(totalWaktu / 60)).padStart(2, "0");
      const secs = String(totalWaktu % 60).padStart(2, "0");
      if (totalTimeText) totalTimeText.textContent = `${mins}:${secs}`;
    }

    // Ubah teks tombol jika data sudah pernah dikirim pada sesi ini
    if (
      btnKirim &&
      sessionStorage.getItem("sudah_simpan_database") === "true"
    ) {
      btnKirim.innerHTML = "Deleng Peringkat 🏆";
    }
  }
});

async function kirimDataKeDatabase() {
  // Jika sudah pernah disimpan di sesi ini, langsung pindah ke leaderboard tanpa kirim ulang
  if (sessionStorage.getItem("sudah_simpan_database") === "true") {
    window.location.href = "leaderboard.html";
    return;
  }

  // Cegah klik ganda saat proses pengiriman masih berjalan
  if (sedangMengirim) return;
  sedangMengirim = true;

  const btn = document.getElementById("btnKirimData");
  if (btn) {
    btn.innerHTML = "Menyimpan Data... ⏳";
    btn.disabled = true;
  }

  // URL Web App Google Apps Script
  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbwhptKhl-7U2SeCwvJDjSUVFAK2McFxBvL5gTVgrezU9uWOONTWpwGX6CLAQvTkxDH1/exec";

  const dataPayload = {
    nama:
      sessionStorage.getItem("namaSiswa") ||
      sessionStorage.getItem("nama_siswa") ||
      "Anonim",
    absen: sessionStorage.getItem("absenSiswa") || "-",
    skor: sessionStorage.getItem("skor_total") || "0",
    waktu: sessionStorage.getItem("waktu_total") || "0",
  };

  try {
    // Kirim data ke Google Sheets
    await fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify(dataPayload),
    });

    // Tandai bahwa sesi login ini sudah masuk ke database
    sessionStorage.setItem("sudah_simpan_database", "true");
    window.location.href = "leaderboard.html";
  } catch (error) {
    console.error("Gagal mengirim data:", error);
    // Buka kunci tombol jika gagal karena koneksi terputus agar siswa bisa coba lagi
    sedangMengirim = false;
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = "Simpan & Deleng Peringkat 🏆";
    }
    alert(
      "Gagal nyimpen data menyang server. Priksa koneksi internetmu banjur coba maneh.",
    );
  }
}
