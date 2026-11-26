(function () {
  // Jika dibuka di dalam iframe (misalnya dari app.html) dan induk sudah punya pengelola suara, gunakan itu
  try {
    if (
      window.parent &&
      window.parent !== window &&
      window.parent.AksaRayaSound
    ) {
      window.AksaRayaSound = window.parent.AksaRayaSound;
      return;
    }
  } catch (e) {}

  const SOUND_KEY = "aksarayaSoundEnabled";
  const TIME_KEY = "aksarayaSoundTime";
  const AUDIO_SRC = "assets/backsound.mp3";

  const audio = new Audio(AUDIO_SRC);
  audio.loop = true;
  audio.volume = 0.35;
  audio.preload = "auto";

  let enabled = true;
  try {
    const saved = sessionStorage.getItem(SOUND_KEY);
    if (saved !== null) {
      enabled = saved === "true";
    }
  } catch (e) {}

  // Lanjutkan dari detik terakhir sebelum pindah halaman
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

  const listeners = new Set();

  function notify() {
    listeners.forEach((fn) => {
      try {
        fn(enabled);
      } catch (e) {}
    });
  }

  function savePosition() {
    try {
      if (!Number.isNaN(audio.currentTime)) {
        sessionStorage.setItem(TIME_KEY, String(audio.currentTime));
      }
    } catch (e) {}
  }

  async function syncPlay() {
    if (!enabled) {
      audio.pause();
      return false;
    }
    try {
      await audio.play();
      return true;
    } catch (err) {
      return false;
    }
  }

  function armUnlockOnGesture() {
    const unlock = async () => {
      if (!enabled) return;
      const ok = await syncPlay();
      if (ok) {
        document.removeEventListener("pointerdown", unlock);
        document.removeEventListener("keydown", unlock);
      }
    };
    document.addEventListener("pointerdown", unlock);
    document.addEventListener("keydown", unlock);
  }

  setInterval(() => {
    if (!audio.paused) {
      savePosition();
    }
  }, 1000);

  window.addEventListener("pagehide", savePosition);
  window.addEventListener("beforeunload", savePosition);

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
      if (enabled && audio.paused) {
        armUnlockOnGesture();
      }
      savePosition();
      notify();
      return enabled;
    },
    async playIfEnabled() {
      if (!enabled) {
        audio.pause();
        return false;
      }
      const ok = await syncPlay();
      if (!ok) {
        armUnlockOnGesture();
      }
      return ok;
    },
    onChange(cb) {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
  };

  if (enabled) {
    syncPlay().then((ok) => {
      if (!ok) armUnlockOnGesture();
    });
  }
})();
