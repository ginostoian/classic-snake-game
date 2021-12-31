const grid = document.querySelector('.grid')
const startBtn = document.querySelector('#start')
const scoreBoard = document.querySelector('#score')
let squares = []
let currentSnake = [2, 1, 0]
const width = 10
let direction = 1
let appleIndex = 0
let score = 0
let intervalTime = 1000
let timerId = 0

function generateGrid() {
    for (let i = 0; i < width * width; i++) {
        // Create new DOM element
        const square = document.createElement('div')
        // Append each square to the grid
        grid.appendChild(square)
        // Push each created square into an array
        squares.push(square)
    }
    // Add styling to each square that makes up the snake 
    currentSnake.forEach(index => squares[index].classList.add('snake'))
}

function move() {

    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        return clearInterval(timerId)
    }

    // remove tail from snake and store it to remove styling
    const snakeTail = currentSnake.pop()
    squares[snakeTail].classList.remove('snake')
    // keep track of snake head and the direction of snake movement
    let snakeHead = currentSnake[0] + direction
    // unshift snake head and add styling
    currentSnake.unshift(snakeHead)

    if (squares[currentSnake[0]].classList.contains('apple')) {
        // remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        // grow snake by adding class of snake
        squares[snakeTail].classList.add('snake')
        // grow our snake array to add the new tail to snake
        currentSnake.push(snakeTail)
        // generate new apple
        generateApples()
        // add 1 to the score
        score++
        // display score
        scoreBoard.textContent = score
        // increase speed 
        clearInterval(timerId)
        intervalTime *= 0.9
        timerId = setInterval(move, intervalTime)
    }

    squares[snakeHead].classList.add('snake')
}

function controls(e) {
    if (e.key === "ArrowRight") {
        direction = 1
    } else if (e.key === "ArrowLeft") {
        direction = -1
    } else if (e.key === "ArrowUp") {
        direction = -width
    } else if (e.key === "ArrowDown") {
        direction = +width
    }
}

document.addEventListener('keyup', controls)

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length) + 1
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}


function restartGame() {
    clearInterval(timerId)
    scoreBoard.textContent = 0
    for (let square of squares) {
        square.classList.remove('snake')
        square.classList.remove('apple')
        square.remove()
    }
    squares = []
    currentSnake = [2, 1, 0]
    direction = 1
    appleIndex = 0
    score = 0
    intervalTime = 1000
    timerId = 0
}

function startGame() {
    restartGame()
    generateGrid()
    generateApples()
    timerId = setInterval(move, intervalTime)
}

startBtn.addEventListener('click', startGame)