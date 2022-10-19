const grid = document.querySelector('.grid')
const spanScore = document.querySelector('.score')
const gameOver = document.querySelector('.gameOver')
let restartBtn = document.querySelector('.restartButton')
let score = 0
let squares = []
const width = 10
let snake

let speed
let varMove
let apple
let intervalMove

//make the playfield
makeGrid = () => {
    for(let i = 0; i < width*width; i++){
        //create an div element
        let square = document.createElement('div')
        //add a class squares to the div
        square.classList.add('squares')
        //add the div to grid
        grid.appendChild(square)
        //add the div to an array
        squares.push(square);
    }
}

//initialize grid
makeGrid()

// make snake, length 3 squares
showSnake = () => {
    //color snake in square
    snake.forEach(value => squares[value].classList.add('snake'))
}

//make snake controllable
controllSnake = (event) => {
    // console.log('in controllSnake: ' + event.key)
    if(event.key == 'ArrowUp'){
        varMove = -10
    }
    else if (event.key == 'ArrowRight'){
        varMove = 1
    }
    else if (event.key == 'ArrowDown'){
        varMove = +10
    }
    else if (event.key == 'ArrowLeft'){
        varMove = -1;
    }
}

//recognize Borders and bite in the own tail
recognizeBorders = () => {
    let snakeHead = snake[snake.length - 1]
    //if
    //-> hit border top and direction to top
    //-> hit border right and direction to the right
    //-> hit border bottom and direction to the bottom
    //-> hit border left and direction to the left
    //then stop
    if(varMove == -10 && snakeHead - 10 < 0 ||
        varMove == 1 && snakeHead % 10 == 9 ||
        varMove == 10 && snakeHead + 10 >= 100 ||
        varMove == -1 && snakeHead % 10 == 0){
        return true
    }
}

//make an apple
makeAnApple = () => {
    //a number between 0 an 99
    apple = Math.floor(Math.random() * width * width)
     //is snake allready there?
    while(squares[apple].classList.contains('snake')){
        apple = Math.floor(Math.random() * width * width)
    }
    //ad apple class to square
    squares[apple].classList.add('apple')
}

// recognize snake by apple
checkIfSnakeByAppleAndHandle = () => {
    //check
    if(squares[snake[snake.length - 1]].classList.contains('apple')){
        //increase score
        score++
        //show score
        changeScore(score)
        //-> let apple disappear
        squares[apple].classList.remove('apple')
        //-> make snake longe
        snake.splice(0,0,snake[0])
        //make a new apple
        makeAnApple()
        //increase speed
        clearInterval(intervalMove);
        intervalMove = setInterval(move, speed = speed*0.9)
    }
}

//change score
changeScore = count => {
    spanScore.textContent = score
}

//let snake move
move = () => {
    console.log('in move')
    //calculate new position front
    const newPositionFront = snake[snake.length-1]+varMove;

    //error handling 
    //-> new position out of range
    //-> hit border
    //-> hit tail
    if(newPositionFront < 0 || 
        newPositionFront > 99 || 
        recognizeBorders() || 
        squares[newPositionFront].classList.contains('snake')){
        gameOver.textContent = 'Game over'
        clearInterval(intervalMove)
        return
    }

    //put one on the front + add class snake 
    squares[newPositionFront].classList.add('snake')
    //snake array change head
    snake.push(newPositionFront)
    //get one in the back + remove class snake
    squares[snake[0]].classList.remove('snake')
    ////snake array change tail
    snake.shift();
    // console.log('Snake 2 '+snake)
    checkIfSnakeByAppleAndHandle()
}

//start game
startGame = () => {
    snake = [0,1,2]
    varMove = 1
    speed = 700
    score = 0
    changeScore(0)
    makeAnApple()
    showSnake()
    intervalMove = setInterval(move, speed)
}

restartGame = event => {
    gameOver.textContent = ''
    //stop moving
    clearInterval(intervalMove)
    //delete snake and aplle from square
    console.log('in restart Game: ' + snake)
    snake.forEach(value => {squares[value].classList.remove('snake')})
    squares[apple].classList.remove('apple')
    startGame()
}

document.addEventListener('keydown', controllSnake)
restartBtn.addEventListener('click', restartGame)
startGame()
