// Add event listeners to RPS buttons.
const rpsButtons = document.querySelectorAll('.rpsButton');
rpsButtons.forEach( (button) => {
    button.addEventListener('click', (e) => {
        var playerSelection = button.id;
        var computerSelection = computerPlay();
        var result = playRound(playerSelection, computerSelection);
        updateResult(result, playerSelection, computerSelection);
        updateScore(result);
        });
    });

// Add listener to reset button.
const resetButton = document.querySelector('#resetbutton');
resetbutton.addEventListener('click', (e) => {
    var resetButton = document.querySelector('#resetButton-container');
    resetButton.style.visibility = 'hidden';
    var rpsButtons = document.querySelector('#rpsButton-container');
    rpsButtons.style.visibility = 'visible';
    var playerScoreDiv = document.querySelector('#playerScore');
    var cpuScoreDiv = document.querySelector('#cpuScore');
    playerScoreDiv.textContent = 'Your score: 0';
    cpuScoreDiv.textContent = 'Computer score: 0';
    const resultsDiv = document.querySelector('#results');
    if (resultsDiv) {
        const oldLine = resultsDiv.firstElementChild;
        if (oldLine) {
            resultsDiv.removeChild(oldLine);
        }
    }
    const instructionsDiv = document.querySelector('#instructions');
    instructionsDiv.textContent = 'First to five points wins!';
});

// Function to display the results of a game.
function updateResult(result, playerSelection, computerSelection) {
    const resultsDiv = document.querySelector('#results');
    if (resultsDiv) {
        const oldLine = resultsDiv.firstElementChild;
        if (oldLine) {
            resultsDiv.removeChild(oldLine);
        }
    }
    const newLine = document.createElement('p');
    newLine.textContent = getGameResult(result, playerSelection,
        computerSelection);
    resultsDiv.appendChild(newLine);

}

// Function to update the score.
function updateScore(result) {
    if (result == "Tie") {
        return;
    }
    var playerScoreDiv = document.querySelector('#playerScore');
    var cpuScoreDiv = document.querySelector('#cpuScore');
    var playerScore = Number(playerScoreDiv.textContent.toString().substr(-1));
    var cpuScore = Number(cpuScoreDiv.textContent.toString().substr(-1));
    if (result == "Win") {
        ++playerScore;
        if (playerScore == 5) endGame(result);
    } else {
        ++cpuScore;
        if (cpuScore == 5) endGame(result);
    }
    playerScoreDiv.textContent = "Your score: " + playerScore;
    cpuScoreDiv.textContent = "Computer score: " + cpuScore;
    return;
}

// Function to end game.
function endGame(result) {
    var rpsButtons = document.querySelector('#rpsButton-container');
    rpsButtons.style.visibility = 'hidden';
    var resetButton = document.querySelector('#resetButton-container');
    resetButton.style.visibility = 'visible';
    const instructionsDiv = document.querySelector('#instructions');
    if (result == 'Win') {
        instructionsDiv.textContent = 'You won the match! Press the reset button to play again.';
    } else {
        instructionsDiv.textContent = 'You lost the match! Press the reset button to play again.';
    }
}

// Function to make selection for computer play.
function computerPlay() {
    choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

// Function to determine winner of a round.
function playRound(playerSelection, computerSelection) {
    const WIN = "Win";
    const LOSE = "Lose";
    const TIE = "Tie";
    switch (playerSelection) {
        case "rock":
            if (computerSelection == "rock") {
                return TIE;
            } else if (computerSelection == "paper") {
                return LOSE;
            } else {
                return WIN;
            }
        case "paper":
            if (computerSelection == "rock") {
                return WIN;
            } else if (computerSelection == "paper") {
                return TIE;
            } else {
                 return LOSE;
            }
        case "scissors":
            if (computerSelection == "rock") {
                return LOSE;
            } else if (computerSelection =="paper") {
                return WIN;
            } else {
                return TIE;
            }
        default:
            // Invalid choice auto-loses.
            return LOSE;
        }
    // Safety default return
    return LOSE;
    }

// Capitalize first letter of a string.
function capitalize(str) {
    var firstLetter = str.charAt(0);
    var lowercase = str.slice(1);
    return firstLetter.toUpperCase() + lowercase.toLowerCase();
}

// Plays a game of RPS.
function game () {
    var computerScore = 0;
    var playerScore = 0;
    var computerSelection = computerPlay();
    var result = playRound(playerSelection, computerSelection);
    console.log(writeGameResult(result, playerSelection, computerSelection));
    if (result == "Win") {
        ++playerScore;
    } else if (result == "Lose") {
        ++computerScore;
    }
}

// Writes game result message.
function getGameResult(result, playerSelection, computerSelection) {
    const WIN = "You win! ";
    const LOSE = "You lose! ";
    const TIE = "You tie! ";
    const TIES = " ties ";
    const BEATS = " beats ";
    const GAMERESULT = "Last game: "
    switch (result) {
        case "Win":
            return GAMERESULT + WIN + capitalize(playerSelection) + BEATS + computerSelection;
        case "Lose":
            return GAMERESULT + LOSE + capitalize(computerSelection) + BEATS + playerSelection;
        default:
            return GAMERESULT + TIE + capitalize(playerSelection) + TIES + computerSelection;
    }
}

// Writes match result message.
function writeMatchResult(playerScore, computerScore) {
    if (playerScore > computerScore) {
        console.log("You win the match, " + playerScore + " to " + computerScore);
    } else if (computerScore > playerScore) {
        console.log("The computer wins the match, " + computerScore + " to " + playerScore);
    } else {
        console.log("The match was a draw, with " + playerScore +" wins each")
    }
    return;
}