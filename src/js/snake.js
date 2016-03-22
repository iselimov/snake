'use strict'

var SNAKE_POS = {
	UP: 0, 
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3
};

var Snake = function(posX, posY, gridWidth, gridHeigth, speed, length, snakeDirectional) {
	posX = posX || 0;
	posY = posY || 0;
	this.defaultSpeed = 1;
	this.speed = speed || this.defaultSpeed;
	this.snakeDirectional = snakeDirectional || SNAKE_POS.DOWN;
	this.generateByLengthAndSnakeDirectional(posX, posY, length);
};

Snake.prototype.generateByLengthAndSnakeDirectional = function(posX, posY, length) {
	this.coords = new Array(length);
	this.step = this.findStep(this.snakeDirectional);
	for (var i = 0; i < length; i ++) {
		this.coords[i] = { x: posX + i * step.x, 
						   y: posY + i * step.y
 						 };
	}
};

Snake.prototype.findStep = function(snakeDirectional) {
	var step;
	if (snakeDirectional === SNAKE_POS.UP) {
		step = {x: 0, y: this.gridHeigth};
	} else if (snakeDirectional === SNAKE_POS.DOWN) {
		step = {x: 0, y: -this.gridHeigth};		
	} else if (snakeDirectional === SNAKE_POS.LEFT) {
		step = {x: this.gridWidth, y: 0};	
	} else {
		step = {x: -this.gridWidth, y: 0};
	}
	return step;
};

Snake.prototype.getHeadPosition = function() {
	return { x: snake.posX, y: snake.posY };
};

Snake.prototype.setHeadPosition = function(posX, posY) {
	snake.posX = posX;
	snake.posY = posY;
};

Snake.prototype.changeSpeed = function(speed) {
	snake.speed = speed || snake.defaultSpeed;
};

Snake.prototype.eat = function() {
	
};

Snake.prototype.transform = function(snakeDirectional) {
	snake.step = snake.snakeDirectional === snakeDirectional ? snake.step : findStep(snakeDirectional);
	snake.coords.map(function(coord, i) {
		
		return { x: coord.x += i * snake.step.x * snake.speed, y: coord.y += i * snake.step.y * snake.speed };
	});
};