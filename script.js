// questions and answers
// TODO add questions and answers
var quiz = [
    {
        number: 1,
        question: "This is question 1?",
        answer: 3,
        choices: [
            "This is an incorrect answer",
            "This is also incorrect but moreso",
            "This is the correct answer"
        ]
    },
    {
        number: 2,
        question: "This is question 2?",
        answer: 3,
        choices: [
            "This is an incorrect answer",
            "This is also incorrect but moreso",
            "This is the correct answer"
        ]
    },
    {
        number: 3,
        question: "This is question 3?",
        answer: 3,
        choices: [
            "This is an incorrect answer",
            "This is also incorrect but moreso",
            "This is the correct answer"
        ]
    },
]

//handles
var startButton = document.querySelector(".start")
var choicesBtn = document.querySelectorAll(".choices-btn");
var timeRemaining = 30;
var questionNumber = 0;

// when user clicks Start! timer begins
startButton.addEventListener("click", startTimer);

// when user flicks Start! title and rules change
startButton.addEventListener("click", changeMessage);

// when user clicks Start! user is presented with first question
startButton.addEventListener("click", generateQuestion);

// When question is answered...
choicesBtn.addEventListener("click", answerSelected);



// Check if right > update score
// Check if wrong > decrease timer
// New question loads

// When all ? answered or timer is 0 GAME ENDS

// User can save initials and score

// Score is stored for later viewing in View Highscores

// User presented option to Play Again

function answersSelected() {

}

// Removes start button elements
function changeMessage() {
    var landingTitle = document.querySelector(".landing h1")
    var landingText = document.querySelector(".landing p")
    var landingButton = document.querySelector(".landing button")

    landingTitle.setAttribute("style", "display:none;");
    landingText.setAttribute("style", "display:none;");
    landingButton.setAttribute("style", "display:none;");
}

// Shows quiz deck
function generateQuestion() {
    console.log("Quiz started");
    var quizDeck = document.querySelector(".quiz-deck");
    
    // show the question
    var quizQst = document.createElement("h1");
    quizQst.innerHTML = quiz[questionNumber].question;
    quizDeck.appendChild(quizQst);

    // for each potential answer...
    for (var i = 0; i < quiz[questionNumber].choices.length; i++) {
        // make a button
        var choicesBtn = document.createElement("button")
        choicesBtn.setAttribute("class", "btn choices-btn");

        // define the content
        choicesBtn.setAttribute("name", quiz[questionNumber].choices[i])
        choicesBtn.innerHTML = quiz[questionNumber].choices[i];

        // append
        quizDeck.appendChild(choicesBtn);
        console.log("Generating..." + quiz[questionNumber].choices[i]);
    }

    //show footer
    var questionCount = document.querySelector("footer h1");
    questionCount.textContent = "Question " + quiz[questionNumber].number + " of x.";
}

// Begins timer
function startTimer() {
    var time = document.querySelector(".timer");
    var timerInterval = setInterval(function() {
        timeRemaining--;
        time.textContent = "Timer: " + timeRemaining +"s";

        if(timeRemaining === 0) {
            clearInterval(timerInterval);
            time.textContent = "Timer: " + timeRemaining +"s -- Time's Up!" ;
            console.log("Game Over");
            //TODO game over screen
        }

    }, 1000);
}



/*
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question

WHEN I answer a question
THEN I am presented with another question

WHEN I answer a question incorrectly
THEN time is subtracted from the clock

WHEN all questions are answered or the timer reaches 0
THEN the game is over

WHEN the game is over
THEN I can save my initials and my score
*/
