const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Dog", correct: false },
            { text: "Elephant", correct: false },
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true }
        ]
    },
    {
        question: "What is the capital of Haryana?",
        answers: [
            { text: "Chandigarh", correct: true },
            { text: "Gurugram", correct: false },
            { text: "Sonipat", correct: false },
            { text: "New Delhi", correct: false }
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Australia", correct: true },
            { text: "India", correct: false },
            { text: "Africa", correct: false },
            { text: "Asia", correct: false }
        ]
    },
    {
        question: "Who is the CEO of Facebook?",
        answers: [
            { text: "Sundar Pichai", correct: false },
            { text: "Elon Musk", correct: false },
            { text: "Mark Zuckerberg", correct: true },
            { text: "Ratan Tata", correct: false }
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
    nextButton.innerHTML = 'Next';
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
        button.dataset.correct = answer.correct; // Fixed typo here
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
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
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
    nextButton.innerHTML = `Play Again`;
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) { // Corrected here
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) { // Corrected here
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Start the quiz
startQuiz();
