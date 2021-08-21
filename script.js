// questions and answers
// TODO add questions and answers
var quiz = [
    {
        number: 1,
        question: "What is the correct extension for a JavaScript file?",
        answer: 2,
        choices: [
            ".xml",
            ".css",
            ".js",
            ".html",
            ".java"
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
var timeRemaining = 30;
var questionNumber = 0;
var questionTotal = quiz.length;
var currentScore = 0;
var highScore = 0;
var correctAnswers = 0;

//initialize
document.addEventListener('DOMContentLoaded', function() {
    init();
}, false);

// when user clicks Start! timer begins
startButton.addEventListener("click", startTimer);

// when user flicks Start! title and rules change
startButton.addEventListener("click", clearQuizDeck);

// when user clicks Start! user is presented with first question
startButton.addEventListener("click", generateQuestion);

// User can save initials and score

// Score is stored for later viewing in View Highscores

// User presented option to Play Again

function checkAnswer(answer) {
    console.log("You have clicked answer: " + answer + " -- " + quiz[questionNumber].choices[answer]);
    var answerFeedback = document.querySelector("footer p");
    
    // Check if right > update score
    if (answer == quiz[questionNumber].answer) {
        timerIncrease();
        clearQuizDeck();
        questionNumber = questionNumber + 1;
        correctAnswers = correctAnswers + 1;
        answerFeedback.textContent = "Correct!"
        generateQuestion();

    } else {
    // Check if wrong > decrease timer
        timerDecrease();
        clearQuizDeck();
        questionNumber = questionNumber + 1;
        generateQuestion();
        answerFeedback.textContent = "Wrong."
    }
    
}


//Game Over
function gameOver() {
    //Clear content
    var quizDeck = document.querySelector(".quiz-deck");
    while (quizDeck.firstChild) {
        quizDeck.removeChild(quizDeck.firstChild);
    }

    //Tally score
    currentScore = timeRemaining * correctAnswers;

    //Display Game Over
    var gameOverHeader = document.createElement("h1")
    gameOverHeader.innerHTML = "- - Quiz Finished - -";

    var gameOverP = document.createElement("p");
    gameOverP.innerHTML = "Enter your initials below and hit submit to save your score."

    var gameOverScoreHeader = document.createElement("h2");
    gameOverScoreHeader.innerHTML = "You scored " + currentScore + " points.";

    quizDeck.appendChild(gameOverHeader);
    quizDeck.appendChild(gameOverP);
    quizDeck.appendChild(gameOverScoreHeader);

    //create high score submit form
    var scoreForm = document.createElement("form");
    var initialsLabel = document.createElement("label");
    var initialsInput = document.createElement("input");
    var saveButton = document.createElement("input");

    initialsLabel.innerHTML = "Enter Initials: "
    initialsInput.setAttribute("type", "text"); 
    initialsInput.setAttribute("maxlength", "3");
    initialsInput.setAttribute("name", "intName");
    saveButton.setAttribute("type", "submit")
    saveButton.innerHTML = "Save Score";
    saveButton.setAttribute("class", "btn");

    quizDeck.appendChild(scoreForm);
    scoreForm.appendChild(initialsLabel);
    scoreForm.appendChild(initialsInput);
    scoreForm.appendChild(saveButton);

    //Listen to input
    saveButton.addEventListener("click", function(event) {
        event.preventDefault();

        //handle initials
        var highscore = {
            initials: intName.value,
            score: currentScore
        };
        var highscoreList = [];

        highscoreList.push(highscore);

        localStorage.setItem("highscoreList", JSON.stringify("highscoreList"));
    });    
}

// Shows quiz deck
function generateQuestion() {
    var quizDeck = document.querySelector(".quiz-deck");
    var questionCount = document.querySelector("footer h1");
    var quizQuestionNumber = questionNumber + 1;

    // dynamically check if the quiz is over
    if (quizQuestionNumber > questionTotal) {
        gameOver();
    }
    
    else {
        // show the question
        var quizQst = document.createElement("h1");
        quizQst.innerHTML = quiz[questionNumber].question;
        quizDeck.appendChild(quizQst);

        // for each potential answer...
        for (var i = 0; i < quiz[questionNumber].choices.length; i++) {
            // make a button
            var choicesBtn = document.createElement("button")
            var choicesName = quiz[questionNumber].choices[i]
            

            // define the content
            choicesBtn.setAttribute("class", "btn choices-btn");
            choicesBtn.setAttribute("value", i)

            //listen for answer [closure] TODO figure out why it always outputs last button 
            var c = choicesBtn
            if (typeof choicesBtn.addEventListener === 'function'){
                (function (c) {
                    c.addEventListener("click", function() {
                        checkAnswer(c.value);
                    });
                })(c);
            }

            // display answer
            choicesBtn.innerHTML = choicesName;
            quizDeck.appendChild(choicesBtn);
        }   

    //show footer
    //show right/wrong answer feedback only after first question
    questionCount.textContent = "Question " + quiz[questionNumber].number + " of " + questionTotal;
    }
}

function highScoreView() {

}

/* function storeHighscore() {
    var highscoreStored = localStorage.getItem("highscore");

    if(highscoreStored !== null){
        if (currentScore > highscoreStored) {
            localStorage.setItem("highscore", currentScore);      
        }
    }
    else{
        localStorage.setItem("highscore", currentScore);
        
    }

    highScore = highscoreStored;
} 
*/

function init() {
    console.log("Loaded");
}

//Reset
function clearQuizDeck () {
    var quizDeck = document.querySelector(".quiz-deck");
    while (quizDeck.firstChild) {
        quizDeck.removeChild(quizDeck.firstChild);
    }
    
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
            gameOver();
        }

    }, 1000);
}

function timerDecrease() {
    timeRemaining = timeRemaining - 5;
}

function timerIncrease() {
    timeRemaining = timeRemaining + 2;
}



/*

WHEN all questions are answered or the timer reaches 0
THEN the game is over

WHEN the game is over
THEN I can save my initials and my score
*/
