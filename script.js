const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const submitButton = document.getElementById("submit");
const skipButton = document.getElementById("skip");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const playerNameInput = document.getElementById("playerName");
const startGameButton = document.getElementById("startGame");

let timeRemaining = 60;
let score = 0;
let correctAnswer;
let playerName;

function generateQuestion() {
  const operations = ['+', '-', '*', '/', '%'];
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operation = operations[Math.floor(Math.random() * operations.length)];

  correctAnswer = eval(`${num1} ${operation} ${num2}`);
  questionElement.textContent = `${num1} ${operation} ${num2} = `;
}

function startGame() {
  playerName = playerNameInput.value;
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  generateQuestion();

  answerElement.addEventListener("input", () => {
    const userAnswer = parseInt(answerElement.value);

    if (userAnswer === correctAnswer) {
      score++;
      scoreElement.textContent = score;
      answerElement.value = "";
      generateQuestion();
    }
  });

  submitButton.addEventListener("click", () => {
    const userAnswer = parseInt(answerElement.value);

    if (userAnswer === correctAnswer) {
      score++;
      scoreElement.textContent = score;
    }

    answerElement.value = "";
    generateQuestion();
  });

  skipButton.addEventListener("click", () => {
    answerElement.value = "";
    generateQuestion();
  });

  const timer = setInterval(() => {
    if (answerElement.value.length > 0) {
      timeRemaining--;
      timerElement.textContent = timeRemaining;

      if (timeRemaining <= 0) {
        clearInterval(timer);
        alert(`Game over! Your score is: ${score}`);
        location.reload();
      }
    }
  }, 1000);
}

startGameButton.addEventListener("click", () => {
  if (playerNameInput.value.length > 0) {
    startGame();
  }
});
