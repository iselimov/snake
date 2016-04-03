'use strict'

/**
 * Объект змеи, который содержит в себе координаты и методы их изменения
 *
 * @param posX абсцисса головы змеи 
 * @param posY ордината головы змеи
 * @param gridSize размер сетки, который определяет размер шага
 * @param length длина змеи
 * @param snakeDirectional направление движения змеи
 */
var Snake = function(posX, posY, gridSize, length, snakeDirectional) {
	posX = posX || 0;
	posY = posY || 0;
	this.gridSize = gridSize;
	this.snakeDirectional = snakeDirectional || this.SNAKE_POS.DOWN;
	this.generateByLengthAndSnakeDirectional(posX, posY, length);
};
/**
 * Перечисление направлений движения земли
 */
Snake.prototype.SNAKE_POS = {
	UP: 1, 
	DOWN: 2,
	LEFT: 3,
	RIGHT: 4
};
/**
 * Метод генерации змеи по начальным координатам, ее длине и первоначальному направлению
 *
 * @param posX абсцисса головы змеи 
 * @param posY ордината головы змеи
 * @param length длина змеи
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
		step = {x: 0, y: -this.gridSize.height};
	} else if (snakeDirectional === this.SNAKE_POS.DOWN) {
		step = {x: 0, y: this.gridSize.height};		
	} else if (snakeDirectional === this.SNAKE_POS.LEFT) {
		step = {x: -this.gridSize.width, y: 0};	
	} else {
		step = {x: this.gridSize.width, y: 0};
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
 *
 * @param posX абсцисса головы змеи 
 * @param posY ордината головы змеи
 */
Snake.prototype.setHeadPosition = function(posX, posY) {
	this.coords[0].x = posX;
	this.coords[0].y = posY;
};
/**
 * Возвращает координаты змеи
 */
Snake.prototype.getCoords = function() {
	return this.coords.slice();	
}
/**
 * 
 */
Snake.prototype.eat = function() {
	
};
/**
 * @return true при столкновении головы змеи с ее частью
 */
Snake.prototype.wasIntersected = function() {
	var firstElem = {x: this.coords[0].x, y: this.coords[0].y};
	return this.coords.some(function(coord, index, array) {
		return index && coord.x === firstElem.x && coord.y === firstElem.y
	});
};
/**
 * На каждый кадр игры обновляет координаты змеи в зависимости от ее направления движения
 *
 * @param snakeDirectional направление движения змеи
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