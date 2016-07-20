function Paddle(xPos, yPos, width, height, speed, context) {
    this.xPosition = xPos;
    this.yPosition = yPos;
    this.initalPosition = yPos;
    this.width = width;
    this.height = height;
    this.context = context;
    this.speed = speed;
}

Paddle.prototype.render = function () {
    this.context.beginPath();
    this.context.rect(this.xPosition, this.yPosition, this.width, this.height);
    this.context.fill();
};

Paddle.prototype.move = function (direction) {
    if (direction === "up") {
        this.yPosition -= this.speed;
        if (this.yPosition < 0) {
            this.yPosition = 0;
        }
    } else if (direction === "down") {
        this.yPosition += this.speed;
        if (this.yPosition >= (this.context.canvas.height - this.height)) {
            this.yPosition = this.context.canvas.height - this.height;
        }
    }
};

function Ball(initialXPos, initialYPos, radius, context) {
    this.xPosition = initialXPos;
    this.yPosition = initialYPos;
    this.initialX = initialXPos;
    this.initialY = initialYPos;
    this.radius = radius;
    this.context = context;
}

Ball.prototype.render = function () {
    this.context.beginPath();
    this.context.arc(this.xPosition, this.yPosition, this.radius, 0, 2 * Math.PI, false);
    this.context.fill();
};

function Player(context) {
    this.paddle = new Paddle(782, 237.5, 8, 75, 10, context);
    this.paddle.leadingEdge = this.paddle.xPosition;
    this.paddle.backEdge = this.paddle.xPosition + this.paddle.width;
    
    
}

Player.prototype.render = function () {
    this.paddle.render();
};


function Computer(context) {
    this.paddle = new Paddle(10, 237.5, 8, 75, 7.5, context);
    this.paddle.leadingEdge = this.paddle.xPosition + this.paddle.width;
    this.paddle.backEdge = this.paddle.xPosition;
   
}

Computer.prototype.render = function () {
    this.paddle.render();
};

var animate = window.requestAnimationFrame  ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame     ||
        window.oRequestAnimationFrame       ||
        window.msRequestAnimationFrame      ||
        function(callback) { window.setTimeout(callback, 1000/60) };



var canvas = document.getElementById("pongTable");
var context = canvas.getContext('2d');
var player = new Player(context);
var computer = new Computer(context);
var ball = new Ball(400, 275, 10, context);
var window =  new window();


function render() {
    player.render();
    computer.render();
    ball.render();
}

function step() {
    render();
    animate(step);
};


window.onload = function () {
    window.addEventListener('keyup', function (event) {
        playerInput[event.keyCode] = false;
    });
    window.addEventListener('keydown', function (event) {
        if (event.keyCode === 38 && playerInput[40]) {
            playerInput[40] = false;
        } else if (event.keyCode === 40 && playerInput[38]) {
            playerInput[38] = false;
        }
        playerInput[event.keyCode] = true;
    }
    
     animate(step);
};