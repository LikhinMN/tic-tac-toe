document.addEventListener('DOMContentLoaded', () => {
    let boxes = document.querySelectorAll(".box");
    let turn = "X";
    let isGameover = false;

    boxes.forEach(e => {
        e.addEventListener("click", () => {
            if (!isGameover && e.innerHTML === "") {
                e.innerHTML = turn;
                if (checkWin()) {
                    highlightWin();
                } else {
                    checkDraw();
                    changeTurn();
                }
            }
        });
    });

    function changeTurn() {
        if (turn === "X") {
            turn = "O";
            document.querySelector(".bg").style.left = "85px";
        } else {
            turn = "X";
            document.querySelector(".bg").style.left = "0px";
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let grid = Array.from(boxes).map(box => box.innerHTML);
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
                isGameover = true;
                document.getElementById("results").textContent = `${grid[a]} wins!`;
                document.getElementById("results").style.display = "block";
                document.getElementById("play-again").style.display = "block";
                return pattern; 
            }
        }
        return null;
    }

    function highlightWin() {
        let winPattern = checkWin();
        if (winPattern) {
            winPattern.forEach(index => {
                boxes[index].classList.add("winner");
            });
        }
    }

    function checkDraw() {
        let grid = Array.from(boxes).map(box => box.innerHTML);
        if (grid.every(cell => cell !== "") && !isGameover) {
            isGameover = true;
            document.getElementById("results").textContent = "It's a draw!";
            document.getElementById("results").style.display = "block";
            document.getElementById("play-again").style.display = "block";
        }
    }

    document.getElementById("play-again").addEventListener("click", resetGame);

    function resetGame() {
        boxes.forEach(box => {
            box.innerHTML = "";
            box.classList.remove("winner");
        });
        isGameover = false;
        turn = "X";
        document.querySelector(".bg").style.left = "0px";
        document.getElementById("results").textContent = "";
        document.getElementById("results").style.display = "none";
        document.getElementById("play-again").style.display = "none";
    }
});
