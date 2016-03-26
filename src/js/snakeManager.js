'use strict'

var KEY_CODE = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

var SnakeManager = function(snake, screenWidth, screenHeight) {
	this.snake = snake;
	this.refresh(snake.snakeDirectional);
	this.refreshInterval = 500;
	window.onkeydown = this.onKeyDown;
	
	var snakeCtx = document.getElementById("snake").getContext("2d");
	snakeCtx.canvas.width = screenWidth;
	snakeCtx.canvas.height = screenHeight;
	this.screenWidth = screenWidth;
	this.screenHeight = screenHeight;
};

SnakeManager.prototype.start = function(snakeDirectional) {
	this.intervalId = setInterval(function() {
	   this.snakeMng.refresh(this.snake.snakeDirectional);
	}, this.refreshInterval);
};

SnakeManager.prototype.restart = function(snakeDirectional) {
	if (this.intervalId) {
		clearInterval(this.intervalId);
	}
	this.start(snakeDirectional);		
};
		
SnakeManager.prototype.stop = function() {
	clearInterval(snakeManager.intervalId);
};

SnakeManager.prototype.onKeyDown = function(event) {
	var snakeDirectional;
	if (!this.snakeMng.keyPressedCode) {
		this.snakeMng.keyPressedCode = KEY_CODE.DOWN;
	}
	if (this.snakeMng.keyPressedCode === event.keyCode) {
		return;
	}
	var isOpposeKeyPressed = this.snakeMng.isOpposeKeyPressed(event.keyCode);
	if (!isOpposeKeyPressed) {
		if (event.keyCode === KEY_CODE.LEFT) {
			snakeDirectional = this.snake.SNAKE_POS.LEFT;
		} else if (event.keyCode === KEY_CODE.RIGHT) {
			snakeDirectional = this.snake.SNAKE_POS.RIGHT;
		} else if (event.keyCode === KEY_CODE.UP) {
			snakeDirectional = this.snake.SNAKE_POS.UP;
		} else if (event.keyCode === KEY_CODE.DOWN) {
			snakeDirectional = this.snake.SNAKE_POS.DOWN;
		} else {
			return;
		}
		this.snakeMng.keyPressedCode = event.keyCode;
		//this.snakeManager.restart(snakeDirectional);
		this.snakeMng.refresh(snakeDirectional);
	}
	
};

SnakeManager.prototype.isOpposeKeyPressed = function(currentCode) {
	if (currentCode === KEY_CODE.LEFT && this.keyPressedCode === KEY_CODE.RIGHT) {
		return true;
	} else if (currentCode === KEY_CODE.RIGHT && this.keyPressedCode === KEY_CODE.LEFT) {
		return true;
	} else if (currentCode === KEY_CODE.UP && this.keyPressedCode === KEY_CODE.DOWN) {
		return true;
	} else if (currentCode === KEY_CODE.DOWN && this.keyPressedCode === KEY_CODE.UP) {
		return true;
	}
	return false;
};

SnakeManager.prototype.checkBorder = function() {
	var headPos = this.snake.getHeadPosition();
	if (headPos.x >= this.screenWidth) {
		this.snake.setHeadPosition(0, headPos.y);
	} else if (headPos.x < 0) {
		this.snake.setHeadPosition(this.screenWidth - this.snake.gridWidth, headPos.y);
	} else if (headPos.y >= this.screenHeight) {
		this.snake.setHeadPosition(headPos.x, 0);
	} else if (headPos.y < 0) {
		this.snake.setHeadPosition(headPos.x, this.screenHeight - this.snake.gridHeight);
	}
};

SnakeManager.prototype.refresh = function(snakeDirectional) {
	this.snake.transform(snakeDirectional);
		this.checkBorder();
	this.redrawSnake();
};

SnakeManager.prototype.redrawSnake = function() {
	var snakeContext = document.getElementById("snake").getContext("2d");
	snakeContext.clearRect(0, 0, this.screenWidth, this.screenHeight);
	snakeContext.beginPath();
	
	snakeContext.fillStyle = 'blue';
	snakeContext.lineWidth = 7;
	snakeContext.strokeStyle = 'red';
		
	this.snake.getCoords().forEach(function(coord) {
		snakeContext.rect(coord.x, coord.y, snake.gridWidth, snake.gridHeight);
		snakeContext.fill();
		snakeContext.stroke();
	});
};