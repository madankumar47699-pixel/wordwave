const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const inputField = document.querySelector(".text");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const restartBtn = document.querySelector(".restart-btn");
const scoreText = document.querySelector(".score span");
const timeText = document.querySelector(".time span b");
const difficultySelect = document.getElementById("difficulty");

let correctWord, timer, timeLeft;
let score = 0;
let difficulty = "medium";

const getTimeLimit = () => {
  switch (difficulty) {
    case "easy": return 60;
    case "medium": return 30;
    case "hard": return 15;
  }
};

const startTimer = () => {
  clearInterval(timer);
  timeLeft = getTimeLimit();
  timeText.innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeText.innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      alert(`⏰ Time's up! The correct word was "${correctWord.toUpperCase()}"`);
      initGame();
    }
  }, 1000);
};

const initGame = () => {
    const randomObj = words[difficulty][Math.floor(Math.random() * words[difficulty].length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  let scrambled = wordArray.join(" ");
  while (scrambled === randomObj.word) {
      // Reshuffle again
      for (let i = wordArray.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
      }
      scrambled = wordArray.join(" ");
  }
  wordText.innerText = scrambled;  
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  startTimer();
};

const checkWord = () => {
  const userWord = inputField.value.toLowerCase();
  if (!userWord) return alert("Please enter a word!");
  if (userWord !== correctWord) {
    alert(`Oops! "${userWord}" is not correct.`);
  } else {
    score++;
    scoreText.innerText = score;
    alert(`🎉 Congrats! "${userWord.toUpperCase()}" is correct!`);
    initGame();
  }
};

const restartGame = () => {
  score = 0;
  scoreText.innerText = score;
  inputField.value = "";
  initGame();
};

difficultySelect.addEventListener("change", () => {
  difficulty = difficultySelect.value;
  restartGame();
});
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
restartBtn.addEventListener("click", restartGame);

initGame();
