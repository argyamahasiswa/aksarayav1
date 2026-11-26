(function () {
  const currentScript = document.currentScript;
  const customSrc = currentScript
    ? currentScript.getAttribute("data-audio")
    : null;

  const SOUND_KEY = "aksarayaSoundEnabled";
  const TIME_KEY = "aksarayaSoundTime";
  const DEFAULT_SRC = "assets/backsound.mp3";
  const isQuizTrack = Boolean(customSrc && customSrc !== DEFAULT_SRC);

  // Jika dibuka di dalam iframe (misalnya dari app.html)
  let parentSound = null;
  try {
    if (
      window.parent &&
      window.parent !== window &&
      window.parent.AksaRayaSound
    ) {
      parentSound = window.parent.AksaRayaSound;
    }
  } catch (e) {}

  // Halaman non-kuis cukup memakai pengelola suara milik induk agar lagu tidak terputus
  if (!isQuizTrack && parentSound) {
    window.AksaRayaSound = parentSound;
    return;
  }

  let activeSrc = customSrc || DEFAULT_SRC;
  const audio = new Audio(activeSrc);
  audio.loop = true;
  audio.volume = 0.35;
  audio.preload = "metadata";

  // Cadangan otomatis ke backsound.mp3 jika file backsound-kuis.mp3 tidak ditemukan
  audio.addEventListener("error", () => {
    if (activeSrc !== DEFAULT_SRC) {
      activeSrc = DEFAULT_SRC;
      audio.src = DEFAULT_SRC;
      if (enabled && quizReady && !pausedByVideo) {
        syncPlay();
      }
    }
  });

  let enabled = true;
  try {
    const saved = sessionStorage.getItem(SOUND_KEY);
    if (saved !== null) {
      enabled = saved === "true";
    } else if (parentSound && typeof parentSound.isEnabled === "function") {
      enabled = Boolean(parentSound.isEnabled());
    }
  } catch (e) {}

  // Lanjutkan dari detik terakhir hanya untuk backsound utama
  if (!isQuizTrack) {
    try {
      const savedTime = parseFloat(sessionStorage.getItem(TIME_KEY) || "0");
      if (!Number.isNaN(savedTime) && savedTime > 0) {
        audio.addEventListener(
          "loadedmetadata",
          () => {
            if (Number.isFinite(audio.duration) && savedTime < audio.duration) {
              audio.currentTime = savedTime;
            }
          },
          { once: true },
        );
      }
    } catch (e) {}
  }

  const listeners = new Set();
  let pausedByVideo = false;

  function areAllVideosHidden() {
    const videos = Array.from(document.querySelectorAll("video"));
    if (videos.length === 0) return true;
    return videos.every((v) => v.offsetParent === null);
  }

  // Pada halaman soal yang menampilkan video materi, tahan backsound-kuis sampai masuk sesi soal
  let quizReady = !isQuizTrack || areAllVideosHidden();

  function notify() {
    listeners.forEach((fn) => {
      try {
        fn(enabled);
      } catch (e) {}
    });
  }

  function savePosition() {
    if (isQuizTrack) return;
    try {
      if (!Number.isNaN(audio.currentTime)) {
        sessionStorage.setItem(TIME_KEY, String(audio.currentTime));
      }
    } catch (e) {}
  }

  async function syncPlay() {
    if (!enabled || pausedByVideo || !quizReady) {
      audio.pause();
      return false;
    }
    try {
      if (
        isQuizTrack &&
        parentSound &&
        typeof parentSound.pauseForQuiz === "function"
      ) {
        parentSound.pauseForQuiz();
      }
      await audio.play();
      return true;
    } catch (err) {
      return false;
    }
  }

  function armUnlockOnGesture() {
    const unlock = async () => {
      if (!enabled || pausedByVideo || !quizReady) return;
      const ok = await syncPlay();
      if (ok) {
        document.removeEventListener("pointerdown", unlock);
        document.removeEventListener("keydown", unlock);
      }
    };
    document.addEventListener("pointerdown", unlock);
    document.addEventListener("keydown", unlock);
  }

  // Jeda backsound saat video materi diputar
  document.addEventListener(
    "play",
    (event) => {
      if (event.target && event.target.tagName === "VIDEO") {
        pausedByVideo = true;
        audio.pause();
      }
    },
    true,
  );

  // Lanjutkan jika video dijeda saat sudah masuk mode soal
  document.addEventListener(
    "pause",
    (event) => {
      if (event.target && event.target.tagName === "VIDEO") {
        pausedByVideo = false;
        if (enabled && quizReady) {
          syncPlay();
        }
      }
    },
    true,
  );

  // Nyalakan backsound-kuis otomatis setelah video materi selesai
  document.addEventListener(
    "ended",
    (event) => {
      if (event.target && event.target.tagName === "VIDEO") {
        pausedByVideo = false;
        quizReady = true;
        if (enabled) {
          syncPlay();
        }
      }
    },
    true,
  );

  // Deteksi otomatis saat tombol lanjut/mulai kuis diklik dan tampilan berpindah dari video ke soal
  document.addEventListener("click", () => {
    if (!isQuizTrack || quizReady) return;
    setTimeout(() => {
      if (areAllVideosHidden()) {
        document.querySelectorAll("video").forEach((v) => {
          try {
            v.pause();
          } catch (e) {}
        });
        pausedByVideo = false;
        quizReady = true;
        if (enabled) {
          syncPlay();
        }
      }
    }, 30);
  });

  setInterval(() => {
    if (!audio.paused) {
      savePosition();
    }
  }, 1000);

  window.addEventListener("pagehide", () => {
    savePosition();
    if (isQuizTrack) audio.pause();
  });

  window.addEventListener("beforeunload", () => {
    savePosition();
    if (isQuizTrack) audio.pause();
  });

  window.AksaRayaSound = {
    isEnabled() {
      return enabled;
    },
    async setEnabled(nextState) {
      enabled = Boolean(nextState);
      try {
        sessionStorage.setItem(SOUND_KEY, String(enabled));
      } catch (e) {}
      await syncPlay();
      if (enabled && !pausedByVideo && quizReady && audio.paused) {
        armUnlockOnGesture();
      }
      savePosition();
      notify();
      return enabled;
    },
    async playIfEnabled() {
      pausedByVideo = false;
      quizReady = true;
      if (!enabled) {
        audio.pause();
        return false;
      }
      const ok = await syncPlay();
      if (!ok) armUnlockOnGesture();
      return ok;
    },
    async playQuizBacksound() {
      pausedByVideo = false;
      quizReady = true;
      return this.playIfEnabled();
    },
    pauseForQuiz() {
      audio.pause();
    },
    onChange(cb) {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
  };

  if (enabled && quizReady) {
    syncPlay().then((ok) => {
      if (!ok) armUnlockOnGesture();
    });
  }
})();
