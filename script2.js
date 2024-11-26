const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2, // Index of the correct answer
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
        correct: 0,
    },
    {
        question: "What is 5 + 3?",
        options: ["5", "8", "9", "10"],
        correct: 1,
    },
];

const quizContainer = document.getElementById("quiz");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <ul class="options">
            ${currentQuestion.options
                .map(
                    (option, index) =>
                        `<li><button onclick="selectAnswer(${index})">${option}</button></li>`
                )
                .join("")}
        </ul>
    `;
}

function selectAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    const options = document.querySelectorAll(".options button");

    options.forEach((button, index) => {
        if (index === currentQuestion.correct) {
            button.style.backgroundColor = "green";
        } else if (index === selectedIndex) {
            button.style.backgroundColor = "red";
        }
        button.disabled = true; // Disable all buttons after an answer
    });

    if (selectedIndex === currentQuestion.correct) {
        score++;
    }

    nextButton.classList.remove("hidden");
}

function showResults() {
    quizContainer.innerHTML = `
        <h2>You scored ${score} out of ${quizData.length}!</h2>
        <p>Thanks for playing!</p>
    `;
    nextButton.classList.add("hidden");
    restartButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        nextButton.classList.add("hidden");
    } else {
        showResults();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    restartButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
    loadQuestion();
});

// Initialize the quiz
loadQuestion();
