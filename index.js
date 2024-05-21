// Choices that the player can choose from
const choices = ['Quartz', 'Parchment', 'Shears']; 

// Holds the player's choice
const playerDisplay = document.getElementById("playerDisplay");
// Holds the computer's choice
const computerDisplay = document.getElementById("computerDisplay");

// Holds the result of the game
const resultDisplay = document.getElementById("resultDisplay");

// Holds the score of the player
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
// Holds the score of the computer
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
// Holds the amount of ties the player and computer has
const tieScoreDisplay = document.getElementById("tieScoreDisplay");

// Button used to clear score
const clearBtn = document.getElementById("clear-btn");

// Set all scores to 0
let playerScore = 0;
let computerScore = 0;
let tieScore = 0;

// Function to play game once choice button has been clicked
function playGame(playerChoice) {
    // Computer chooses a random choice from the choices array
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = "";

    // If the player chooses the same as the computer, it's a tie
    if (playerChoice === computerChoice) {
        result = "IT'S A TIE!";
    }
    else {
        // We all know the rules for this game
        switch (playerChoice) {
            case "Quartz":
                result = (computerChoice === "Shears") ? "YOU WIN!" : "YOU LOSE!";
                break;
            case "Parchment":
                result = (computerChoice === "Quartz") ? "YOU WIN!" : "YOU LOSE!";
                break;
            case "Shears":
                result = (computerChoice === "Parchment") ? "YOU WIN!" : "YOU LOSE!";
                break;
        }
    }

    // Display the player and computer's choices and the result
    playerDisplay.textContent = `PLAYER: ${playerChoice}`;
    computerDisplay.textContent = `COMPUTER: ${computerChoice}`;
    resultDisplay.textContent = result;

    // Reset the current color of the result display
    resultDisplay.classList.remove("greenText", "redText", "blueText");

    // Increment the score based on the result and update the local storage
    switch (result) {
        case "YOU WIN!":
            resultDisplay.classList.add("greenText");
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
            localStorage.setItem('playerScore', playerScore);
            break;
        case "YOU LOSE!":
            resultDisplay.classList.add("redText");
            computerScore++;
            computerScoreDisplay.textContent = computerScore;
            localStorage.setItem('computerScore', computerScore);
            break;
        case "IT'S A TIE!":
            resultDisplay.classList.add("blueText");
            tieScore++;
            tieScoreDisplay.textContent = tieScore;
            localStorage.setItem('tieScore', tieScore);
            break;
    }
}

// Reset scores and clear the result display when the clear button is clicked
clearBtn.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    tieScore = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    tieScoreDisplay.textContent = tieScore;
    localStorage.removeItem('playerScore');
    localStorage.removeItem('computerScore');
    localStorage.removeItem('tieScore');

    playerDisplay.textContent = `PLAYER: None`;
    computerDisplay.textContent = `COMPUTER: None`;
    resultDisplay.textContent = "";
});

// Display current scores from local storage on page load
window.onload = function() {
    playerScore = localStorage.getItem('playerScore') ? parseInt(localStorage.getItem('playerScore')) : 0;
    computerScore = localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;
    tieScore = localStorage.getItem('tieScore') ? parseInt(localStorage.getItem('tieScore')) : 0;

    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    tieScoreDisplay.textContent = tieScore;
}