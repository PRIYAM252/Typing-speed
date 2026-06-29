const quotes = [
  "Typing is a skill that improves with practice.",
  "JavaScript makes websites interactive.",
  "Never stop learning new things in tech.",
  "Consistency is the key to success.",
  "Debugging is like solving a mystery."
];

let currentQuote = "";
let timer = 0;
let interval = null;
let mistakes = 0;

const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const mistakesElement = document.getElementById("mistakes");

// Load random quote with span wrappers
function loadQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  currentQuote = randomQuote;
  quoteElement.innerHTML = "";

  randomQuote.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    quoteElement.appendChild(span);
  });
}

// Start timer
function startTimer() {
  if (interval) return;
  interval = setInterval(() => {
    timer++;
    timerElement.innerText = timer;
  }, 1000);
}

// Check input
inputElement.addEventListener("input", () => {
  startTimer();
  const quoteSpans = quoteElement.querySelectorAll("span");
  const userInput = inputElement.value.split("");

  let correct = 0;
  let total = quoteSpans.length;

  quoteSpans.forEach((charSpan, index) => {
    const typedChar = userInput[index];

    if (typedChar == null) {
      charSpan.classList.remove("highlight-correct", "highlight-wrong");
    } else if (typedChar === charSpan.innerText) {
      charSpan.classList.add("highlight-correct");
      charSpan.classList.remove("highlight-wrong");
      correct++;
    } else {
      charSpan.classList.add("highlight-wrong");
      charSpan.classList.remove("highlight-correct");
      mistakes++;
      mistakesElement.innerText = mistakes;
    }
  });

  if (userInput.join("") === currentQuote) {
    clearInterval(interval);
    calculateWPM();
  }
});

function calculateWPM() {
  const words = currentQuote.split(" ").length;
  const minutes = timer / 60;
  const wpm = Math.round(words / minutes);
  wpmElement.innerText = wpm;

  // Accuracy
  const accuracy = Math.round(((currentQuote.length - mistakes) / currentQuote.length) * 100);
  const accPara = document.createElement("p");
  accPara.innerHTML = `<strong>Accuracy:</strong> ${accuracy}%`;
  document.querySelector(".stats").appendChild(accPara);

  // High Score logic
  const previousHigh = localStorage.getItem("highScore") || 0;
  const highScoreElement = document.getElementById("high-score");

  if (wpm > previousHigh) {
    localStorage.setItem("highScore", wpm);
    highScoreElement.innerText = wpm;
    alert("🎉 New High Score!");
  } else {
    highScoreElement.innerText = previousHigh;
  }
}

  // Accuracy
  const accuracy = Math.round(((currentQuote.length - mistakes) / currentQuote.length) * 100);
  const accPara = document.createElement("p");
  accPara.innerHTML = `<strong>Accuracy:</strong> ${accuracy}%`;
  document.querySelector(".stats").appendChild(accPara);


// Reset function
function resetTest() {
  clearInterval(interval);
  interval = null;
  timer = 0;
  mistakes = 0;
  timerElement.innerText = 0;
  mistakesElement.innerText = 0;
  wpmElement.innerText = 0;
  inputElement.value = "";
  document.querySelector(".stats").querySelectorAll("p").forEach(p => {
    if (p.innerText.startsWith("Accuracy")) p.remove();
  });
  loadQuote();
}

loadQuote();
