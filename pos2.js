// ==========================================
// BANK SOAL POS 2 (20 Soal dari KUIS POS 2.docx) - BOBOT: 3 POIN/SOAL (MAX 30)
// ==========================================
const bankSoal = [
  {
    text: "Sandhangan swara sing digunakake kanggo ngowahi vokal bawaan /a/ dadi vokal /i/ yaiku...",
    aksara: "ꦶ",
    options: ["Suku", "Wulu", "Pepet", "Taling"],
    correct: 1,
  },
  {
    text: "Aksara 'Na' (ꦤ) yen diwenehi sandhangan Wulu unine dadi...",
    aksara: "ꦤ",
    options: ["ꦤꦸ", "ꦤꦺ", "ꦤꦶ", "ꦤꦼ"],
    correct: 2,
  },
  {
    text: "Sandhangan Suku (ꦸ) digunakake kanggo ngasilake swara vokal...",
    aksara: "ꦸ",
    options: ["/i/", "/u/", "/e/", "/o/"],
    correct: 1,
  },
  {
    text: "Panyeratane sandhangan Suku (ꦸ) dumunung ing...",
    aksara: "ꦸ",
    options: [
      "Ndhuwur aksara",
      "Ngarep aksara",
      "Mburi aksara",
      "Ngisor pungkasan aksara",
    ],
    correct: 3,
  },
  {
    text: "Sandhangan sing wujude ꦼ ing ndhuwur aksara lan berbunyi /ê/ (kayata ing tembung 'sega') yaiku...",
    aksara: "ꦼ",
    options: ["Pepet", "Taling", "Wulu", "Suku"],
    correct: 0,
  },
  {
    text: "Aksara 'Ka' (ꦏ) yen diwenehi sandhangan Pepet unine dadi...",
    aksara: "ꦏ",
    options: ["ꦏꦶ", "ꦏꦸ", "ꦏꦼ", "ꦏꦺ"],
    correct: 2,
  },
  {
    text: "Sandhangan Taling (ꦺ) panggonane ditulis ing...",
    aksara: "ꦺ",
    options: [
      "Ngarep aksara",
      "Mburi aksara",
      "Ndhuwur aksara",
      "Ngisor aksara",
    ],
    correct: 0,
  },
  {
    text: 'Tembung "lele" yen ditulis nggunakake Aksara Jawa lan sandhangan swara sing bener yaiku...',
    aksara: "ꦺ",
    options: ["ꦭꦼꦭꦼ", "ꦭꦺꦭꦺ", "ꦭꦶꦭꦶ", "ꦭꦸꦭꦸ"],
    correct: 1,
  },
  {
    text: "Sandhangan Taling Tarung (ꦺ...ꦴ) digunakake kanggo ngasilake swara vokal...",
    aksara: "ꦺꦴ",
    options: ["/u/", "/é/", "/ê/", "/o/"],
    correct: 3,
  },
  {
    text: 'Tembung "soto" yen ditulis nganggo Aksara Jawa sing bener yaiku...',
    aksara: "ꦺꦴ",
    options: ["ꦱꦺꦴꦠꦺꦴ", "ꦱꦼꦠꦼ", "ꦱꦶꦠꦶ", "ꦱꦸꦠꦸ"],
    correct: 0,
  },
  {
    text: "Tembung ꦧꦸꦏꦸ yen diwaca ing Aksara Latin unine yaiku...",
    aksara: "ꦧꦸꦏꦸ",
    options: ["Baka", "Biki", "Buku", "Beko"],
    correct: 2,
  },
  {
    text: "Sandhangan swara sing ditulis kanthi cara ngapit aksara (ing ngarep lan mburi aksara) yaiku...",
    aksara: "ꦺꦴ",
    options: ["Wulu", "Pepet", "Taling Tarung", "Suku"],
    correct: 2,
  },
  {
    text: 'Tembung "siji" (ꦱꦶꦗꦶ) nggunakake sandhangan swara...',
    aksara: "ꦱꦶꦗꦶ",
    options: ["Suku", "Wulu", "Pepet", "Taling"],
    correct: 1,
  },
  {
    text: 'Tembung "sega" nggunakake sandhangan Pepet ing aksara kapisan. Yen ditulis ing Aksara Jawa dadi...',
    aksara: "ꦼ",
    options: ["ꦱꦺꦒ", "ꦱꦶꦒ", "ꦱꦸꦒ", "ꦱꦼꦒ"],
    correct: 3,
  },
  {
    text: "Aksara 'Ta' (ꦠ) yen diwenehi sandhangan Taling Tarung unine dadi...",
    aksara: "ꦠ",
    options: ["ꦠꦶ", "ꦠꦸ", "ꦠꦺꦴ", "ꦠꦼ"],
    correct: 2,
  },
  {
    text: 'Panyeratan tembung "jare" ing Aksara Jawa sing bener yaiku...',
    aksara: "ꦺ",
    options: ["ꦗꦫꦺ", "ꦗꦫꦼ", "ꦗꦫꦶ", "ꦗꦫꦸ"],
    correct: 0,
  },
  {
    text: "Bedane swara sing dihasilkan dening sandhangan Pepet (ꦼ) lan Taling (ꦺ) yaiku...",
    aksara: "ꦼ  |  ꦺ",
    options: [
      "Pepet kanggo vokal /o/, Taling kanggo /u/",
      "Pepet kanggo vokal /ê/ (kayata 'sega'), Taling kanggo vokal /é/ (kayata 'sate')",
      "Pepet kanggo vokal /i/, Taling kanggo /a/",
      "Pepet lan Taling ngasilake swara sing padha persis",
    ],
    correct: 1,
  },
  {
    text: "Sandhangan swara sing wujude bunderan cilik lan manggon ing ndhuwur pungkasan aksara yaiku...",
    aksara: "ꦶ",
    options: ["Suku", "Pepet", "Wulu", "Taling"],
    correct: 2,
  },
  {
    text: 'Tembung "kowe" yen ditulis nggunakake Aksara Jawa sing bener miturut sumber yaiku...',
    aksara: "ꦺꦴ  |  ꦺ",
    options: ["ꦏꦼꦮꦼ", "ꦏꦶꦮꦶ", "ꦏꦺꦴꦮꦺ", "ꦏꦸꦮꦸ"],
    correct: 2,
  },
  {
    text: "Cacahe sandhangan swara utama ing wulangan Aksara Jawa ana...",
    aksara: "ꦶ  ꦸ  ꦼ  ꦺ  ꦺꦴ",
    options: ["3", "4", "5", "6"],
    correct: 2,
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
const optionsContainer = document.getElementById("optionsContainer");
const raguCheck = document.getElementById("raguCheck");
const numberGrid = document.getElementById("numberGrid");

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
    const nadaPeringatan = [440, 330]; // Nada turun A4 -> E4 ("tet-tot" lembut)

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
  learningVideo.addEventListener("play", () => {
    if (window.parent && window.parent.AksaRayaSound) {
      window.parent.AksaRayaSound.pauseTemp();
    }
  });
}

startQuizBtn.addEventListener("click", () => {
  if (learningVideo) learningVideo.pause();
  if (window.parent && window.parent.AksaRayaSound) {
    window.parent.AksaRayaSound.playQuizMusic();
  }
  videoSection.hidden = true;
  quizSection.hidden = false;
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

  optionsContainer.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `btn-mc ${userAnswers[index] === idx ? "selected" : ""}`;
    btn.onclick = () => chooseAnswer(idx);

    const prefix = String.fromCharCode(65 + idx);
    btn.innerHTML = `<span class="opt-prefix">${prefix}</span><span class="opt-text">${opt}</span>`;
    optionsContainer.appendChild(btn);
  });

  raguCheck.checked = raguStates[index];
  updateGridStyles();
}

