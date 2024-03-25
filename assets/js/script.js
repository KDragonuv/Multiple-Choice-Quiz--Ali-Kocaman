const startScreen = document.querySelector('.start-screen');
const startButton = document.getElementById('start-button');
const timerDisplay = document.getElementById('timer-display');
const userScoreDisplay = document.getElementById('user-score');
let currentQuestionIndex = 0;
let timer;
let timeLeft = 60;
let userScore = 0;

function showQuestion(index) {
    if (index < questions.length) {
        questions[index].style.display = 'block';
        questions[index].classList.add('fade-in');
    }
}

function hideQuestion(index) {
    if (index < questions.length) {
        questions[index].style.display = 'none';
        questions[index].classList.remove('fade-in');
    }
}

function updateTimerDisplay() {
    timerDisplay.textContent = timeLeft;
}

function updateScoreDisplay() {
    userScoreDisplay.textContent = userScore;
}

function handleAnswer(event) {
    const button = event.target;
    const isCorrect = button.getAttribute('data-correct') === 'true';

    if (isCorrect) {
        userScore++;
    } else {
        timeLeft -= 10;          // <= Deduct 10 seconds for a wrong answer.
        if (timeLeft < 0) {
            timeLeft = 0;       // <=  Ensure the timer doesn't go negative.
        }
    }

    updateScoreDisplay();

    hideQuestion(currentQuestionIndex);

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        endQuiz();
    }
}

function startQuiz() {
    startScreen.style.display = 'none';
    showQuestion(currentQuestionIndex);
    startTimer();
}

function startTimer() {
    updateTimerDisplay();
    timer = setInterval(function () {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    hideQuestion(currentQuestionIndex);

    const quizContainer = document.querySelector('.quiz-container');
    const endScreen = document.createElement('div');
    endScreen.innerHTML = `
        <h2>Quiz Over!</h2>
        <p>Your score: ${userScore}</p>
        <input type="text" id="initials" placeholder="Your initials">
        <button id="save-button">Save</button>
    `;

    quizContainer.appendChild(endScreen);

    document.getElementById('save-button').addEventListener('click', function () {
        const initials = document.getElementById('initials').value;                                    // <=  Save initials and score or perform other actions.
    });
}

startButton.addEventListener('click', startQuiz);

const questions = document.querySelectorAll('.question');         // <=  Add this code to set up event listeners for question buttons.
questions.forEach((question, index) => {
    const buttons = question.querySelectorAll('button');
    buttons.forEach((button) => {
        button.addEventListener('click', handleAnswer);
    });
});
