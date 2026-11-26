document.addEventListener("DOMContentLoaded", () => {
  const infoButton = document.getElementById("infoButton");
  const faqButton = document.getElementById("faqButton");
  const devButton = document.getElementById("devButton");
  const soundButton = document.getElementById("soundButton");
  const soundIcon = document.getElementById("soundIcon");
  const soundToggle = document.getElementById("soundToggle");
  const startButton = document.getElementById("startButton");

  const infoPopup = document.getElementById("infoPopup");
  const faqPopup = document.getElementById("faqPopup");
  const devPopup = document.getElementById("devPopup");
  const devDetailSlide = document.getElementById("devDetailSlide");
  const allPopups = document.querySelectorAll(".popup");

  const SOUND_KEY = "aksarayaSoundEnabled";

  const welcomeName = document.getElementById("welcomeName");
  const studentName = sessionStorage.getItem("namaSiswa");

  if (welcomeName && studentName) {
    welcomeName.textContent = `Sugeng Rawuh, ${studentName}!`;
  }

  const sharedSound = window.AksaRayaSound || null;

  let localSound = null;
  if (!sharedSound) {
    localSound = new Audio("assets/backsound.mp3");
    localSound.loop = true;
    localSound.volume = 0.35;
    localSound.preload = "auto";
  }

  let soundEnabled = true;
  try {
    const saved = sessionStorage.getItem(SOUND_KEY);
    if (saved !== null) {
      soundEnabled = saved === "true";
    } else if (sharedSound) {
      soundEnabled = sharedSound.isEnabled();
    }
  } catch (error) {
    if (sharedSound) {
      soundEnabled = sharedSound.isEnabled();
    }
  }

  function updateSoundDisplay() {
    if (soundIcon) {
      soundIcon.textContent = soundEnabled ? "🔊" : "🔇";
    }
    if (soundButton) {
      soundButton.setAttribute(
        "aria-label",
        soundEnabled ? "Matikan backsound" : "Nyalakan backsound",
      );
      soundButton.setAttribute("aria-pressed", String(soundEnabled));
    }
    if (soundToggle) {
      soundToggle.checked = soundEnabled;
    }
  }

  async function setSound(enabled) {
    soundEnabled = Boolean(enabled);
    try {
      sessionStorage.setItem(SOUND_KEY, String(soundEnabled));
    } catch (error) {}

    updateSoundDisplay();

    if (sharedSound) {
      try {
        const actualState = await sharedSound.setEnabled(soundEnabled);
        soundEnabled = Boolean(actualState);
      } catch (error) {
        console.error("Gagal mengatur backsound bersama:", error);
      }
    } else if (localSound) {
      if (soundEnabled) {
        try {
          await localSound.play();
        } catch (error) {
          console.error("Backsound tidak dapat diputar:", error);
        }
      } else {
        localSound.pause();
        localSound.currentTime = 0;
      }
    }
    updateSoundDisplay();
  }

  async function initBacksound() {
    if (!soundEnabled) return;

    if (sharedSound && typeof sharedSound.playIfEnabled === "function") {
      sharedSound.playIfEnabled();
    } else if (localSound && localSound.paused) {
      try {
        await localSound.play();
      } catch (error) {
        const playOnFirstClick = async () => {
          if (soundEnabled && localSound.paused) {
            try {
              await localSound.play();
            } catch (e) {}
          }
          document.removeEventListener("pointerdown", playOnFirstClick);
        };
        document.addEventListener("pointerdown", playOnFirstClick);
      }
    }
  }

  function openPopup(popup) {
    allPopups.forEach((item) => {
      item.hidden = true;
    });
    if (devDetailSlide) {
      devDetailSlide.hidden = true;
    }
    if (popup) {
      popup.hidden = false;
    }
  }

  function closePopups() {
    if (devDetailSlide && !devDetailSlide.hidden) {
      if (typeof window.closeDevSlide === "function") {
        window.closeDevSlide();
      } else {
        devDetailSlide.hidden = true;
      }
      return;
    }
    allPopups.forEach((popup) => {
      popup.hidden = true;
    });
  }

  infoButton?.addEventListener("click", () => {
    openPopup(infoPopup);
  });

  faqButton?.addEventListener("click", () => {
    openPopup(faqPopup);
  });

  devButton?.addEventListener("click", () => {
    openPopup(devPopup);
  });

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => {
      const popup = document.getElementById(button.dataset.close);
      if (popup) {
        popup.hidden = true;
      }
      if (devDetailSlide) {
        devDetailSlide.hidden = true;
      }
    });
  });

  allPopups.forEach((popup) => {
    popup.addEventListener("click", (event) => {
      if (event.target === popup) {
        popup.hidden = true;
        if (devDetailSlide) {
          devDetailSlide.hidden = true;
        }
      }
    });
  });

  devDetailSlide?.addEventListener("click", (event) => {
    if (event.target === devDetailSlide) {
      closeDevSlide();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (devDetailSlide && !devDetailSlide.hidden) {
      if (event.key === "ArrowRight") {
        changeDevSlide(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        changeDevSlide(-1);
        return;
      }
    }
    if (event.key === "Escape") {
      closePopups();
    }
  });

  soundButton?.addEventListener("click", () => {
    setSound(!soundEnabled);
  });

  soundToggle?.addEventListener("change", () => {
    setSound(soundToggle.checked);
  });

  startButton?.addEventListener("click", () => {
    if (sharedSound && typeof sharedSound.playIfEnabled === "function") {
      sharedSound.playIfEnabled();
    }
    window.location.href = "petualangan.html";
  });

  updateSoundDisplay();
  initBacksound();
});
