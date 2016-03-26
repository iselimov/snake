'use strict'

var FieldManager = function(screenWidth, screenHeight) {
	this.screenWidth = screenWidth;
	this.screenHeight = screenHeight;	
};
FieldManager.prototype.drawGrid = function(gridWidth, gridHeight) {
	var fieldContext = document.getElementById("field").getContext("2d");;
	fieldContext.canvas.width = this.screenWidth;
	fieldContext.canvas.height = this.screenHeight;

	for (var x = 0; x <= this.screenWidth; x += gridWidth) {
		fieldContext.moveTo(x, 0);
		fieldContext.lineTo(x, this.screenHeight + gridHeight);
	}
	for (var y = 0; y <= this.screenHeight; y += gridHeight) {
		fieldContext.moveTo(0, y);
		fieldContext.lineTo(this.screenWidth + gridWidth, y);
	}
	
	fieldContext.strokeStyle = "blue";
	fieldContext.stroke();
};