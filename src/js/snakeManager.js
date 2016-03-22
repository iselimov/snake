'use strict'

var KEY_CODE = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

var SnakeManager = function(snake) {
	this.snake = snake;
	this.refresh();
	this.refreshInterval = 1;
	window.onkeydown = this.onKeyDown;
};
SnakeManager.prototype.start = function(move) {
	this.intervalId = setInterval(function() {
		if (move) {
			move(this.snake);
		} else {
			this.keyPressedCode = KEY_CODE.DOWN;
			this.snake.moveDown();	
		}
		this.snakeManager.refresh();
	}, this.refreshInterval);
};
SnakeManager.prototype.restart = function(move) {
	if (this.intervalId) {
		clearInterval(this.intervalId);
	}
	this.start(move);		
};		
SnakeManager.prototype.stop = function() {
	clearInterval(snakeManager.intervalId);
};
SnakeManager.prototype.onKeyDown = function(event) {
	var move;
	var isOpposeKeyPressed = this.snakeManager.isOpposeKeyPressed(event.keyCode);
	if (!isOpposeKeyPressed) {
		if (event.keyCode === KEY_CODE.LEFT) {
			move = this.snake.moveLeft;
		} else if (event.keyCode === KEY_CODE.RIGHT) {
			move = this.snake.moveRight;
		} else if (event.keyCode === KEY_CODE.UP) {
			move = this.snake.moveUp;
		} else if (event.keyCode === KEY_CODE.DOWN) {
			move = this.snake.moveDown;
		} else {
			return;
		}
		this.snakeManager.keyPressedCode = event.keyCode;
		this.snakeManager.restart(move);
	}
	this.snakeManager.refresh();
};
SnakeManager.prototype.isOpposeKeyPressed = function(currentCode) {
	if (currentCode === KEY_CODE.LEFT && this.keyPressedCode === KEY_CODE.RIGHT) {
		return true;
	} else if (currentCode === KEY_CODE.RIGHT && this.keyPressedCode === KEY_CODE.LEFT) {
		return true;
	} else if (currentCode=== KEY_CODE.UP && this.keyPressedCode === KEY_CODE.DOWN) {
		return true;
	} else if (currentCode === KEY_CODE.DOWN && this.keyPressedCode === KEY_CODE.UP) {
		return true;
	}
	return false;
};		
SnakeManager.prototype.checkBorder = function() {
	if (this.snake.coords[0].x > window.screen.availWidth + 50) {
		this.snake.posX = 0;
	} else if (this.snake.posX < -50) {
		this.snake.posX = window.screen.availWidth;
	} else if (this.snake.posY > window.screen.availHeight + 50) {
		this.snake.posY = 0;
	} else if (this.snake.posY < -50) {
		this.snake.posY = window.screen.availHeight;		
	}
};
SnakeManager.prototype.refresh = function() {
	this.checkBorder();
	this.snake.transform()
	
	var snake = document.getElementById("snake");
	var snakeContext = snake.getContext("2d");
		
	snakeContext.beginPath();
	snakeContext.rect(this.snake.posX, 50, 50);
	snakeContext.fillStyle = 'yellow';
	snakeContext.fill();
	snakeContext.lineWidth = 7;
	snakeContext.strokeStyle = 'black';
	snakeContext.stroke();
};