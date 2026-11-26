const loginForm = document.getElementById("loginForm");
const namaInput = document.getElementById("nama");
const absenInput = document.getElementById("absen");
const pesan = document.getElementById("pesan");

// Elemen pop-up konfirmasi
const confirmPopup = document.getElementById("confirmPopup");
const confirmName = document.getElementById("confirmName");
const confirmAbsen = document.getElementById("confirmAbsen");
const editButton = document.getElementById("editButton");
const confirmButton = document.getElementById("confirmButton");

let namaSiswa = "";
let absenSiswa = "";

// Saat tombol Miwiti Petualangan diklik
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  namaSiswa = namaInput.value.trim();
  absenSiswa = absenInput.value.trim();

  // Validasi data tidak boleh kosong
  if (namaSiswa === "" || absenSiswa === "") {
    pesan.textContent = "Jeneng lan nomer absen kudu diisi dhisik!";
    return;
  }

  // Validasi nomor absen (1 - 99)
  const nomorAbsen = Number(absenSiswa);

  if (!Number.isInteger(nomorAbsen) || nomorAbsen < 1 || nomorAbsen > 99) {
    pesan.textContent = "Nomer absen kudu antarane 1 nganti 99!";
    return;
  }

  pesan.textContent = "";

  // Tampilkan data siswa di pop-up konfirmasi
  confirmName.textContent = namaSiswa;
  confirmAbsen.textContent = absenSiswa;

  // Buka pop-up
  confirmPopup.hidden = false;

  // Fokus ke tombol konfirmasi
  confirmButton.focus();
});

// Tombol Ora, Owahi (Batal)
editButton.addEventListener("click", function () {
  confirmPopup.hidden = true;
  namaInput.focus();
});

// Tombol Ya, Wis Bener! (Konfirmasi Login)
confirmButton.addEventListener("click", function () {
  // 1. Reset/bersihkan seluruh data pemain lama di sessionStorage
  sessionStorage.clear();

  // 2. Simpan data profil siswa yang baru login
  sessionStorage.setItem("namaSiswa", namaSiswa);
  sessionStorage.setItem("absenSiswa", absenSiswa);
  sessionStorage.setItem("nama_siswa", namaSiswa); // Kunci cadangan untuk dashboard
  sessionStorage.setItem("pos_terbuka", "1"); // Wajib reset awal ke Pos 1

  // 3. Aktivkan backsound musik di app.html jika diakses via iframe
  if (window.parent && window.parent.AksaRayaSound) {
    window.parent.AksaRayaSound.setEnabled(true);
  }

  // 4. Masuk ke halaman dashboard
  window.location.href = "dashboard.html";
});

// Menutup pop-up dengan tombol Escape
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && confirmPopup && !confirmPopup.hidden) {
    confirmPopup.hidden = true;
    namaInput.focus();
  }
});
