// ==========================================
// BANK SOAL POS 1 (20 Soal) - BOBOT: 2 POIN/SOAL (MAX 20)
// ==========================================
const bankSoal = [
  {
    text: "Aksara Legena (Carakan) ing basa Jawa cacahe ana 20 aksara utama.",
    aksara: "ꦲ ꦤ ꦕ ꦫ ꦏ ꦢ ꦠ ꦱ ꦮ ꦭ ꦥ ꦣ ꦗ ꦪ ꦚ ꦩ ꦒ ꦧ ꦛ ꦔ",
    isTrue: true,
  },
  {
    text: "Urutan aksara Jawa ing larikan kapisan yaiku: Ha, Na, Ca, Ra, Ka.",
    aksara: "ꦲ ꦤ ꦕ ꦫ ꦏ",
    isTrue: true,
  },
  {
    text: "Larikan kapindho ing aksara carakan dibacutake dening aksara: Pa, Dha, Ja, Ya, Nya.",
    aksara: "ꦥ ꦣ ꦗ ꦪ ꦚ",
    isTrue: false,
  },
  {
    text: "Aksara Legena iku aksara pokok sing saben aksarane wis ngandhut vokal alami /a/ utawa /ɔ/.",
    aksara: "ꦲ ꦤ ꦕ ꦫ ꦏ",
    isTrue: true,
  },
  {
    text: "Aksara 'Da' lan 'Dha' ing aksara Jawa duwe wujud lan cara ngucapake sing padha persis.",
    aksara: "ꦢ ꦣ",
    isTrue: false,
  },
  {
    text: "Filosofi 'Ha Na Ca Ra Ka' ing carakan Jawa nduweni teges yaiku \"Ana utusan\".",
    aksara: "ꦲ ꦤ ꦕ ꦫ ꦏ",
    isTrue: true,
  },
  {
    text: "Larikan kaping telu ing aksara carakan yaiku: Pa, Dha, Ja, Ya, Nya.",
    aksara: "ꦥ ꦣ ꦗ ꦪ ꦚ",
    isTrue: true,
  },
  {
    text: "Filosofi larikan pungkasan 'Ma Ga Ba Tha Nga' nduweni teges \"Padha padudon / Saling bertengkar\".",
    aksara: "ꦩ ꦒ ꦧ ꦛ ꦔ",
    isTrue: false,
  },
  {
    text: "Aksara 'Nga' iku minangka aksara pungkasan (urutan kaping 20) ing aksara Jawa legena.",
    aksara: "ꦔ",
    isTrue: true,
  },
  {
    text: 'Tembung "Mata" yen ditulis ing aksara Jawa mung butuh rong aksara legena tanpa sandhangan, yaiku Ma lan Ta.',
    aksara: "ꦩ ꦠ",
    isTrue: true,
  },
  {
    text: "Aksara Legena uga asring diarani kanthi aran Aksara Dentawyanjana.",
    aksara: "ꦲ ꦤ ꦕ ꦫ ꦏ",
    isTrue: true,
  },
  {
    text: "Filosofi 'Pa Dha Ja Ya Nya' nduweni teges yaiku \"Padha dene kadidene / Sama kuatnya\".",
    aksara: "ꦥ ꦣ ꦗ ꦪ ꦚ",
    isTrue: true,
  },
  {
    text: "Aksara 'Ta' lan 'Tha' nduweni bentuk lan artikulasi pengucapan sing padha.",
    aksara: "ꦠ ꦛ",
    isTrue: false,
  },
  {
    text: "Rong aksara legena sing digabungake wis bisa mbentuk siji tembung sing ngandhut teges tanpa perlu diwenehi imbuhan.",
    aksara: "ꦲ ꦤ",
    isTrue: true,
  },
  {
    text: "Larikan kaping papat ing aksara carakan yaiku: Ma, Ga, Ba, Tha, Nga.",
    aksara: "ꦩ ꦒ ꦧ ꦛ ꦔ",
    isTrue: true,
  },
  {
    text: "Aksara 'Ba' manggon ing larikan kapindho ing susunan carakan Jawa.",
    aksara: "ꦧ",
    isTrue: false,
  },
  {
    text: 'Tembung "Rasa" yen ditulis ing aksara Jawa mung mbutuhake aksara Ra lan Sa.',
    aksara: "ꦫ ꦱ",
    isTrue: true,
  },
  {
    text: "Aksara Legena tegese aksara Jawa sing wis dipasangi sandhangan swara kayata wulu lan suku.",
    aksara: "ꦲ ꦤ ꦕ ꦫ ꦏ",
    isTrue: false,
  },
  {
    text: "Aksara 'Wa' lan 'La' manggon ing pungkasan larikan kapindho (Da Ta Sa Wa La).",
    aksara: "ꦮ ꦭ",
    isTrue: true,
  },
  {
    text: "Aksara 'Ja' kalebu ing larikan kapisan ing carakan Jawa.",
    aksara: "ꦗ",
    isTrue: false,
  },
];

