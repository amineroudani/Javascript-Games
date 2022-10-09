const playerX = "X"
const playerO = "O"
const winCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
	[2, 5, 8],
	[2, 4, 6],
	[3, 4, 5],
	[6, 7, 8]
]

const cells = document.querySelectorAll(".cell")
const EndOfGame = document.querySelector(".EndOfGame")
const text = document.querySelector(".text")
const restart = document.querySelector(".restart")
document.body.style.cursor = "url(cursorX.cur), auto"

let playerOturn = false

start()

restart.addEventListener("click", start)

function start() {
    playerOturn = false
    for (const cell of cells) {
        document.body.style.cursor = "url(cursorX.cur), auto"
        cell.innerText = ""
        cell.classList.remove(playerX)
        cell.classList.remove(playerO)
        cell.removeEventListener("click", cellClick)
        cell.addEventListener("click", cellClick,  {once: true})
 
    text.innerText = ""
}
}

function cellClick(event) {
    const currentCell = event.target
    const currentClass = playerOturn ? playerO : playerX
    document.body.style.cursor = playerOturn ? "url(cursorX.cur), auto" : "url(cursorO.cur), auto"
    mark(currentCell, currentClass)
    if (win(currentClass)) {
        end(false)
    }
    else if (draw()) {
        end(true)
    }
    else {
        nextTurn()
    }
}       

function end(draw){
    if (draw) {
        text.innerHTML = "DRAW!"
        document.body.style.cursor = "not-allowed"
        document.classList.add('noclick')

    }
    else {
        
        text.innerHTML = `PLAYER ${playerOturn ? "O" : "X"} WINS !`
        document.body.style.cursor = "not-allowed"
        body.classList.add('noclick')
        document.classList.add('noclick')

        
    }
}

function draw() {
    let v = 0
    for (const cell of cells) {
        if (cell.classList.contains(playerX) || cell.classList.contains(playerO)) {
            v += 1
        }
    }
    return (v === 9)
}

function mark(cell, clss) {
    cell.classList.add(clss)
    cell.innerText = clss
    
}

function nextTurn() {
    if (playerOturn === false) {playerOturn = true}
    else if (playerOturn === true) {playerOturn = false}
}


function win(currentClass) {
	return winCombinations.some(combination => {
		return combination.every(index => {
			return cells[index].classList.contains(currentClass)
		})
	})
}
