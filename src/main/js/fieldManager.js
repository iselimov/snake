'use strict'

/**
 * Объект, отвечаеющий за отрисовку игрового поля игры
 *
 * @param screenSize размеры игрового экрана
 */
var FieldManager = function(screenSize) {
	this.screenWidth = screenSize.width;
	this.screenHeight = screenSize.height;
};
/**
 * Отвечает за отрисовку сетки по размерам игрового экрана и сетки
 *
 * @param gridSize размеры сетки
 */
FieldManager.prototype.drawGrid = function(gridSize) {
	var fieldContext = document.getElementById("field").getContext("2d");;
	fieldContext.canvas.width = this.screenWidth;
	fieldContext.canvas.height = this.screenHeight;

	for (var x = 0; x <= this.screenWidth; x += gridSize.width) {
		fieldContext.moveTo(x, 0);
		fieldContext.lineTo(x, this.screenHeight + gridSize.height);
	}
	for (var y = 0; y <= this.screenHeight; y += gridSize.height) {
		fieldContext.moveTo(0, y);
		fieldContext.lineTo(this.screenWidth + gridSize.width, y);
	}
	
	fieldContext.strokeStyle = "red";
	fieldContext.stroke();
};