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
        question: "A function associated with an object is called:",
        answer: 0,
        choices: [
            "Method",
            "Link",
            "Function",
            "None of the above"
        ]
    },
    {
        number: 3,
        question: "JavaScript is a ___-side programming language.",
        answer: 3,
        choices: [
            "Client",
            "Server",
            "Neither",
            "Both"
        ]
    },
    {
        number: 4,
        question: "Which Dialog Box displays a message and a data entry field?",
        answer: 2,
        choices: [
            "Alert()",
            "Confirm()",
            "Prompt()",
            "Question()",
            "Input()"
        ]
    },
    {
        number: 5,
        question: "Which of the following statements will throw an error?",
        answer: 1,
        choices: [
            "var fun = function bar(){}",
            "var fun = function bar{}",
            "function fun(){}"
        ]
    },
    {
        number: 6,
        question: "What will the code 'boolean(3<7) return?",
        answer: 0,
        choices: [
            "True",
            "False",
            "Undefined",
            "Null",
            "None"
        ]
    },
    {
        number: 7,
        question: "Which of the following will return the type of the arguments passed to a function?",
        answer: 0,
        choices: [
            "typeof operator",
            "getType function",
            "Both"
        ]
    },
    {
        number: 8,
        question: "Which of the following statements is valid for the features of JavaScript??",
        answer: 3,
        choices: [
            "JavaScript is complementary to and integrated with Java.",
            "JavaScript is designed for creating network-centric applications.",
            "JavaScript is a lightweight, interpreted programming language.",
            "All of the above"
        ]
    },
    {
        number: 9,
        question: "What is the function of Array object that adds and/or removes elements from an array??",
        answer: 1,
        choices: [
            "sort()",
            "splice()",
            "shift()",
            "send()"
        ]
    },
    {
        number: 10,
        question: "Which of the following methods removes the last element from an array and returns that element??",
        answer: 4,
        choices: [
            "last()",
            "get()",
            "anchor()",
            "grab()",
            "pop()"
        ]
    },
    
]

//handles
var startButton = document.querySelector(".start");
var viewScore = document.querySelector(".view-score");
var quizDeck = document.querySelector(".quiz-deck");
var timeRemaining = 30;
var questionNumber = 0;
var questionTotal = quiz.length;
var currentScore = 0;
var highScore = 0;
var correctAnswers = 0;
var stopTime = false;

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

// highscore viewer 
viewScore.addEventListener("click", highScoreView);

function checkAnswer(answer) {
    console.log("You have clicked answer: " + answer + " -- " + quiz[questionNumber].choices[answer]);
    var answerFeedback = document.querySelector("footer p");
    
    // Check if right > update score
    if (answer == quiz[questionNumber].answer) {
        timerIncrease();
        clearQuizDeck();
        questionNumber = questionNumber + 1;
        correctAnswers = correctAnswers + 1;
        answerFeedback.textContent = "Correct! :]"
        generateQuestion();

    } else {
    // Check if wrong > decrease timer
        timerDecrease();
        clearQuizDeck();
        questionNumber = questionNumber + 1;
        generateQuestion();
        answerFeedback.textContent = "Wrong. :["
    }
    
}

//Game Over
function gameOver() {
    //Clear content
    stopTime = true;
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
    var initialsLabel = document.createElement("label");
    var initialsInput = document.createElement("input");
    var saveButton = document.createElement("button");
    var resetButton = document.createElement("button");

    initialsLabel.innerHTML = "Enter Initials: "
    initialsInput.setAttribute("type", "text"); 
    initialsInput.setAttribute("maxlength", "3");
    initialsInput.setAttribute("value", "AAA")
    saveButton.innerHTML = "Save Score";
    saveButton.setAttribute("class", "btn");
    resetButton.innerHTML = "Retake Quiz";
    resetButton.setAttribute("class", "btn");

    quizDeck.appendChild(initialsLabel);
    quizDeck.appendChild(initialsInput);
    quizDeck.appendChild(saveButton);
    quizDeck.appendChild(resetButton);

    //Listen to input
    saveButton.addEventListener("click", function(event) {
        event.preventDefault();

        //handle initials
        var initials = initialsInput.value;

        var highscore = {
            initials: initials,
            score: currentScore
        };
        
        //Locally store highscores
        var scoreStorage = JSON.parse(localStorage.getItem("highscoreList"));

        var highscoreList;
        if (scoreStorage !== null) {
            highscoreList = scoreStorage.concat(highscore);
            //highscoreList = [...scoreStorage, highscore];

        } else {
            highscoreList = [highscore];
        }

        localStorage.setItem("highscoreList", JSON.stringify(highscoreList));

    });  
    
    //reload quiz
    resetButton.addEventListener("click", resetQuiz);
}

// Shows quiz deck
function generateQuestion() {
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

// view highscore button
function highScoreView(event) {
    event.preventDefault();
    clearQuizDeck();
    stopTime = true;

    // Display initials and scores
    var scoreAr = JSON.parse(localStorage.getItem("highscoreList"));

    for (var i = 0; i < scoreAr.length; i++) {
        var display = document.createElement("h1");
        display.setAttribute("class", "score-array");
        display.innerHTML = scoreAr[i].initials.toUpperCase() + " - " + scoreAr[i].score;

        quizDeck.appendChild(display);
        
    }

    var resetButton = document.createElement("button");
    resetButton.innerHTML = "Take Quiz";
    resetButton.setAttribute("class", "btn")
    quizDeck.appendChild(resetButton);

    resetButton.addEventListener("click", resetQuiz);
}

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

function resetQuiz() {
    clearQuizDeck();
    timeRemaining = 30;
    questionNumber = 0;
    currentScore = 0;
    highScore = 0;
    correctAnswers = 0;
    stopTime = false;
    generateQuestion();
    startTimer();
}

// Begins timer
function startTimer() {
    var time = document.querySelector(".timer");
    var timerInterval = setInterval(function() {
        timeRemaining--;
        time.textContent = "Timer: " + timeRemaining +"s";

        if(timeRemaining === 0) {
            clearInterval(timerInterval);
            time.textContent = "Timer: " + timeRemaining +"s - Paused";
            gameOver();
        } else if (stopTime === true) {
            clearInterval(timerInterval);
            time.textContent = "Timer: " + timeRemaining + "s - Paused";
        }

    }, 1000);
}

function timerDecrease() {
    timeRemaining = timeRemaining - 5;
}

function timerIncrease() {
    timeRemaining = timeRemaining + 2;
}

