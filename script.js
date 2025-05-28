const questions = [
    {
        question: "Which country won the 2023 Cricket World Cup?",
        answers: [
            { text: "India", correct: true },
            { text: "Australia", correct: false },
            { text: "England", correct: false },
            { text: "South Africa", correct: false },
        ]
    },
    {
        question: "Which Disney movie is based on William Shakespeare’s Hamlet?",
        answers: [
            { text: "The Lion King", correct: true },
            { text: "Aladdin", correct: false },
            { text: "Beauty and The Beast", correct: false },
            { text: "Frozen", correct: false },
        ]
    },
    {
        question: "Who is the constitutional head of the Government of India?",
        answers: [
            { text: "Prime Minister", correct: false },
            { text: "President", correct: true },
            { text: "Chief Justice of India", correct: false },
            { text: "Speaker of Lok Sabha", correct: false },
        ]
    },
    {
        question: "What is the name of the spacecraft that recently landed on the far side of the Moon?",
        answers: [
            { text: "Chandrayaan-3", correct: false },
            { text: "Artemis-1", correct: false },
            { text: "Chang’e-6", correct: true },
            { text: "Voyager-2", correct: false },
        ]
    },
    {
        question: "Who painted The Starry Night",
        answers: [
            { text: "Pablo Picasso", correct: false },
            { text: "Vincent van Gogh", correct: true },
            { text: "Leonardo da Vinci", correct: false },
            { text: "Claude Monet", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion()
{
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState()
{
    nextButton.style.display = "none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else
    {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore()
{
    resetState();
    if(score >= 4)
    {
        questionElement.innerHTML = "Excellent! 🎉" + ` You scored ${score} out of ${questions.length}!`;
    }
    else
    {
        questionElement.innerHTML = "Good try! 😐" + ` You scored ${score} out of ${questions.length}!`;
    }
    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = "block";
}

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else
    {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length)
    {
        handleNextButton();
    }
    else
    {
        startQuiz();
    }
})

startQuiz();