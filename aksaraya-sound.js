(function () {
  const VIDEO_BOOST_LEVEL = 7.0; // Penguat suara video materi Pos 1-3 (700%)
  const QUIZ_BOOST_LEVEL = 2.2; // Penguat suara backsound-kuis.mp3 (220%, ubah 1.5 - 3.5 sesuai selera)
  const MAIN_VOLUME = 0.45; // Volume backsound utama di dashboard, peta, & peringkat

  const currentScript = document.currentScript;
  const scriptBase =
    currentScript && currentScript.src
      ? currentScript.src
      : window.location.href;
  const customSrc = currentScript
    ? currentScript.getAttribute("data-audio")
    : null;

  const SOUND_KEY = "aksarayaSoundEnabled";
  const TIME_KEY = "aksarayaSoundTime";
  const MAIN_SRC = new URL("assets/backsound.mp3", scriptBase).href;
  const QUIZ_SRC =
    customSrc && customSrc !== "assets/backsound.mp3"
      ? new URL(customSrc, scriptBase).href
      : new URL("assets/backsound-kuis.mp3", scriptBase).href;
  const isQuizPage = Boolean(customSrc && customSrc !== "assets/backsound.mp3");

  // ==========================================
  // PENGUAT SUARA OTOMATIS UNTUK VIDEO POS 1-3
  // ==========================================
  const boostedVideos = new WeakMap();

  function boostVideoVolume(videoEl, gainLevel = VIDEO_BOOST_LEVEL) {
    if (!videoEl || videoEl.tagName !== "VIDEO") return;
    videoEl.muted = false;
    videoEl.volume = 1.0;

    if (boostedVideos.has(videoEl)) {
      const existing = boostedVideos.get(videoEl);
      if (existing.ctx && existing.ctx.state === "suspended") {
        existing.ctx.resume().catch(() => {});
      }
      return;
    }

    if (window.location.protocol === "file:") return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const source = ctx.createMediaElementSource(videoEl);

      const highpass = ctx.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.value = 85;

      const gainNode = ctx.createGain();
      gainNode.gain.value = gainLevel;

      const limiter = ctx.createDynamicsCompressor();
      limiter.threshold.value = -1.0;
      limiter.knee.value = 3.0;
      limiter.ratio.value = 12.0;
      limiter.attack.value = 0.002;
      limiter.release.value = 0.15;

      source.connect(highpass);
      highpass.connect(gainNode);
      gainNode.connect(limiter);
      limiter.connect(ctx.destination);

      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      boostedVideos.set(videoEl, { ctx, gainNode });
    } catch (e) {
      console.warn("Penguat suara video tidak dapat aktif:", e);
    }
  }

  function areAllVideosHidden() {
    const videos = Array.from(document.querySelectorAll("video"));
    if (videos.length === 0) return true;
    return videos.every((v) => v.offsetParent === null);
  }

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
          boostVideoVolume(event.target);
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

  const mainAudio = new Audio(MAIN_SRC);
  mainAudio.loop = true;
  mainAudio.volume = MAIN_VOLUME;
  mainAudio.preload = "auto";

  const quizAudio = new Audio(QUIZ_SRC);
  quizAudio.loop = true;
  quizAudio.volume = 1.0;
  quizAudio.preload = "auto";

  // ==========================================
  // PENGUAT SUARA KHUSUS BACKSOUND KUIS
  // ==========================================
  let quizAudioCtx = null;
  let quizBoostConnected = false;

  function ensureQuizBoost() {
    quizAudio.volume = 1.0;
    if (window.location.protocol === "file:") return;

    try {
      if (!quizBoostConnected) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;

        quizAudioCtx = new AudioCtx();
        const source = quizAudioCtx.createMediaElementSource(quizAudio);

        const gainNode = quizAudioCtx.createGain();
        gainNode.gain.value = QUIZ_BOOST_LEVEL;

        const limiter = quizAudioCtx.createDynamicsCompressor();
        limiter.threshold.value = -1.5;
        limiter.knee.value = 4.0;
        limiter.ratio.value = 10.0;
        limiter.attack.value = 0.003;
        limiter.release.value = 0.2;

        source.connect(gainNode);
        gainNode.connect(limiter);
        limiter.connect(quizAudioCtx.destination);
        quizBoostConnected = true;
      }

      if (quizAudioCtx && quizAudioCtx.state === "suspended") {
        quizAudioCtx.resume().catch(() => {});
      }
    } catch (e) {
      console.warn("Penguat backsound kuis menggunakan volume standar:", e);
    }
  }

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
  let unmuteBanner = null;

  function getActiveAudio() {
    if (isQuizMode && !quizAudioFailed) {
      return quizAudio;
    }
    return mainAudio;
  }

  function removeUnmuteBanner() {
    if (unmuteBanner) {
      unmuteBanner.remove();
      unmuteBanner = null;
    }
  }

  function showUnmuteBanner() {
    if (unmuteBanner || !enabled || isQuizMode) return;
    const mount = () => {
      if (unmuteBanner || !document.body) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.id = "aksarayaUnmuteFallback";
      btn.textContent = "🔊 Nyalakan Backsound";
      Object.assign(btn.style, {
        position: "fixed",
        bottom: "18px",
        right: "18px",
        zIndex: "9999",
        padding: "10px 16px",
        borderRadius: "999px",
        border: "1px solid rgba(253, 224, 71, 0.75)",
        background: "rgba(15, 23, 42, 0.92)",
        color: "#fef08a",
        fontWeight: "700",
        fontSize: "13px",
        cursor: "pointer",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
      });
      btn.addEventListener("click", async () => {
        const ok = await syncPlay();
        if (ok) removeUnmuteBanner();
      });
      document.body.appendChild(btn);
      unmuteBanner = btn;
    };

    if (document.body) {
      mount();
    } else {
      document.addEventListener("DOMContentLoaded", mount, { once: true });
    }
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
      removeUnmuteBanner();
      return false;
    }

    const active = getActiveAudio();
    const inactive = active === quizAudio ? mainAudio : quizAudio;
    inactive.pause();

    if (active === quizAudio) {
      ensureQuizBoost();
    }

    try {
      await active.play();
      removeUnmuteBanner();
      return true;
    } catch (err) {
      return false;
    }
  }

  function armUnlockOnGesture() {
    showUnmuteBanner();
    const events = ["pointerdown", "touchstart", "keydown"];
    const unlock = async () => {
      if (!enabled || pausedByVideo || (isQuizMode && !quizReady)) return;
      const ok = await syncPlay();
      if (ok) {
        removeUnmuteBanner();
        events.forEach((evt) =>
          document.removeEventListener(evt, unlock, true),
        );
      }
    };
    events.forEach((evt) =>
      document.addEventListener(evt, unlock, { capture: true, passive: true }),
    );
  }

  document.addEventListener(
    "play",
    (event) => {
      if (event.target && event.target.tagName === "VIDEO") {
        pausedByVideo = true;
        mainAudio.pause();
        quizAudio.pause();
        boostVideoVolume(event.target);
      }
    },
    true,
  );

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
        removeUnmuteBanner();
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
    boostVideo(videoEl, gainLevel) {
      boostVideoVolume(videoEl, gainLevel);
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
