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
	this.refreshInterval = 2000;
	window.onkeydown = this.onKeyDown;
	
	var snakeCtx = document.getElementById("snake").getContext("2d");
	snakeCtx.canvas.width = screenWidth;
	snakeCtx.canvas.height = screenHeight;
};

SnakeManager.prototype.start = function(snakeDirectional) {
	this.intervalId = setInterval(function(snakeManager) {
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
	}
	this.snakeMng.refresh(snakeDirectional);
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
	var headPos = this.snake.getHeadPosition();
	if (headPos.x > window.screen.availWidth + 50) {
		this.snake.setHeadPosition(0, headPos.y);
	} else if (headPos.posX < -50) {
		this.snake.setHeadPosition(window.screen.availWidth, headPos.y);
	} else if (headPos.posY > window.screen.availHeight + 50) {
		this.snake.setHeadPosition(headPos.x, 0);
	} else if (headPos.posY < -50) {
		this.snake.setHeadPosition(headPos.x, window.screen.availHeight);
	}
};

SnakeManager.prototype.refresh = function(snakeDirectional) {
	//this.checkBorder();
	this.snake.transform(snakeDirectional);
	var snakeContext = document.getElementById("snake").getContext("2d");
	
	snakeContext.fillStyle = 'green';

	snakeContext.lineWidth = 7;
	snakeContext.strokeStyle = 'yellow';
	this.snake.getCoords().forEach(function(coord) {
		snakeContext.rect(coord.x, coord.y, snake.gridWidth, snake.gridHeight);
		snakeContext.fill();
		snakeContext.stroke();
	});
	
};