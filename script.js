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

// when user clicks Start! timer begins
startButton.addEventListener("click", startTimer);

// when user flicks Start! title and rules change
startButton.addEventListener("click", changeMessage);

// when user clicks Start! user is presented with first question
startButton.addEventListener("click", generateQuestion);



// New question loads

// When all ? answered or timer is 0 GAME ENDS

// User can save initials and score

// Score is stored for later viewing in View Highscores

// User presented option to Play Again

function checkAnswer(answer) {
    console.log("You have clicked answer: " + answer + " -- " + quiz[questionNumber].choices[answer]);

    // Check if right > update score
    if (answer == quiz[questionNumber].answer) {
        console.log(answer + " = " + quiz[questionNumber].answer + " -- Correct answer selected");
        timerIncrease();
        resetQuiz();
        questionNumber = questionNumber + 1;
        generateQuestion();

    } else {
    // Check if wrong > decrease timer
        console.log(answer + "=" + quiz[questionNumber].answer + " -- Wrong answer selected");
        timerDecrease();
        resetQuiz();
        questionNumber = questionNumber + 1;
        generateQuestion();
    }
    
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

//Game Over
function gameOver() {
    //Clear content
    var quizDeck = document.querySelector(".quiz-deck");
    while (quizDeck.firstChild) {
        quizDeck.removeChild(quizDeck.firstChild);
    }

    //Tally score

    //Display Game Over
    var gameOverHeader = document.createElement("h1")
    gameOverHeader.innerHTML = "Quiz Finished!"
    quizDeck.appendChild(gameOverHeader);

}

// Shows quiz deck
function generateQuestion() {
    console.log("Question spawned");
    var quizDeck = document.querySelector(".quiz-deck");
    var questionCount = document.querySelector("footer h1");
    var quizQuestionNumber = questionNumber + 1;

    // dynamically check if the quiz is over
    if (quizQuestionNumber > questionTotal) {
        console.log ("Game over");
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

            //choicesBtn.addEventListener("click", function() {
            //    checkAnswer(event.innerHTML);
            //});

            // display answer
            choicesBtn.innerHTML = choicesName;
            quizDeck.appendChild(choicesBtn);
            console.log("Generating answer " + + choicesBtn.value + ": " + choicesName);
        }   
    

    // When question is answered...
    //choicesBtn.addEventListener("click", answerSelected(choicesBtn.value));
    //quizDeck.addEventListener("click", ".choices-btn", function (event))

    //show footer
    questionCount.textContent = "Question " + quiz[questionNumber].number + " of " + questionTotal;
    }
}

//Reset
function resetQuiz () {
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
            console.log("Game Over");
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
