// questions for array
var questions = [
    {
    title: "What is Fox Mulder's middle name?",
    choices: [
        "Steven",
        "William",
        "Wyatt",
        "James"
    ],
    answer: "William"  
},
{
    title: "What are the names of Dana Scully's children?",
    choices: [
        "Donna and Bill",
        "Betty and Archie",
        "Emily and William",
        "Eliza and William"
    ],
    answer: "Emily and William"
},
{
    title: "Detective Scully has given birth to one child.",
    choices: [
        "true",
        "false"
    ],
    answer: "False"
},
{
    title: "What pet did Mulder keep in his apartment?",
    choices: [
        "Hamster",
        "Dog",
        "Cat",
        "Fish"
    ],
    answer: "Fish"
},
{
    title: "What language other than English does Alex Krycek speak?",
    choices: [
        "Russian",
        "Czech",
        "Polish",
        "German"
    ],
    answer: "Russian"
},
{
    title: "What password does Mulder generally use?",
    choices: [
        "JTT047101111",
        "password",
        "trustno1",
        "truth"
    ],
    answer: "trustno1"
},
{
    title: "What US Armed Forces did Assistant Director Skinner serve?",
    choices: [
        "Navy",
        "Marines",
        "Air Force",
        "Army"
    ],
    answer: "Marines"
},
{
    title: "What does the name 'Queequeg' refer to in the series?",
    choices: [
        "Native American medicine",
        "Uncovered alien text",
        "Scully's dog",
        "Mulder's favourite band"
    ],
    answer: "Scully's dog"
},
{
    title: "What drink does Mulder prefer during stakeouts?",
    choices: [
        "iced tea",
        "coffee",
        "soda",
        "earl gray tea"
    ],
    answer: "iced tea"
},
{
    title: "Mulder's favourite baseball team is the New York Yankees.",
    choices: [
        "true",
        "false"
    ],
    answer: "true"
},
];

// set game timer in seconds
let count;

// number of questions
let numQuestions = questions.length;

// keep track of question index
let currentQuestion;

// game state
let gameStop = true;

// store current games score
let gameScore;

// timer variable
let timerInterval;

// holder for answers
let userAnswers = [];

// get elements for display
let time = document.getElementById("timer");
let score = document.getElementById("user-score");

let startBtn = document.getElementById("start-butt");
startBtn.addEventListener("click", newGame);

// get each div area
let welcomeArea = document.querySelector(".welcome-area");
let questionArea = document.querySelector(".ques-area");
let formArea = document.querySelector(".form-area");
let highScoreModal = document.querySelector(".modal-container");
let leaderboard = document.querySelector(".user-scores");
let leaderLink = document.querySelector(".top-score");
leaderLink.addEventListener("click", showLeader)

let qTitle = document.getElementById("ques-title");
let qChoices = document.getElementById("ques-choice");

// get form input element 
let username = document.getElementById("playername");

// submit input
let userSubmit = document.getElementById("playerAdd");
userSubmit.addEventListener("click", saveUser);

// modal settings
let closeModal = document.querySelector(".close")
closeModal.addEventListener("click", clearModal);

let exit = document.querySelector(".exit");
exit.addEventListener("click", clearModal);

let clearScores = document.querySelector(".clear");
clearScores.addEventListener("click", clearLeaderBoard);

// check localStorage, convert json objct into js object and sort array for highest score

function initialize() {

    // if nothing stored in local storage add some filler data
    if (localStorage.length === 0) {
        
        highScoreArray = [
            {
                username: "Jeeves",
                score: 90
            },
            {
                username: "Lovebird95",
                score: 85
            },
            {
                username: "Mulder101",
                score: 82
            }
        ];

        localStorage.setItem("userScores", JSON.stringify(highScoreArray));
    }

    // get scores from localStorage
    let findTopScore = localStorage.getItem("userScores");

    // parse string JSON object into js object
    let parsedScore = JSON.parse(findTopScore);
    console.log(parsedScore);

    // create a variables to hold the max score by which user;
    let max = 0;
    let user;

    // loop through to get top score
    for (let i = 0; i < parsedScore.length; i++) {
       
        if (max < parsedScore[i].score) {
            // set new max value
            max = parsedScore[i].score;
            user = parsedScore[i].username;
        }
    }

    questionArea.classList.add("hide");
    formArea.classList.add("hide");
    highScoreModal.classList.add("hide");

}

initialize();


