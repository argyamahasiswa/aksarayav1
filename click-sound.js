// ==========================================
// SISTEM MULTI-EFEK SUARA KLIK - AKSARAYA
// ==========================================
(function () {
  let audioCtx = null;
  let lastPlayTime = 0;

  function getContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSfx(type = "pop") {
    const nowMs = Date.now();
    if (nowMs - lastPlayTime < 75) return;
    lastPlayTime = nowMs;

    const ctx = getContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "start") {
      // 1. LONCENG SEMANGAT (Tombol Masuk, Mulai, Pos Peta, Kumpulake Jawaban)
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, t);
      osc.frequency.setValueAtTime(880.0, t + 0.09);
      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
      osc.start(t);
      osc.stop(t + 0.24);
    } else if (type === "close") {
      // 2. SWOOSH TURUN (Tutup Popup 'X', Navigasi Kembali, Reset)
      osc.type = "sine";
      osc.frequency.setValueAtTime(700, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.11);
      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.start(t);
      osc.stop(t + 0.12);
    } else if (type === "card") {
      // 3. KETUKAN KARTU (Kartu Aksara Jawa, Pilihan Ganda, Benar/Salah)
      osc.type = "triangle";
      osc.frequency.setValueAtTime(420, t);
      osc.frequency.exponentialRampToValueAtTime(720, t + 0.07);
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.start(t);
      osc.stop(t + 0.08);
    } else if (type === "warn") {
      // 4. NADA PERINGATAN LEMBUT (Checkbox Ragu-ragu)
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, t);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.setValueAtTime(0.02, t + 0.06);
      gain.gain.setValueAtTime(0.3, t + 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.17);
      osc.start(t);
      osc.stop(t + 0.17);
    } else {
      // 5. BUBBLE POP (Ikon Menu, Navigasi Soal, Nomor Soal, Tombol Umum)
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.exponentialRampToValueAtTime(940, t + 0.09);
      gain.gain.setValueAtTime(0.38, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.start(t);
      osc.stop(t + 0.1);
    }
  }

  function detectType(el) {
    const idAndClass =
      `${el.id || ""} ${typeof el.className === "string" ? el.className : ""}`.toLowerCase();

    // Tombol Mulai, Masuk, Titik Pos Peta, & Submit
    if (
      el.matches(
        "#loginBtn, #startButton, #startQuizBtn, #submitBtn, .start-button, .btn-primary, .btn-submit",
      ) ||
      /pos|start|mulai|masuk|submit|kumpul/.test(idAndClass)
    ) {
      return "start";
    }

    // Tombol Tutup Popup, Kembali, & Reset
    if (
      el.matches(".close-button, .btn-reset-slot, [data-close]") ||
      /close|tutup|back|kembali|balik|reset|baleni/.test(idAndClass)
    ) {
      return "close";
    }

    // Kartu Aksara & Opsi Jawaban
    if (
      el.matches(".drag-card, .btn-mc, .btn-true, .btn-false") ||
      /card|option|jawaban|pilihan/.test(idAndClass)
    ) {
      return "card";
    }

    // Checkbox Ragu-ragu
    if (el.matches(".ragu-checkbox, #raguCheck") || /ragu/.test(idAndClass)) {
      return "warn";
    }

    return "pop";
  }

  function findClickableElement(startNode) {
    let el = startNode;
    while (el && el !== document.body && el !== document.documentElement) {
      if (el.disabled) return null;

      // Cek tag/class standar tombol, link, ikon, dan navigasi
      if (
        el.matches(
          "button, a, [role='button'], [onclick], .menu-button, .close-button, .drag-card:not(.used), .num-btn, .ragu-checkbox, .btn-mc, .btn-true, .btn-false, .btn, .btn-nav",
        )
      ) {
        return el;
      }

      // Deteksi otomatis elemen kustom (div/span/img) yang diberi gaya pointer
      if (window.getComputedStyle(el).cursor === "pointer") {
        return el;
      }

      el = el.parentElement;
    }
    return null;
  }

  document.addEventListener(
    "pointerdown",
    (event) => {
      const target = findClickableElement(event.target);
      if (target) {
        playSfx(detectType(target));
      }
    },
    true,
  );

  window.playAksaRayaClick = playSfx;
})();

// Efek suara peringatan saat kuis belum lengkap / masih ada ragu-ragu
window.putarSuaraPeringatan = function () {
  try {
    const soundEnabled = sessionStorage.getItem("aksarayaSoundEnabled");
    if (soundEnabled === "false") return;

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Dua nada turun lembut (340Hz -> 250Hz) sebagai sinyal peringatan ramah
    const nada = [340, 250];
    nada.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.13);

      gain.gain.setValueAtTime(0.001, now + idx * 0.13);
      gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.13 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.13 + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.13);
      osc.stop(now + idx * 0.13 + 0.13);
    });
  } catch (e) {
    console.warn("Efek suara peringatan tidak dapat diputar:", e);
  }
};
