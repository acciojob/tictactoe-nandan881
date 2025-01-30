//your JS code here. If required.
document.getElementById("submit").addEventListener("click", function() {
    let player1 = document.getElementById("player-1").value.trim();
    let player2 = document.getElementById("player-2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names.");
        return;
    }

    // Hide the form and show the board
    document.getElementById("player-form").style.display = "none";
    document.getElementById("game-board").style.display = "block";

    // Initialize game state
    startGame(player1, player2);
});

function startGame(player1, player2) {
    let currentPlayer = "X";
    let currentPlayerName = player1;
    let board = ["", "", "", "", "", "", "", "", ""];
    let message = document.getElementById("message");
    let gameOver = false;

    message.textContent = `${currentPlayerName}, you're up!`;

    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.textContent = ""; 
        cell.addEventListener("click", function handleClick() {
            if (board[cell.id - 1] === "" && !gameOver) {
                board[cell.id - 1] = currentPlayer;
                cell.textContent = currentPlayer;

                if (checkWinner(board, currentPlayer)) {
                    message.textContent = `${currentPlayerName}, congratulations you won!`;
                    gameOver = true;
                    document.getElementById("reset").style.display = "block";
                    return;
                }

                if (board.every(cell => cell !== "")) {
                    message.textContent = "It's a draw!";
                    gameOver = true;
                    document.getElementById("reset").style.display = "block";
                    return;
                }

                currentPlayer = currentPlayer === "X" ? "O" : "X";
                currentPlayerName = currentPlayer === "X" ? player1 : player2;
                message.textContent = `${currentPlayerName}, you're up!`;
            }
        }, { once: true });
    });

    document.getElementById("reset").addEventListener("click", function() {
        location.reload();
    });
}

function checkWinner(board, player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );
}