const quizData = [...bankSoal].sort(() => 0.5 - Math.random()).slice(0, 10);

let currentIndex = 0;
let userAnswers = new Array(quizData.length).fill(null);
let raguStates = new Array(quizData.length).fill(false);
let timerSeconds = 0;
let timerInterval = null;
let targetJumpIndex = null;

const startQuizBtn = document.getElementById("startQuizBtn");
const videoSection = document.getElementById("videoSection");
const quizSection = document.getElementById("quizSection");
const learningVideo = document.getElementById("learningVideo");
const qNumberText = document.getElementById("qNumberText");
const questionText = document.getElementById("questionText");
const aksaraPreview = document.getElementById("aksaraPreview");
const btnTrue = document.getElementById("btnTrue");
const btnFalse = document.getElementById("btnFalse");
const raguCheck = document.getElementById("raguCheck");
const numberGrid = document.getElementById("numberGrid");

// ==========================================
// PENGUAT SUARA VIDEO PEMBELAJARAN (> 100%)
// ==========================================
let videoAudioCtx = null;
let videoGainNode = null;

function aktifkanPenguatSuaraVideo(videoEl, tingkatPenguatan = 4.5) {
  if (!videoEl) return;
  videoEl.volume = 1.0;

  if (window.location.protocol === "file:") return;

  try {
    if (!videoAudioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      videoAudioCtx = new AudioCtx();
      const source = videoAudioCtx.createMediaElementSource(videoEl);
      videoGainNode = videoAudioCtx.createGain();
      videoGainNode.gain.value = tingkatPenguatan;

      const compressor = videoAudioCtx.createDynamicsCompressor();
      compressor.threshold.value = -2;
      compressor.knee.value = 6;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.25;

      source.connect(videoGainNode);
      videoGainNode.connect(compressor);
      compressor.connect(videoAudioCtx.destination);
    }

    if (videoAudioCtx.state === "suspended") {
      videoAudioCtx.resume();
    }
  } catch (e) {
    console.warn("Penguat suara video tidak aktif:", e);
  }
}

// ==========================================
// EFEK SUARA KHUSUS POP-UP PERINGATAN
// ==========================================
function putarSuaraPeringatan() {
  try {
    if (sessionStorage.getItem("aksarayaSoundEnabled") === "false") return;

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const nadaPeringatan = [440, 330];

    nadaPeringatan.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.14);

      gain.gain.setValueAtTime(0.001, now + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.22, now + idx * 0.14 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.13);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.14);
      osc.stop(now + idx * 0.14 + 0.14);

      if (idx === nadaPeringatan.length - 1) {
        osc.onended = () => ctx.close().catch(() => {});
      }
    });
  } catch (e) {
    console.warn("Efek suara peringatan tidak dapat diputar:", e);
  }
}

function updateProgresKuis() {
  const teksPersentase = document.getElementById("teksPersentase");
  const teksDetailSoal = document.getElementById("teksDetailSoal");
  const barProgresKuis = document.getElementById("barProgresKuis");

  if (!teksPersentase || !barProgresKuis) return;

  const dijawab = userAnswers.filter((ans) => ans !== null).length;
  const totalSoal = quizData.length;
  const persentase = Math.round((dijawab / totalSoal) * 100);

  teksPersentase.textContent = `${persentase}%`;
  teksDetailSoal.textContent = `(${dijawab} saka ${totalSoal} dijawab)`;
  barProgresKuis.style.width = `${persentase}%`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateProgresKuis();
});

if (learningVideo) {
  learningVideo.volume = 1.0;
  learningVideo.addEventListener("play", () => {
    window.AksaRayaSound?.pauseForQuiz?.();
    aktifkanPenguatSuaraVideo(learningVideo, 4.5);
  });
}

startQuizBtn?.addEventListener("click", () => {
  if (learningVideo) learningVideo.pause();
  videoSection.hidden = true;
  quizSection.hidden = false;
  window.AksaRayaSound?.playQuizBacksound?.();
  startTimer();
  renderNumberGrid();
  loadQuestion(0);
});

