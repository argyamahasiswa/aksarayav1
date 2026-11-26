// ==========================================
// BANK SOAL POS 3 : TANTANGAN PANYIGEG WANDA (20 SOAL DRAG & DROP)
// BOBOT: 5 POIN/SOAL (MAX 50 POIN)
// ==========================================
const bankSoal = [
  // A. SANDHANGAN CECAK (ꦁ)
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Ing Lawang",
    correctSequence: ["ꦲꦶꦁ", "ꦭ", "ꦮꦁ"],
    bank: ["ꦮꦁ", "ꦲꦶꦁ", "ꦭ", "ꦮ", "ꦭꦁ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Wong Tuwa",
    correctSequence: ["ꦮꦺꦴꦁ", "ꦠꦸ", "ꦮ"],
    bank: ["ꦠꦸ", "ꦮ", "ꦮꦺꦴꦁ", "ꦠ", "ꦮꦁ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Wong Lanang",
    correctSequence: ["ꦮꦺꦴꦁ", "ꦭ", "ꦤꦁ"],
    bank: ["ꦤꦁ", "ꦮꦺꦴꦁ", "ꦭ", "ꦭꦁ", "ꦮ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Semangka",
    correctSequence: ["ꦱꦼ", "ꦩꦁ", "ꦏ"],
    bank: ["ꦩꦁ", "ꦱꦼ", "ꦏ", "ꦩ", "ꦱ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Kemuning",
    correctSequence: ["ꦏꦼ", "ꦩꦸ", "ꦤꦶꦁ"],
    bank: ["ꦤꦶꦁ", "ꦩꦸ", "ꦏꦼ", "ꦤꦶ", "ꦩ"],
  },

  // B. SANDHANGAN WIGNYAN (ꦃ)
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Sekolah",
    correctSequence: ["ꦱꦼ", "ꦏꦺꦴ", "ꦭꦃ"],
    bank: ["ꦭꦃ", "ꦱꦼ", "ꦏꦺꦴ", "ꦭ", "ꦏ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Sejarah",
    correctSequence: ["ꦱꦼ", "ꦗ", "ꦫꦃ"],
    bank: ["ꦫꦃ", "ꦱꦼ", "ꦗ", "ꦫ", "ꦱ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Mahkota",
    correctSequence: ["ꦩꦃ", "ꦏꦺꦴ", "ꦠ"],
    bank: ["ꦩꦃ", "ꦏꦺꦴ", "ꦠ", "ꦩ", "ꦏ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Bahtera",
    correctSequence: ["ꦧꦃ", "ꦠꦼ", "ꦫ"],
    bank: ["ꦠꦼ", "ꦧꦃ", "ꦫ", "ꦧ", "ꦠ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Serakah",
    correctSequence: ["ꦱꦼ", "ꦫ", "ꦏꦃ"],
    bank: ["ꦱꦼ", "ꦫ", "ꦏꦃ", "ꦏ", "ꦲ"],
  },

  // C. SANDHANGAN LAYAR (ꦂ)
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Purnama",
    correctSequence: ["ꦥꦸꦂ", "ꦤ", "ꦩ"],
    bank: ["ꦤ", "ꦥꦸꦂ", "ꦩ", "ꦥꦸ", "ꦩꦶ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Pertama",
    correctSequence: ["ꦥꦼꦂ", "ꦠ", "ꦩ"],
    bank: ["ꦩ", "ꦥꦼꦂ", "ꦠ", "ꦥꦼ", "ꦫ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Merpati",
    correctSequence: ["ꦩꦼꦂ", "ꦥ", "ꦠꦶ"],
    bank: ["ꦩꦼꦂ", "ꦥ", "ꦠꦶ", "ꦩꦼ", "ꦠ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Merdeka",
    correctSequence: ["ꦩꦼꦂ", "ꦢꦼ", "ꦏ"],
    bank: ["ꦢꦼ", "ꦩꦼꦂ", "ꦏ", "ꦢ", "ꦩ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Permata",
    correctSequence: ["ꦥꦼꦂ", "ꦩ", "ꦠ"],
    bank: ["ꦥꦼꦂ", "ꦩ", "ꦠ", "ꦩꦶ", "ꦥ"],
  },

  // D. SANDHANGAN PANGKON (꧀)
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Juragan",
    correctSequence: ["ꦗꦸ", "ꦫ", "ꦒꦤ꧀"],
    bank: ["ꦗꦸ", "ꦒꦤ꧀", "ꦫ", "ꦒ", "ꦤ꧀"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Pamitan",
    correctSequence: ["ꦥ", "ꦩꦶ", "ꦠꦤ꧀"],
    bank: ["ꦩꦶ", "ꦠꦤ꧀", "ꦥ", "ꦠ", "ꦩ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Selimut",
    correctSequence: ["ꦱꦼ", "ꦭꦶ", "ꦩꦸꦠ꧀"],
    bank: ["ꦭꦶ", "ꦱꦼ", "ꦩꦸꦠ꧀", "ꦩꦸ", "ꦭ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Tulisan",
    correctSequence: ["ꦠꦸ", "ꦭꦶ", "ꦱꦤ꧀"],
    bank: ["ꦱꦤ꧀", "ꦠꦸ", "ꦭꦶ", "ꦱ", "ꦭ"],
  },
  {
    text: "Tata lan pasangna aksara Jawa kanggo tembung:",
    latin: "Panutan",
    correctSequence: ["ꦥ", "ꦤꦸ", "ꦠꦤ꧀"],
    bank: ["ꦥ", "ꦤꦸ", "ꦠꦤ꧀", "ꦤ", "ꦠ"],
  },
];

// ACAK DAN AMBIL 10 SOAL
const quizData = [...bankSoal].sort(() => 0.5 - Math.random()).slice(0, 10);

let currentIndex = 0;
let userAnswers = Array.from({ length: quizData.length }, () => []);
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
const latinTarget = document.getElementById("latinTarget");
const dropZoneContainer = document.getElementById("dropZoneContainer");
const itemBank = document.getElementById("itemBank");
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

// Pastikan semua slot pada suatu nomor soal benar-benar terisi
function isQuestionComplete(idx) {
  const ans = userAnswers[idx];
  const requiredLen = quizData[idx].correctSequence.length;
  if (!Array.isArray(ans) || ans.length < requiredLen) return false;
  for (let i = 0; i < requiredLen; i++) {
    if (!ans[i]) return false;
  }
  return true;
}

// ==========================================
// FUNGSI UPDATE PROGRES KUIS
// ==========================================
function updateProgresKuis() {
  const teksPersentase = document.getElementById("teksPersentase");
  const teksDetailSoal = document.getElementById("teksDetailSoal");
  const barProgresKuis = document.getElementById("barProgresKuis");

  if (!teksPersentase || !barProgresKuis) return;

  let dijawab = 0;
  for (let idx = 0; idx < quizData.length; idx++) {
    if (isQuestionComplete(idx)) dijawab++;
  }

  const totalSoal = quizData.length;
  const persentase = Math.round((dijawab / totalSoal) * 100);

  teksPersentase.textContent = `${persentase}%`;
  teksDetailSoal.textContent = `(${dijawab} saka ${totalSoal} dijawab)`;
  barProgresKuis.style.width = `${persentase}%`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateProgresKuis();
});

// Event Video
if (learningVideo) {
  learningVideo.addEventListener("play", () => {
    if (window.parent && window.parent.AksaRayaSound) {
      window.parent.AksaRayaSound.pauseTemp();
    }
  });
}

// Mulai Kuis
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

// Stopwatch
function startTimer() {
  timerInterval = setInterval(() => {
    timerSeconds++;
    const mins = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
    const secs = String(timerSeconds % 60).padStart(2, "0");
    document.getElementById("timerDisplay").textContent = `${mins}:${secs}`;
  }, 1000);
}

// Grid Navigasi
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
    if (isQuestionComplete(idx)) btn.classList.add("answered");
    if (raguStates[idx]) btn.classList.add("ragu");
  });
}

// Muat Pertanyaan Drag & Drop
function loadQuestion(index) {
  currentIndex = index;
  const q = quizData[index];

  qNumberText.textContent = `Soal ${index + 1} saka ${quizData.length}`;
  questionText.textContent = q.text;
  latinTarget.textContent = `"${q.latin}"`;

  dropZoneContainer.innerHTML = "";
  const targetLen = q.correctSequence.length;

  for (let i = 0; i < targetLen; i++) {
    const slot = document.createElement("div");
    slot.className = "drop-slot";
    slot.dataset.slotIndex = i;

    if (userAnswers[index][i]) {
      const card = createDragCard(userAnswers[index][i], true);
      slot.appendChild(card);
    }

    slot.addEventListener("dragover", (e) => {
      e.preventDefault();
      slot.classList.add("hovered");
    });
    slot.addEventListener("dragleave", () => slot.classList.remove("hovered"));
    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      slot.classList.remove("hovered");
      const char = e.dataTransfer.getData("text/plain");
      placeCharInSlot(i, char);
    });

    dropZoneContainer.appendChild(slot);
  }

  renderItemBank();
  raguCheck.checked = raguStates[index];
  updateGridStyles();
}

function renderItemBank() {
  itemBank.innerHTML = "";
  const q = quizData[currentIndex];
  const currentSelections = userAnswers[currentIndex];

  q.bank.forEach((char) => {
    const countInBank = q.bank.filter((c) => c === char).length;
    const countUsed = currentSelections.filter((c) => c === char).length;
    const isUsed = countUsed >= countInBank;

    const card = createDragCard(char, false, isUsed);
    itemBank.appendChild(card);
  });
}

function createDragCard(char, inSlot = false, isUsed = false) {
  const card = document.createElement("div");
  card.className = `drag-card ${isUsed ? "used" : ""}`;
  card.textContent = char;

  if (!isUsed) {
    card.draggable = true;
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", char);
    });

    // Klik langsung mengisi slot kosong pertama
    card.addEventListener("click", () => {
      if (inSlot) return;
      const targetLen = quizData[currentIndex].correctSequence.length;
      let firstEmptySlot = -1;
      for (let i = 0; i < targetLen; i++) {
        if (!userAnswers[currentIndex][i]) {
          firstEmptySlot = i;
          break;
        }
      }
      if (firstEmptySlot !== -1) {
        placeCharInSlot(firstEmptySlot, char);
      }
    });
  }

  if (inSlot) {
    card.title = "Klik kanggo mbatalake";
    card.addEventListener("click", () => {
      const parentSlot = card.parentElement;
      const slotIdx = parentSlot.dataset.slotIndex;
      userAnswers[currentIndex][slotIdx] = null;
      loadQuestion(currentIndex);
      updateProgresKuis();
    });
  }

  return card;
}

function placeCharInSlot(slotIdx, char) {
  userAnswers[currentIndex][slotIdx] = char;
  loadQuestion(currentIndex);
  updateProgresKuis();
}

function resetCurrentDropZone() {
  userAnswers[currentIndex] = [];
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

// Submit Kuis
function finishQuiz() {
  // 1. Wajib cek soal kosong dan soal ragu-ragu terlebih dahulu
  const unanswered = [];
  for (let idx = 0; idx < quizData.length; idx++) {
    if (!isQuestionComplete(idx)) {
      unanswered.push(idx + 1);
    }
  }

  const raguList = [];
  raguStates.forEach((isRagu, idx) => {
    if (isRagu) raguList.push(idx + 1);
  });

  if (unanswered.length > 0 || raguList.length > 0) {
    let msgHTML = "";
    if (unanswered.length > 0) {
      msgHTML += `<div class="warning-item"><span>❌</span><div><strong>Soal durung dijawab lengkap:</strong><br>Nomer ${unanswered.join(", ")}</div></div>`;
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

  // 2. Jika semua soal sudah terjawab lengkap & tidak ada ragu-ragu, baru hitung skor
  clearInterval(timerInterval);
  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;

  userAnswers.forEach((ans, idx) => {
    const correctSeq = quizData[idx].correctSequence;
    const isCorrect =
      ans.length === correctSeq.length &&
      ans.every((val, i) => val === correctSeq[i]);
    if (isCorrect) {
      score += 5; // Bobot 5 poin per soal (Max 50)
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  sessionStorage.setItem("skor_pos3", score);
  sessionStorage.setItem("benar_pos3", correctCount);
  sessionStorage.setItem("salah_pos3", wrongCount);
  sessionStorage.setItem("waktu_pos3", timerSeconds);

  // Akumulasi Total Skor (Pos 1: 20 + Pos 2: 30 + Pos 3: 50 = Total 100)
  const s1 = Number(sessionStorage.getItem("skor_pos1")) || 0;
  const s2 = Number(sessionStorage.getItem("skor_pos2")) || 0;
  sessionStorage.setItem("skor_total", s1 + s2 + score);

  const t1 = Number(sessionStorage.getItem("waktu_pos1")) || 0;
  const t2 = Number(sessionStorage.getItem("waktu_pos2")) || 0;
  sessionStorage.setItem("waktu_total", t1 + t2 + timerSeconds);

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
