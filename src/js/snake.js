'use strict'

var Snake = function(posX, posY, gridWidth, gridHeight, speed, length, snakeDirectional) {
	posX = posX || 0;
	posY = posY || 0;
	this.gridWidth = gridWidth;
	this.gridHeight = gridHeight;
	this.defaultSpeed = 1;
	this.speed = speed || this.defaultSpeed;
	this.snakeDirectional = snakeDirectional || this.SNAKE_POS.DOWN;
	this.generateByLengthAndSnakeDirectional(posX, posY, length);
};

Snake.prototype.SNAKE_POS = {
	UP: 0, 
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3
};

Snake.prototype.generateByLengthAndSnakeDirectional = function(posX, posY, length) {
	this.coords = new Array(length);
	this.step = this.findStep(this.snakeDirectional);
	for (var i = 0; i < length; i ++) {
		this.coords[i] = { x: posX - i * this.step.x, 
						   y: posY - i * this.step.y
 						 };
	}
};

Snake.prototype.findStep = function(snakeDirectional) {
	var step;
	if (snakeDirectional === this.SNAKE_POS.UP) {
		step = {x: 0, y: -this.gridHeight};
	} else if (snakeDirectional === this.SNAKE_POS.DOWN) {
		step = {x: 0, y: this.gridHeight};		
	} else if (snakeDirectional === this.SNAKE_POS.LEFT) {
		step = {x: -this.gridWidth, y: 0};	
	} else {
		step = {x: this.gridWidth, y: 0};
	}
	return step;
};

Snake.prototype.getHeadPosition = function() {
	return { x: this.coords[0].x, y: this.coords[0].y };
};

Snake.prototype.setHeadPosition = function(posX, posY) {
	this.coords[0].x = posX;
	this.coords[0].y = posY;
};

Snake.prototype.getCoords = function() {
	return this.coords;	
}

Snake.prototype.changeSpeed = function(speed) {
	this.speed = speed || this.defaultSpeed;
};
	
Snake.prototype.eat = function() {
	
};

Snake.prototype.transform = function(snakeDirectional) {
	this.step = this.snakeDirectional === snakeDirectional ? this.step : this.findStep(snakeDirectional);
	this.snakeDirectional = snakeDirectional;
	for (var i = this.coords.length - 1; i >= 1; i--) {
		this.coords[i].x = this.coords[i - 1].x;		
		this.coords[i].y = this.coords[i - 1].y;		
	}
	this.coords[0].x += this.step.x;
	this.coords[0].y += this.step.y;
};