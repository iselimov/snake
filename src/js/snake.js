'use strict'

/**
 * Объект змеи, который содержит в себе координаты и методы их изменения
 */
var Snake = function(posX, posY, gridSize, length, snakeDirectional) {
	posX = posX || 0;
	posY = posY || 0;
	this.gridWidth = gridSize.width;
	this.gridHeight = gridSize.height;
	this.snakeDirectional = snakeDirectional || this.SNAKE_POS.DOWN;
	this.generateByLengthAndSnakeDirectional(posX, posY, length);
};
/**
 * Перечисление направлений джвижения земли
 */
Snake.prototype.SNAKE_POS = {
	UP: 1, 
	DOWN: 2,
	LEFT: 3,
	RIGHT: 4
};
/**
 * Метод генерации змеи по начальным координатам, ее длине и первоначальному направлению
 */
Snake.prototype.generateByLengthAndSnakeDirectional = function(posX, posY, length) {
	this.coords = new Array(length);
	this.step = this.findStep(this.snakeDirectional);
	for (var i = 0; i < length; i ++) {
		this.coords[i] = { x: posX - i * this.step.x, 
						   y: posY - i * this.step.y
 						 };
	}
};
/**
 * @return длину шага змеи в зависимости от направления и размеров сетки 
 */
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
/**
 * @return позицию головы змеи
 */
Snake.prototype.getHeadPosition = function() {
	return { x: this.coords[0].x, y: this.coords[0].y };
};
/**
 * Устанавливает позицию головы змеи
 */
Snake.prototype.setHeadPosition = function(posX, posY) {
	this.coords[0].x = posX;
	this.coords[0].y = posY;
};
/**
 * Возвращает координаты змеи
 */
Snake.prototype.getCoords = function() {
	return this.coords;	
}
/**
 * 
 */
Snake.prototype.eat = function() {
	
};
/**
 * 
 */
Snake.prototype.wasIntersected = function() {
	
};
/**
 * На каждый кадр игры обновляет координаты змеи в зависимости от ее направления движения
 */
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