function startTimer() {
  timerInterval = setInterval(() => {
    timerSeconds++;
    const mins = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
    const secs = String(timerSeconds % 60).padStart(2, "0");
    document.getElementById("timerDisplay").textContent = `${mins}:${secs}`;
  }, 1000);
}

function renderNumberGrid() {
  numberGrid.innerHTML = "";
  quizData.forEach((_, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `num-btn ${idx === currentIndex ? "active" : ""}`;
    btn.textContent = idx + 1;
    btn.onclick = () => jumpToQuestion(idx);
    numberGrid.appendChild(btn);
  });
}

function updateGridStyles() {
  const buttons = numberGrid.querySelectorAll(".num-btn");
  buttons.forEach((btn, idx) => {
    btn.className = "num-btn";
    if (idx === currentIndex) btn.classList.add("active");
    if (userAnswers[idx] !== null) btn.classList.add("answered");
    if (raguStates[idx]) btn.classList.add("ragu");
  });
}

function loadQuestion(index) {
  currentIndex = index;
  const q = quizData[index];
  qNumberText.textContent = `Soal ${index + 1} saka ${quizData.length}`;
  questionText.textContent = q.text;
  aksaraPreview.textContent = q.aksara;

  btnTrue.classList.remove("selected");
  btnFalse.classList.remove("selected");

  if (userAnswers[index] === true) btnTrue.classList.add("selected");
  if (userAnswers[index] === false) btnFalse.classList.add("selected");

  raguCheck.checked = raguStates[index];
  updateGridStyles();
}

function chooseAnswer(answer) {
  userAnswers[currentIndex] = answer;
  btnTrue.classList.remove("selected");
  btnFalse.classList.remove("selected");
  if (answer === true) btnTrue.classList.add("selected");
  if (answer === false) btnFalse.classList.add("selected");

  updateGridStyles();
  updateProgresKuis();
}

raguCheck.addEventListener("change", (e) => {
  raguStates[currentIndex] = e.target.checked;
  updateGridStyles();
});

function nextQuestion() {
  if (currentIndex < quizData.length - 1) loadQuestion(currentIndex + 1);
}

function prevQuestion() {
  if (currentIndex > 0) loadQuestion(currentIndex - 1);
}

function jumpToQuestion(idx) {
  loadQuestion(idx);
}

function closeWarning() {
  document.getElementById("warningPopup").hidden = true;
  if (targetJumpIndex !== null) {
    loadQuestion(targetJumpIndex);
    targetJumpIndex = null;
  }
}

function finishQuiz() {
  const unanswered = [];
  userAnswers.forEach((ans, idx) => {
    if (ans === null) unanswered.push(idx + 1);
  });

  const raguList = [];
  raguStates.forEach((isRagu, idx) => {
    if (isRagu) raguList.push(idx + 1);
  });

  if (unanswered.length > 0 || raguList.length > 0) {
    let msgHTML = "";
    if (unanswered.length > 0) {
      msgHTML += `<div class="warning-item"><span>❌</span><div><strong>Soal durung dijawab:</strong><br>Nomer ${unanswered.join(", ")}</div></div>`;
    }
    if (raguList.length > 0) {
      msgHTML += `<div class="warning-item"><span>⚠️</span><div><strong>Isih dicentang Ragu-ragu:</strong><br>Nomer ${raguList.join(", ")}</div></div>`;
    }

    targetJumpIndex =
      unanswered.length > 0 ? unanswered[0] - 1 : raguList[0] - 1;

    document.getElementById("warningMessage").innerHTML = msgHTML;
    document.getElementById("warningPopup").hidden = false;

    setTimeout(putarSuaraPeringatan, 70);
    return;
  }

  clearInterval(timerInterval);
  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;

  userAnswers.forEach((ans, idx) => {
    if (ans === quizData[idx].isTrue) {
      score += 2;
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  sessionStorage.setItem("skor_pos1", score);
  sessionStorage.setItem("benar_pos1", correctCount);
  sessionStorage.setItem("salah_pos1", wrongCount);
  sessionStorage.setItem("waktu_pos1", timerSeconds);
  sessionStorage.setItem("pos_terbuka", "2");

  window.AksaRayaSound?.pauseForQuiz?.();

  const mins = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
  const secs = String(timerSeconds % 60).padStart(2, "0");

  document.getElementById("finalCorrectText").textContent = correctCount;
  document.getElementById("finalWrongText").textContent = wrongCount;
  document.getElementById("finalScoreText").textContent = score;
  document.getElementById("finalTimeText").textContent = `${mins}:${secs}`;
  document.getElementById("scorePopup").hidden = false;
}
