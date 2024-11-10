const questions = [
  {
    question: "Which of the following statements best describes the Document Object Model (DOM) in web development?",
    answers: [
      {text: "It is a programming language used to style web pages.", correct: false},
      {text:"It is a standard for accessing and manipulating documents in HTML and XML formats.", correct: true},
      {text:"It is a storage system used for databases in JavaScript applications.", correct: false},
      {text:" It is a framework for building server-side applications in JavaScript.", correct: false},
    ]
  },

  {
    question: "Which of the following is a correct way to define a function in JavaScript?",
    answers: [
      {text: "function myFunc {}", correct: false},
      {text:"function myFunc() {}", correct: true},
      {text:"let myFunc() => {}", correct: false},
      {text:"func myFunc() {}", correct: false},
    ]
  }, 

  {
    question: "In HTML, which tag is used to create a hyperlink?",
    answers: [
      {text: "&lt;link&gt;", correct: false},
      {text: "&lt;href&gt;", correct: false},
      {text: "&lt;hyperlink&gt;", correct: false},
      {text: "&lt;a&gt;", correct: true},
    ]
  },

  {
    question: "Which CSS property is used to change the text color of an element?",
    answers: [
      {text: "background-color", correct: false},
      {text:"text-color", correct: false},
      {text:"color", correct: true},
      {text:"font-color", correct: false},
    ]
  },

  {
    question: "Which array method in JavaScript is used to add a new item to the end of an array?",
    answers: [
      {text: "push()", correct: true},
      {text:"pop()", correct: false},
      {text:"shift()", correct: false},
      {text:"unshift()", correct: false},
    ]
  }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
