// Predefined array of question objects
const questions = [
    { question: "What is 5 + 2?", options: ["3", "7", "5", "6"], correct: 1 },
    { question: "What is 3 + 1?", options: ["5", "4", "7", "8"], correct: 1 },
    { question: "What is 4 + 2?", options: ["7", "6", "9", "10"], correct: 1 },
    { question: "What is 5 + 5?", options: ["9", "10", "11", "12"], correct: 1 },
    { question: "What is 6 + 6?", options: ["11", "12", "13", "14"], correct: 1 }
];

// Shuffle the questions to randomize order
questions.sort(() => Math.random() - 0.5);

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

// Function to load the current question and options into the DOM
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-text").textContent = question.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";  // Clear previous options

    // Generate options as radio buttons
    question.options.forEach((option, index) => {
        const optionLabel = document.createElement("label");
        optionLabel.innerHTML = `<input type="radio" name="answer" value="${index}"> ${option}`;
        optionsContainer.appendChild(optionLabel);
    });

    // Reset timer
    timeLeft = 10;
    document.getElementById("time-left").textContent = timeLeft;

    // Start the timer for the current question
    clearInterval(timer);
    timer = setInterval(countdown, 1000);
}

// Countdown timer
function countdown() {
    timeLeft--;
    document.getElementById("time-left").textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        checkAnswer(); // Automatically check answer when time is up
    }
}

// Check the user's answer and proceed
function checkAnswer() {
    const selectedOption = document.querySelector("input[name='answer']:checked");
    const correctAnswerIndex = questions[currentQuestionIndex].correct;

    if (selectedOption && parseInt(selectedOption.value) === correctAnswerIndex) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }

    updateScore();
}

// Update the score display
function updateScore() {
    document.getElementById("score").textContent = score;
}

// Show the results
function showResults() {
    document.getElementById("question-section").style.display = "none";
    document.getElementById("score-display").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("final-score").textContent = score;
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    document.getElementById("question-section").style.display = "block";
    document.getElementById("score-display").style.display = "block";
    document.getElementById("results").style.display = "none";
    updateScore();
}

// Event listeners
document.getElementById("submit-answer").addEventListener("click", checkAnswer);
document.getElementById("restart-quiz").addEventListener("click", restartQuiz);

// Load the first question
loadQuestion();
