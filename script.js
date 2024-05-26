let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let playerXScore = 0;
let playerOScore = 0;
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

function makeMove(index) {
    if (board[index] === "") {
        board[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            document.getElementById("status").innerText = currentPlayer + " wins!";
            updateScore(currentPlayer);
            disableBoard();
        } else if (board.every(cell => cell !== "")) {
            document.getElementById("status").innerText = "It's a draw!";
            disableBoard();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("status").innerText = "Player " + currentPlayer + "'s turn";
        }
    }
}

function checkWinner() {
    return winningCombos.some(combo => {
        return combo.every(index => board[index] === currentPlayer);
    });
}

function updateScore(player) {
    if (player === "X") {
        playerXScore++;
        document.getElementById("playerX").innerText = "Player X: " + playerXScore;
    } else {
        playerOScore++;
        document.getElementById("playerO").innerText = "Player O: " + playerOScore;
    }
}

function resetBoard() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    document.getElementById("status").innerText = "Player X's turn";
    enableBoard();
    renderBoard();
}

function renderBoard() {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = board[i];
    }
}

function disableBoard() {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
        cells[i].style.cursor = "default";
    }
}

function enableBoard() {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].setAttribute("onclick", `makeMove(${i})`);
        cells[i].style.cursor = "pointer";
    }
}

resetBoard(); // Initialize the board on page load