function chooseAnswer(optionIndex) {
  userAnswers[currentIndex] = optionIndex;
  loadQuestion(currentIndex);
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
  // 1. Wajib cek soal kosong dan soal ragu-ragu terlebih dahulu
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

    // Jeda 70ms agar suara peringatan terdengar jelas terpisah dari suara klik tombol
    setTimeout(putarSuaraPeringatan, 70);
    return;
  }

  // 2. Jika semua soal sudah terjawab & tidak ada ragu-ragu, baru hitung skor
  clearInterval(timerInterval);
  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;

  userAnswers.forEach((ans, idx) => {
    if (ans === quizData[idx].correct) {
      score += 3; // Bobot 3 poin per soal (Max 30)
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  sessionStorage.setItem("skor_pos2", score);
  sessionStorage.setItem("benar_pos2", correctCount);
  sessionStorage.setItem("salah_pos2", wrongCount);
  sessionStorage.setItem("waktu_pos2", timerSeconds);
  sessionStorage.setItem("pos_terbuka", "3");

  if (window.parent && window.parent.AksaRayaSound) {
    window.parent.AksaRayaSound.pauseQuizMusic();
  }

  const mins = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
  const secs = String(timerSeconds % 60).padStart(2, "0");

  document.getElementById("finalCorrectText").textContent = correctCount;
  document.getElementById("finalWrongText").textContent = wrongCount;
  document.getElementById("finalScoreText").textContent = score;
  document.getElementById("finalTimeText").textContent = `${mins}:${secs}`;
  document.getElementById("scorePopup").hidden = false;
}
