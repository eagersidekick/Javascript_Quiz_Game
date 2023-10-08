//Question bank
var question1 = {
    number: "1",
    title: "What is your name?",
    choices: {
        a: "Heather",
        b: "Halle",
        c: "Brian"
    },
    answer: "A"
};

var question2 = {
    number: "2",
    title: "What is your favorite color?",
    choices: {
        a: "Teal",
        b: "Pink",
        c: "Purple",
    },
    answer: "C"
};

//question order
//var questionOrder = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

//function to display questions one at a time
function displayQuiz(question) {
    document.getElementById("question").innerHTML = question.title;

    var choicesElement = document.getElementById("choices");
    choicesElement.innerHTML = "";
    choicesElement.setAttribute("name", question.number);

    Object.entries(question.choices).forEach(([letter, text]) => {
        const newButton = document.createElement('button');
        newButton.textContent = text;
        newButton.name = letter;
        newButton.className = "buttons";
        choicesElement.appendChild(newButton);
    });       
}

