const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Computer Style System",
      "Creative Style Setup"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which is not a programming language?",
    options: ["HTML", "Python", "Ruby", "C++"],
    answer: "HTML"
  },
  {
    question: "What year was JavaScript created?",
    options: ["1995", "2000", "1992", "1997"],
    answer: "1995"
  }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  resetState();
  let q = quizData[currentQuestion];
  questionEl.textContent = q.question;

  q.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", selectAnswer);
    optionsEl.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (optionsEl.firstChild) {
    optionsEl.removeChild(optionsEl.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const answer = quizData[currentQuestion].answer;

  if (selectedBtn.textContent === answer) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  // Disable all options after selection
  Array.from(optionsEl.children).forEach(button => {
    button.disabled = true;
    if (button.textContent === answer) {
      button.classList.add("correct");
    }
  });

  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionEl.textContent = `🎉 You scored ${score} out of ${quizData.length}`;
  scoreEl.textContent = "";
  nextBtn.textContent = "Play Again";
  nextBtn.style.display = "block";
}

function handleNextButton() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestion < quizData.length) {
    handleNextButton();
  } else {
    // Restart game
    currentQuestion = 0;
    score = 0;
    nextBtn.textContent = "Next";
    loadQuestion();
  }
});

// Initialize quiz
loadQuestion();
