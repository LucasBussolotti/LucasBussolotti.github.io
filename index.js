let btn = document.querySelector("#start");

btn.addEventListener("click", () => alert("El juego ha comenzado")
);



///////////////////////////////////////COMPONENTES HTML///////////////////////////////////////

const $ = (elemento) => document.getElementById(elemento);

const board = $("board");
const scoreInfo = $("scoreInfo");
const startButton = $("start");
const gameOverSign = $("gameOver");
const player =$("player");

//////////////////////////////////////////GAME//////////////////////////////////////////////////////
const boardSize = 10;
const gameSpeed = 300;
const squareTypes = {
    emptySquare : 0,
    snakeSquare : 1,
    foodSquare : 2,
};

const directions = {
    ArrowUp : -10,
    ArrowDown: 10,
    ArrowLeft: -1,
    ArrowRight: 1,
};


/////////////////////////////////////////////GAME VARIABLES///////////////////////////////////////////

let snake;
let score;
let boardSquares;
let emptySquares;
let direction;
let moveInterval;


//////////////////////////////////////////////FUNCIONALIDAD////////////////////////////////////////////


const createBoard = () =>{
    boardSquares.forEach ( (row, rowIndex) => {
        row.forEach ( (column, columnnndex) =>{
            const squareValue = `${rowIndex}${columnnndex}`;
            const squareElement = document.createElement ("div");
            squareElement.setAttribute("class", "square emptySquare");
            squareElement.setAttribute("id", squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);

    }

    )}

    )}

let drawSquare = (square,type) =>{
    const [row , column] = square.split("");
    boardSquares[row][column] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute("class", `square ${type}`);
    
        if (type === "emptySquare"){
            emptySquares.push(square);
        } else {
            if (emptySquares.indexOf(square) !== -1) {
                emptySquares.splice(emptySquares.indexOf(square), 1); 
            }
        }
    }



let drawSnake = () =>{
    snake.forEach( square => drawSquare(square, "snakeSquare"));
}

const createRandomFood = () =>{
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    drawSquare(randomEmptySquare, "foodSquare");
}


const updateScore = () =>{
    scoreInfo.innerText = score;
}


const addFood = () =>{
    score++;
    updateScore();
    createRandomFood();
    
}

const setDirection = newDirection =>{
    direction = newDirection;
 }


 const snakeMove = () =>{
    const newSquare = String(
        Number(snake[snake.length - 1]) + directions [direction])
        .padStart(2, '0');
        const [row, column] = newSquare.split("");

    if(newSquare < 0 ||
        newSquare > boardSize * boardSize ||
        (direction === "ArrowRight" && column == 0) ||
        (direction === "ArrowLeft" && column == 9 ||
        boardSquares[row][column] === squareTypes.snakeSquare) ){
            gameOver();
        }else{
            snake.push(newSquare);
            if (boardSquares[row][column] === squareTypes.foodSquare){ 
            addFood();
        } else {
            const emptySquare = snake.shift();
            drawSquare(emptySquare, "emptySquare")
        }
        drawSnake();
}
}


let keyDirection = key => {
    switch(key.code){
    
        case "ArrowUp":
            direction != "ArrowDown" && setDirection(key.code);
            console.log(keyDirection);

        case "ArrowDown":
            direction != "ArrowUp" && setDirection(key.code);
            console.log(keyDirection);
        break;

        case "ArrowRight":
            direction != "ArrowLeft" && setDirection(key.code);
        break;

        case "ArrowLeft":
            direction != "ArrowRight" && setDirection(key.code);
        break;
 }
} 

const gameOver = () =>{
    gameOverSign.style.display = "block";
    clearInterval(moveInterval);
    startButton.disabled = false;
}


const gameSet = () => {
    snake = ["00", "01", "02", "03"];
    score = snake.length -4;
    direction = "ArrowRight";
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));
    console.log(boardSquares);
    board.innerHTML = "";
    emptySquares = [];
    createBoard();
    


}


const starGame = () => {
    gameSet();
    drawSnake();
    startButton.disabled = true;
    gameOverSign.style.display = "none";
    document.addEventListener("keydown", keyDirection);
    updateScore();
    createRandomFood();
    moveInterval = setInterval( () => snakeMove(), gameSpeed);
    
} 

startButton.addEventListener("click", starGame);



