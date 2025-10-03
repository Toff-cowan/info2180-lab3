// Tic Tac Toe game logic

//
window.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll("#board div");
  const status = document.getElementById("status");
  const newGameBtn = document.querySelector(".btn");
  let currentPlayer = "X"; // Start with X
  let activeGame = true;

  const gameCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  // Initialize the board squares
  squares.forEach(square => {
    square.classList.add("square");

    //click event listener for each square
    square.addEventListener("click", () => {
      if (activeGame && square.textContent === "") {
        square.textContent = currentPlayer;
        square.classList.add(currentPlayer);

        if (checkForWinner(currentPlayer)) {
          GameWinner(currentPlayer);
        }
        else if (checkForDraw()) {
          GameDraw();
        }
        else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      }
    });

    // Hover effect
    square.addEventListener("mouseover", () => {
      if (activeGame && square.textContent === "") {
        square.classList.add("hover");
      }
    });

    square.addEventListener("mouseout", () => {
      square.classList.remove("hover");
    });
  });

  // Winner checker
  function checkForWinner(player) {
    return gameCombos.some(combination => {
      return combination.every(index => squares[index].textContent === player);
    });
  }
  function checkForDraw() {
    return [...squares].every(square => square.textContent !== "");
  }

  function GameWinner(player) {
    status.textContent = `Congratulations! ${player} is the Winner!`;
    status.classList.add("you-won");
    activeGame = false;
  }
  // Draw checker
  function GameDraw() {
    status.textContent = "It's a Draw!";
    status.classList.add("you-won");
    activeGame = false;
  }


  // Restart game function
  function restartGame() {
    squares.forEach(square => {
      square.textContent = "";
      square.classList.remove("X", "O", "hover");
    });
    status.textContent = "Move your mouse over a square and click to play an X or an O.";
    status.classList.remove("you-won");
    currentPlayer = "X";
    activeGame = true;
  }

  newGameBtn.addEventListener("click", restartGame);
});
