//variables
var choicesElement = document.getElementById("choices");
var questionIndex = 0;
var quizGrade = 0;


//Question bank
var question1 = {
    title: "What is your name?",
    choices: {
        a: "Heather",
        b: "Halle",
        c: "Brian"
    },
    answer: "a"
};

var question2 = {
    title: "What is your favorite color?",
    choices: {
        a: "Teal",
        b: "Pink",
        c: "Purple",
    },
    answer: "c"
};

document.getElementById("leaderboard").style.display = "none";

//question order
var questionOrder = [question1, question2];
//, question3, question4, question5, question6, question7, question8, question9, question10

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
    document.getElementById("leaderboard").style.display = 'block';

    let playerName = window.prompt("Please enter your name to store your score.");
        while (playerName < 1 || playerName > 24) {
            playerName = window.prompt("Please enter a name between 1 and 24 characters.");
        }
        displayLeaderboard(saveHighScores(playerName));
}

function saveHighScores(playerName) {
    const highScoreList = JSON.parse(localStorage.getItem("highscores")) ?? [];
    const newHighScore = { quizGrade, playerName };
    highScoreList.push(newHighScore);
    highScoreList.sort((a, b) => b.quizGrade - a.quizGrade);
    localStorage.setItem("highscores", JSON.stringify(highScoreList));
    return highScoreList;
}

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
displayQuiz(question1);
