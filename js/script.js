//variables
var choicesElement = document.getElementById("choices");
var questionIndex = 0;
var quizGrade = 0;
var startButton = document.getElementById("startbutton");
var leaderboardEl = document.getElementById("leaderboard");
var quizEl = document.getElementById("quiz");
var startScreenEl = document.getElementById("startscreen");
var timeRemaining = 20;
var timeEl = document.getElementById("timer");
var timerInterval;

//Question bank
var question1 = {
    title: "What does addEventListener do?",
    choices: {
        a: "attaches to an element and listens for an event",
        b: "adds an element called Listener to the document",
        c: "names a function"
    },
    answer: "a"
};

var question2 = {
    title: "How would you call the timer function?",
    choices: {
        a: "()timer",
        b: "timer{}",
        c: "timer()",
    },
    answer: "c"
};

var question3 = {
    title: "Which of these most closely defines what Javascript does for a webpage?",
    choices: {
        a: "creates the structure of the webpage",
        b: "specifies the look of the webpage",
        c: "adds interactivity to the webpage",
    },
    answer: "c"
};

var question4 = {
    title: "Which variable cannot be reassigned?",
    choices: {
        a: "let",
        b: "const",
        c: "var",
    },
    answer: "b"
};

var question5 = {
    title: "How could you log the string 'hello World' to the console?",
    choices: {
        a: "helloworld.console;",
        b: "console.log('hello World');",
        c: "console.helloworld.log",
    },
    answer: "b"
};

var question6 = {
    title: "What is the HTML tag for linking to the Javascript?",
    choices: {
        a: "<script>",
        b: "<java>",
        c: "<js>",
    },
    answer: "a"
};

var question7 = {
    title: "Which of these means 'and'?",
    choices: {
        a: "||",
        b: "&",
        c: "&&",
    },
    answer: "c"
};

var question8 = {
    title: "What is there difference between '==' and '==='?",
    choices: {
        a: "They are functionally the same",
        b: "Both compare values but '===' is type strict where '==' is not",
        c: "'===' compares types where '==' compares value",
    },
    answer: "b"
};

var question9 = {
    title: "How do you write an IF statement?",
    choices: {
        a: "if (a == b)",
        b: "if {a == b}",
        c: "if a == b;",
    },
    answer: "a"
};

var question10 = {
    title: "Can you learn Javascript?",
    choices: {
        a: "Yes!",
        b: "No!",
    },
    answer: "a"
}

//question order
var questionOrder = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];


//start quiz function
startButton.addEventListener("click", function() {
    startScreenEl.style.display = "none";
    quizEl.style.display = "block";
    displayQuiz(question1);
    timer();
});

// document.getElementById("leaderboard").style.display = "none";
// document.getElementById("quiz").style.display = "none";



//function to display questions one at a time
function displayQuiz(question) {
    document.getElementById("question").innerHTML = question.title;
    choicesElement.innerHTML = "";

    Object.entries(question.choices).forEach(([letter, text]) => {
        const newButton = document.createElement('button');
        newButton.textContent = text;
        newButton.name = letter;
        newButton.className = "buttons";
        choicesElement.appendChild(newButton);     
        newButton.addEventListener("click", processAnswer);
    });
}
//function to process what happens after an answer button is pressed.
function processAnswer(event) {
    var answer = questionOrder[questionIndex].answer;
    if (event.target.getAttribute("name") === answer) {
        quizGrade += 10;
        document.getElementById("score").innerHTML = "Your score: " + quizGrade + " out of 100";
        document.getElementById("message").innerHTML = "Congrats! That's correct!";
    }
    else document.getElementById("message").innerHTML = "Sorry, you got it wrong!";
        document.getElementById("score").innerHTML = "Your score: " + quizGrade + " out of 100";
    questionIndex++;
    if (questionOrder.length === questionIndex) endOfQuiz();
    else displayQuiz(questionOrder[questionIndex]);
}

//function for displaying the leaderboard


function endOfQuiz() {
    clearInterval(timerInterval);
    leaderboardEl.style.display = "block";
    quizEl.style.display = "none";
    let playerName = window.prompt("Please enter your name to store your score.");
        while (playerName < 1 || playerName > 24) {
            playerName = window.prompt("Please enter a name between 1 and 24 characters.");
        }
        displayLeaderboard(saveHighScores(playerName));
}

//function for saving your score
function saveHighScores(playerName) {
    const highScoreList = JSON.parse(localStorage.getItem("highscores")) ?? [];
    const newHighScore = { quizGrade, playerName };
    highScoreList.push(newHighScore);
    highScoreList.sort((a, b) => b.quizGrade - a.quizGrade);
    localStorage.setItem("highscores", JSON.stringify(highScoreList));
    return highScoreList;
}

//function for displaying high scores
function displayLeaderboard(highScoreList) {
    var leaderboard = document.getElementById("highscores");
    leaderboard.innerHTML = "";
    

    Object.entries(highScoreList).forEach(([id, score]) => {
        if (parseInt(id) >= 10) return;
        
        var scoreItem = document.createElement('li');
        scoreItem.innerHTML = score.quizGrade + " - " + score.playerName;
        leaderboard.appendChild(scoreItem);
    });
}

//timer function
function timer() {
    // Sets interval in variable
    timerInterval = setInterval(function() {
      timeRemaining--;
      var secondsDisplay; 
      var minutes = Math.floor(timeRemaining / 60);
      var seconds = timeRemaining % 60;
      if (seconds < 10) {secondsDisplay = "0" + seconds;}
      else {secondsDisplay = seconds;}

      timeEl.innerHTML = minutes + ":" + secondsDisplay;
  
      if(timeRemaining === 0) {
        // Stops execution of action at set interval
        endOfQuiz();
      }
  
    }, 1000);
  }

//NOTES
// //what do i need to know for a leaderboard?
// playerscore
// playernames
// last 10 highscores + last 10 playernames

// //what does my scoreboard need to do?
// store 10 highest scores
// check current score and compare against the last 10 high scores
// replace the lowest highscore and reorder list


//starts the quiz

