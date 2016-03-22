'use strict'

var FieldManager = function(screenWidth, screenHeight) {
	this.screenWidth = screenWidth;
	this.screenHeight = screenHeight;	
};
FieldManager.prototype.drawGrid = function(gridWidth, gridHeight) {
	var fieldCanvas = document.getElementById("field");
	var fieldContext = fieldCanvas.getContext("2d");
	fieldContext.canvas.width = screenSize.width;
	fieldContext.canvas.height = screenSize.height;

	for (var x = 0.5; x < this.screenWidth + 0.5; x += gridWidth) {
		fieldContext.moveTo(x, 0);
		fieldContext.lineTo(x, this.screenHeight + 0.5);
	}
	for (var y = 0.5; y < this.screenHeight + 0.5; y += gridHeight) {
		fieldContext.moveTo(0, y);
		fieldContext.lineTo(this.screenWidth + 0.5, y);
	}
	
	fieldContext.strokeStyle = "#eee";
	fieldContext.stroke();
};