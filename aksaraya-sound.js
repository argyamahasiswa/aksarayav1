(function () {
  const currentScript = document.currentScript;
  const customSrc = currentScript
    ? currentScript.getAttribute("data-audio")
    : null;

  const SOUND_KEY = "aksarayaSoundEnabled";
  const TIME_KEY = "aksarayaSoundTime";
  const MAIN_SRC = "assets/backsound.mp3";
  const QUIZ_SRC =
    customSrc && customSrc !== MAIN_SRC
      ? customSrc
      : "assets/backsound-kuis.mp3";
  const isQuizPage = Boolean(customSrc && customSrc !== MAIN_SRC);

  function areAllVideosHidden() {
    const videos = Array.from(document.querySelectorAll("video"));
    if (videos.length === 0) return true;
    return videos.every((v) => v.offsetParent === null);
  }

  // Jika dibuka di dalam iframe induk (misalnya app.html), sinkronkan ke pengelola suara induk
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

  if (parentSound) {
    window.AksaRayaSound = parentSound;

    if (!isQuizPage) {
      // Halaman non-kuis (dashboard, petualangan, papan peringkat) otomatis lanjut backsound utama
      parentSound.playIfEnabled?.();
      return;
    }

    if (areAllVideosHidden()) {
      parentSound.playQuizBacksound?.();
    } else {
      parentSound.pauseTemp?.();
    }

    document.addEventListener(
      "play",
      (event) => {
        if (event.target && event.target.tagName === "VIDEO") {
          parentSound.pauseTemp?.();
        }
      },
      true,
    );

    document.addEventListener(
      "ended",
      (event) => {
        if (event.target && event.target.tagName === "VIDEO") {
          parentSound.playQuizBacksound?.();
        }
      },
      true,
    );

    document.addEventListener("click", () => {
      setTimeout(() => {
        if (areAllVideosHidden()) {
          document.querySelectorAll("video").forEach((v) => {
            try {
              v.pause();
            } catch (e) {}
          });
          parentSound.playQuizBacksound?.();
        }
      }, 30);
    });
    return;
  }

  // Inisialisasi pemutar utama (dashboard, petualangan, papan peringkat) dan pemutar khusus kuis
  const mainAudio = new Audio(MAIN_SRC);
  mainAudio.loop = true;
  mainAudio.volume = 0.35;
  mainAudio.preload = "metadata";

  const quizAudio = new Audio(QUIZ_SRC);
  quizAudio.loop = true;
  quizAudio.volume = 0.35;
  quizAudio.preload = "metadata";

  let quizAudioFailed = false;
  quizAudio.addEventListener("error", () => {
    quizAudioFailed = true;
    if (enabled && isQuizMode && quizReady && !pausedByVideo) {
      syncPlay();
    }
  });

  let enabled = true;
  try {
    const saved = sessionStorage.getItem(SOUND_KEY);
    if (saved !== null) {
      enabled = saved === "true";
    }
  } catch (e) {}

  // Lanjutkan posisi detik terakhir untuk backsound utama
  try {
    const savedTime = parseFloat(sessionStorage.getItem(TIME_KEY) || "0");
    if (!Number.isNaN(savedTime) && savedTime > 0) {
      mainAudio.addEventListener(
        "loadedmetadata",
        () => {
          if (
            Number.isFinite(mainAudio.duration) &&
            savedTime < mainAudio.duration
          ) {
            mainAudio.currentTime = savedTime;
          }
        },
        { once: true },
      );
    }
  } catch (e) {}

  const listeners = new Set();
  let pausedByVideo = false;
  let isQuizMode = isQuizPage;
  let quizReady = !isQuizPage || areAllVideosHidden();

  function getActiveAudio() {
    if (isQuizMode && !quizAudioFailed) {
      return quizAudio;
    }
    return mainAudio;
  }

  function notify() {
    listeners.forEach((fn) => {
      try {
        fn(enabled);
      } catch (e) {}
    });
  }

  function savePosition() {
    try {
      if (!Number.isNaN(mainAudio.currentTime)) {
        sessionStorage.setItem(TIME_KEY, String(mainAudio.currentTime));
      }
    } catch (e) {}
  }

  async function syncPlay() {
    if (!enabled || pausedByVideo || (isQuizMode && !quizReady)) {
      mainAudio.pause();
      quizAudio.pause();
      return false;
    }

    const active = getActiveAudio();
    const inactive = active === quizAudio ? mainAudio : quizAudio;
    inactive.pause();

    try {
      await active.play();
      return true;
    } catch (err) {
      return false;
    }
  }

  function armUnlockOnGesture() {
    const unlock = async () => {
      if (!enabled || pausedByVideo || (isQuizMode && !quizReady)) return;
      const ok = await syncPlay();
      if (ok) {
        document.removeEventListener("pointerdown", unlock);
        document.removeEventListener("keydown", unlock);
      }
    };
    document.addEventListener("pointerdown", unlock);
    document.addEventListener("keydown", unlock);
  }

  // Jeda otomatis saat video materi diputar
  document.addEventListener(
    "play",
    (event) => {
      if (event.target && event.target.tagName === "VIDEO") {
        pausedByVideo = true;
        mainAudio.pause();
        quizAudio.pause();
      }
    },
    true,
  );

  // Lanjutkan bila video dijeda saat sudah masuk mode soal
  document.addEventListener(
    "pause",
    (event) => {
      if (event.target && event.target.tagName === "VIDEO") {
        pausedByVideo = false;
        if (enabled && (!isQuizMode || quizReady)) {
          syncPlay();
        }
      }
    },
    true,
  );

  // Nyalakan backsound kuis saat video materi selesai
  document.addEventListener(
    "ended",
    (event) => {
      if (event.target && event.target.tagName === "VIDEO") {
        pausedByVideo = false;
        if (isQuizPage) {
          isQuizMode = true;
          quizReady = true;
        }
        if (enabled) {
          syncPlay();
        }
      }
    },
    true,
  );

  // Deteksi klik tombol mulai kuis saat area video disembunyikan
  document.addEventListener("click", () => {
    if (!isQuizPage || quizReady) return;
    setTimeout(() => {
      if (areAllVideosHidden()) {
        document.querySelectorAll("video").forEach((v) => {
          try {
            v.pause();
          } catch (e) {}
        });
        pausedByVideo = false;
        isQuizMode = true;
        quizReady = true;
        if (enabled) {
          syncPlay();
        }
      }
    }, 30);
  });

  setInterval(() => {
    if (!mainAudio.paused) {
      savePosition();
    }
  }, 1000);

  window.addEventListener("pagehide", () => {
    savePosition();
    quizAudio.pause();
  });

  window.addEventListener("beforeunload", () => {
    savePosition();
    quizAudio.pause();
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
      if (
        enabled &&
        !pausedByVideo &&
        (!isQuizMode || quizReady) &&
        getActiveAudio().paused
      ) {
        armUnlockOnGesture();
      }
      savePosition();
      notify();
      return enabled;
    },
    async playIfEnabled() {
      pausedByVideo = false;
      isQuizMode = false;
      quizReady = true;
      quizAudio.pause();
      quizAudio.currentTime = 0;
      if (!enabled) {
        mainAudio.pause();
        return false;
      }
      const ok = await syncPlay();
      if (!ok) armUnlockOnGesture();
      return ok;
    },
    async playQuizBacksound() {
      pausedByVideo = false;
      isQuizMode = true;
      quizReady = true;
      if (!enabled) {
        mainAudio.pause();
        quizAudio.pause();
        return false;
      }
      const ok = await syncPlay();
      if (!ok) armUnlockOnGesture();
      return ok;
    },
    playQuizMusic() {
      return this.playQuizBacksound();
    },
    pauseForQuiz() {
      pausedByVideo = true;
      mainAudio.pause();
      quizAudio.pause();
    },
    pauseTemp() {
      this.pauseForQuiz();
    },
    pauseQuizMusic() {
      isQuizMode = false;
      quizAudio.pause();
      quizAudio.currentTime = 0;
    },
    onChange(cb) {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
  };

  if (enabled && (!isQuizMode || quizReady)) {
    syncPlay().then((ok) => {
      if (!ok) armUnlockOnGesture();
    });
  }
})();
