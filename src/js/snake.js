'use strict'

var SNAKE_POS = {
	UP: 0, 
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3
};

var Snake = function(posX, posY, gridWidth, gridHeigth, speed, length, snakePos) {
	posX = posX || 0;
	posY = posY || 0;
	this.defaultSpeed = 1;
	this.speed = speed || this.defaultSpeed;
	this.snakePos = snakePos || SNAKE_POS.DOWN;
	this.generateByLengthAndSnakePos(posX, posY, length);
};
Snake.prototype.generateByLengthAndSnakePos = function(posX, posY, length) {
	this.coords = new Array(length);
	this.step = this.findStep(this.snakePos);
	for (var i = 0; i < length; i ++) {
		this.coords[i] = { x: posX + i * step.x, 
						   y: posY + i * step.y
 						 };
	}
};
Snake.prototype.findStep = function(snakePos) {
	var step;
	if (snakePos === SNAKE_POS.UP) {
		step = {x: 0, y: this.gridHeigth};
	} else if (snakePos === SNAKE_POS.DOWN) {
		step = {x: 0, y: -this.gridHeigth};		
	} else if (snakePos === SNAKE_POS.LEFT) {
		step = {x: this.gridWidth, y: 0};	
	} else {
		step = {x: -this.gridWidth, y: 0};
	}
	return step;
};
Snake.prototype.moveUp = function() {
	snake.posY -= snake.speed * gridHeigth;
	this.transform();
};
Snake.prototype.moveDown = function() {
	snake.posY += snake.speed * gridHeigth;
	this.transform();
};
Snake.prototype.moveLeft = function() {
	snake.posX -= snake.speed * gridWidth;
	this.transform();
};
Snake.prototype.moveRight = function() {
	snake.posX += snake.speed * gridWidth;
	this.transform();
};
Snake.
Snake.prototype.changeSpeed = function(speed) {
	snake.speed = speed || snake.defaultSpeed;
};
Snake.prototype.eat = function() {
	
};
Snake.prototype.transform = function(snakePos) {
		
	this.step = snakePos === this.snakePos ? this.step : findStep(snakePos);
		
	this.coords.map(function(coord, i) {
		return { x: coord.x += i * this.step.x, y: coord.y += i * this.step.y };
	});
};