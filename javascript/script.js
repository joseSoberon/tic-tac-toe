const board = (() => {
    let board =
    ["", "", "",
     "", "", "",
     "", "", ""];

     return {board};
})();

const game = (() => {
    let gameActive = false;

    function isGameActive() {
        return gameActive;
    }

    function changeGameStatus() {
        gameActive = !gameActive;
    }

    function cleanBoard(board) {
        for (let i = 0; i < board.length; i++) {
            board[i] = ""
        }
    }

    function drawBoard(board) {
        const box = document.querySelectorAll(".box");
        for  (let i = 0; i < board.length; i++) {
            box[i].textContent = board[i];
        }
    }

    function swapTurns(player1, player2) {
        player1.toggleTurn();
        player2.toggleTurn();
    }

    function checkWinner(board, player) {
        if (board[0] == player && board[1] == player && board[2] == player) {
            return true;
        }
        else if (board[3] == player && board[4] == player && board[5] == player) {
            return true;
        }
        else if (board[6] == player && board[7] == player && board[8] == player) {
            return true;
        }
        else if (board[0] == player && board[3] == player && board[6] == player) {
            return true;
        }
        else if (board[1] == player && board[4] == player && board[7] == player) {
            return true;
        }
        else if (board[2] == player && board[5] == player && board[8] == player) {
            return true;
        }
        else if (board[0] == player && board[4] == player && board[8] == player) {
            return true;
        }
        else if (board[2] == player && board[4] == player && board[6] == player) {
            return true;
        }
    }

    function checkTie(board) {
        for (let i = 0; i < board.length; i++) {
            if (board[i] == "") {
                return false;
            }
        }
        return true;
    }

    return {
        cleanBoard, drawBoard, isGameActive,
        changeGameStatus, swapTurns, checkWinner,
        checkTie
    };
})();

const player = (mark, turn) => {
    let winner = false;

    function isTurnActive() {
        return turn;
    }

    function toggleTurn() {
        turn = !turn;
    }

    function move(board, position, player) {
        if (board[position] == "") {
            board[position] = mark;
            return board;
        }
        console.log("This is a ocupated box");
        return board;
    }

    return {turn, mark, winner, isTurnActive, toggleTurn, move};
};

let newGame = game;
let newBoard = board;

let player1 = player("o", true);
let player2 = player("x", false);

// Start game button
const startGame = document.querySelector(".start-game");
startGame.addEventListener("click", () => {
    newGame.changeGameStatus();
    startGame.remove();
})

// Restart game button
const buttonsSection = document.querySelector(".buttons");
const newGameButton = document.createElement("button");

newGameButton.addEventListener("click", () => {
    newGame.cleanBoard(newBoard.board);
    newGame.drawBoard(newBoard.board);
    newGame.changeGameStatus();
})

// Game Logic
const boxes = document.querySelectorAll(".box");

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (newGame.isGameActive()) {
            if(player1.isTurnActive()) {
                player1.move(newBoard.board, box.id, player1);
                player1.winner = newGame.checkWinner(newBoard.board, player1.mark)
            }
            else if (player2.isTurnActive()) {
                player2.move(newBoard.board, box.id, player2.mark);
                player2.winner = newGame.checkWinner(newBoard.board, player2.mark)
            }
            newGame.swapTurns(player1, player2);
            newGame.drawBoard(newBoard.board);

            if (player1.winner == true || player2.winner == true || newGame.checkTie(newBoard.board)) {
                if (newGame.checkTie(newBoard.board)) {
                    console.log("It is a tie!")
                }
                else {
                    if (player1.winner == true) {
                        console.log("Player 1 wins")
                    }
                    else if (player2.winner == true) {
                        console.log("Player 2 wins");
                    }
                }
                newGame.changeGameStatus();


                newGameButton.textContent = "Restart";
                buttonsSection.appendChild(newGameButton);
            }
        }
    })
})
