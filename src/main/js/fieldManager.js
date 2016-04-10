'use strict'

/**
 * Объект, отвечаеющий за отрисовку игрового поля игры
 *
 * @param screenSize размеры игрового экрана
 */
var FieldManager = function(gameScreenSize, gridSize) {
	this.screenSize = gameScreenSize;
	this.gridSize = gridSize;
	this.scoreCounterRect = {x: this.screenSize.width + 100, y: this.screenSize.height / 2, width: 300, height: 100};
	
	this.fieldContext = document.getElementById("field").getContext("2d");
	this.fieldContext.canvas.width = this.scoreCounterRect.x + this.scoreCounterRect.width;
	this.fieldContext.canvas.height = this.screenSize.height;
};
/**
 * Отвечает за отрисовку сетки по размерам игрового экрана и сетки
 *
 * @param gridSize размеры сетки
 */
FieldManager.prototype.drawGrid = function() {
	for (var x = 0; x <= this.screenSize.width; x += this.gridSize.width) {
		this.fieldContext.moveTo(x, 0);
		this.fieldContext.lineTo(x, this.screenSize.height);
	}
	for (var y = 0; y <= this.screenSize.height; y += this.gridSize.height) {
		this.fieldContext.moveTo(0, y);
		this.fieldContext.lineTo(this.screenSize.width, y);
	}
	
	this.fieldContext.strokeStyle = "red";
	this.fieldContext.stroke();
};
/**
 * Отвечает за отрисовку сообщения о количестве очков
 *
 * @param scoreCounter количество очков
 */
FieldManager.prototype.drawScore = function(scoreCounter) {
	this.fieldContext.clearRect(0, 0, this.fieldContext.canvas.width, this.fieldContext.canvas.height);
	var drawText = "Your score: " + scoreCounter;
	this.drawGrid(this.gridSize.width, this.gridSize.height);	
	this.fieldContext.strokeStyle = "black";
	this.fieldContext.font = "40px Arial";
	this.fieldContext.strokeText(drawText, this.scoreCounterRect.x, this.scoreCounterRect.y);
};