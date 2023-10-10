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
    if (questionOrder.length === questionIndex) displayLeaderboard();
    else displayQuiz(questionOrder[questionIndex]);
}

//function for displaying the leaderboard
function displayLeaderboard() {

}

//starts the quiz
displayQuiz(question1);
