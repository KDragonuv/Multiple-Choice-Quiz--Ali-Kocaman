 

const questions = [
    {
      question: "Inside which HTML element do we put the JavaScript?",
      choices: ["A. <javascript>", "B. <js>", "C. <scripting>", "D. <script>"],
      correctAnswer: "D"
    },
    {
      question: "How do you write 'Hello World' in an alert box?",
      choices: ["A. msg('Hello World');", "B. alert('Hello World');", "C. msgBox('Hello World');", "D. alertBox('Hello World');"],
      correctAnswer: "B"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let highestScore = 0;
  let timer;
  let timerSeconds = 15;
  
  document.getElementById("submitButton").addEventListener("click", checkAnswer);
  
  function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    const choices = document.querySelectorAll("input[name=choice]");
    for (let i = 0; i < choices.length; i++) {
      choices[i].nextElementSibling.textContent = q.choices[i];
    }
    resetTimer();
  }
  
  function resetTimer() {
    clearInterval(timer);
    timerSeconds = 15;
    updateTimer();
    timer = setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
    document.getElementById("timer").textContent = `Time: ${timerSeconds}`;
    if (timerSeconds === 0) {
      checkAnswer();
    }
    timerSeconds--;
  }
  
  function checkAnswer() {
    clearInterval(timer);
    const selectedAnswer = document.querySelector("input[name=choice]:checked");
    if (selectedAnswer) {
      if (selectedAnswer.value === questions[currentQuestion].correctAnswer) {
        score++;
        if (score > highestScore) {
          highestScore = score;
          document.getElementById("highScore").textContent = `Highest Score: ${highestScore}`;
        }
      }
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }
  }
  
  function showResult() {
    const result = document.getElementById("result");
    result.textContent = `You scored ${score} out of ${questions.length}!`;
    document.getElementById("quiz").style.display = "none";
  }
  
  loadQuestion();