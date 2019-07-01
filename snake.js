//You are able to wind the game only if you collect 10 food!

//Start possition of snake
var currentPosition = [50, 50];
//Start direction of snake moove - it shoud be change after Engine.InitPorporty();
var direction = 'right';

//This function fired on body load
function checkSupported() {
    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        //Start game function
        start();
    } else {
        alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
    }
}

function start() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Engine.initProperty();
    Engine.updateScore();
    //Make foodsCount food
    for (i = 0; i<foodsCount; i++){
        makeFoodItem();
    }
    Engine.drawSnake();
    play();
}

function play() {
    //interval to draw snake, change score, check end condition, ...
    interval = setInterval(Engine.moveSnake, 130);
    allowPressKeys = true;
    Engine.ContiniuClick();
}

function pause() {
    // remove interval to draw snake, change score, check end condition ...
    clearInterval(interval);
    allowPressKeys = false;
    Engine.PauseClick();
}

function restart(){
  pause();
  start();
}

function makeFoodItem() {
    suggestedPoint = [Math.floor(Math.random() * (canvas.width / foodSize)) * foodSize, Math.floor(Math.random() * (canvas.height / foodSize)) * foodSize];
    if (snakeBody.some(Engine.hasPointSnake)) {
        //call makeFoodItem function again because suggestionPoint is no suitable
        makeFoodItem();
    } else {
        if (foods.some(Engine.hasPointFood)){
		//call makeFoodItem function again because suggestionPoint is no suitable
            makeFoodItem();
        }else
        {
		//this part of code draw food on screen
            ctx.fillStyle = foodColor;
            ctx.fillRect(suggestedPoint[0], suggestedPoint[1], foodSize, foodSize);
            //add new food point to foods array
            foods.push(suggestedPoint);
        }
    };
}