// start a new game 
function newGame() {

    gameStop = false;
    gameScore = 0;
    currentQuestion = 0;

    // clear answer array for new game
    userAnswers = [];

    // set game time (in seconds)
    count = 90;
    // call timer function to initiate timerInterval
    timer();
    // display time on page
    time.textContent = count;

    // hide welcome area and show question area
    welcomeArea.classList.add("hide");
    questionArea.classList.remove("hide");

    check();
}

function timer() {
    timerInterval = setInterval(function() {
        // decrease time
        count--;
        // update display in DOM
        time.textContent = count;

        
        if (count === 0) {
            
            gameOver();
        }
    }, 1000)  // run every 1 second
}



// check if if any quesitons remain
function check() {
    if (currentQuestion === numQuestions) {
     
        gameOver();
    } else {
        displayQuestion();
    }
} 

// show question on page
function displayQuestion() {
    // clear question title
    qTitle.textContent = '';
    qChoices.textContent = '';

    for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
        qTitle.textContent = questions[currentQuestion].title;

        // create list el for choice
        let ansChoice = document.createElement("li");
        ansChoice.setAttribute("id", i);

        // add data attr to each choice
        ansChoice.setAttribute("data-name", `data-choice-${i}`);
        ansChoice.setAttribute("value", questions[currentQuestion].choices[i]);
        // add class containing css styling 
        ansChoice.classList.add("ans-choice");


        // Add event listener
        ansChoice.addEventListener("click", next)
        
        ansChoice.textContent = questions[currentQuestion].choices[i];

        // add choice to ul
        qChoices.appendChild(ansChoice);
    }

}

// log for next question
function next(event) {

    if(event.target.innerText === questions[currentQuestion].answer) {
        gameScore += 10;
    }

    // increase question counter
    currentQuestion++;

    // run check
    check();
}

// update variable, reset the timer and display score with player form
function gameOver() {
  
    gameStop = true;

    // clear timer
    clearInterval(timerInterval);
    time.textContent = "-- --";

    // add time left to game score
    gameScore += count;

    // hide question area
    questionArea.classList.add("hide");

    // display score
    score.textContent = gameScore;
    formArea.classList.remove("hide");
    username.value = '';
}


//  save player name and score total
function saveUser(event) {
   
    event.preventDefault();

    if (username.value == '') {
        return;
    }

    let tempArray = localStorage.getItem("userScores");
    
    let parsedTempArray = JSON.parse(tempArray);
    // if data store in localStorage run this
    if (parsedTempArray !== null) {
        // add game score to high score array
        parsedTempArray.push(
            {
                username: username.value,
                score: gameScore
            }
        );

        // sort highest to lowest scores before storing in localStorage
        sortScores(parsedTempArray);

        // save to localStorage by turning it into json obj
        localStorage.setItem('userScores', JSON.stringify(parsedTempArray));
    } else {  
        let highScoreArray = [];
        // add score to high score array
        highScoreArray.push(
            {
                username: username.value,
                score: gameScore
            }
        );
        localStorage.setItem('userScores', JSON.stringify(highScoreArray));
    }
    // clear form input field
    username.value = '';
    
    showLeader();
}

// get userScore from localStorage and display score board

function showLeader() {
    // hide areas
    formArea.classList.add("hide");
    questionArea.classList.add("hide");
    welcomeArea.classList.add("hide");

    // unhide leader board modal
    highScoreModal.classList.remove("hide");

    leaderboard.innerHTML = "";

    let highScoreBoard = localStorage.getItem('userScores');
    let parsedScoreBoard = JSON.parse(highScoreBoard);

    // loop through score array to add new score
    for (let i = 0; i < parsedScoreBoard.length; i++) {
        let newScore = document.createElement("li");
        newScore.textContent = parsedScoreBoard[i].username + " : " + parsedScoreBoard[i].score;
        newScore.classList.add("score-item");
        leaderboard.appendChild(newScore);
    }
}

// sort high to low scores
function sortScores(scoreObj) {
    // sort through obj and return scores highest to lowest
    scoreObj.sort( function(a, b) {
        // sort score values in the array of objects
        return b.score - a.score;
    });
}

// clear scoreboard
function clearLeaderBoard() {
    localStorage.removeItem("userScores");

    // clear element
    leaderboard.innerHTML = "";
}


// clear leader board modal and return to welcome screen

function clearModal() {
    // hide modal
    highScoreModal.classList.add("hide");
    // show welcome message
    welcomeArea.classList.remove("hide");
}

function outsideModal(event) {
    if (event.target == highScoreModal) {
        // hide modal
        highScoreModal.classList.add("hide");
        // unhide welcome
        welcomeArea.classList.remove("hide");
    }
} 

