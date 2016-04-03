'use strict'

var FoodManager = function(screenSize, gridSize) {
	this.screenSize = screenSize;
	this.gridSize = gridSize;
	this.maxCoords = {x: this.screenSize.width - this.gridSize.width, y: this.screenSize.height - this.gridSize.height };
	this.minCoords = {x: 0, y: 0};
	this.foodCount = 1;
	this.foodCoords = [];
	this.foodRefreshed = new Publisher();
};

FoodManager.prototype.generateFood = function(data) {
	if (data.foodCoord && game.foodMng.foodCoords.length) {
		game.foodMng.foodCoords = game.foodMng.foodCoords.filter(function(elem) {
			return elem.x !== data.foodCoord.x && elem.y !== data.foodCoord.y;
		});
	}
	if (!game.foodMng.foodCoords.length) {
		game.foodMng.doGenerateFood(data.snakeCoords);
	}
	game.foodMng.redrawFood();
	game.foodMng.foodRefreshed.deliver(game.foodMng.foodCoords);
	
};

FoodManager.prototype.doGenerateFood = function(snakeCoords) {
	for (var i = 0; i < game.foodMng.foodCount; i ++) {
		var hasIntersectionSnakeWithFood = true;
		var randomCoord;
		while (hasIntersectionSnakeWithFood) {
			randomCoord = this.doGenerateRandomFoodCoords();
			hasIntersectionSnakeWithFood = snakeCoords.some(function(snakeCoord) {
				return randomCoord.x === snakeCoord.x && randomCoord.y === snakeCoord.y;
			});
		}
		game.foodMng.foodCoords.push(randomCoord);
	}
};

FoodManager.prototype.doGenerateRandomFoodCoords = function() {
	var randomCoord = { x: Math.floor(Math.random() * (this.maxCoords.x - this.minCoords.x + this.gridSize.width)) + this.minCoords.x,
						y: Math.floor(Math.random() * (this.maxCoords.y - this.minCoords.y + this.gridSize.height)) + this.minCoords.y };
	randomCoord.x -= randomCoord.x % this.gridSize.width;
	randomCoord.y -= randomCoord.y % this.gridSize.height;
	return randomCoord;
};

FoodManager.prototype.changeFoodCount = function(foodCount) {
	this.foodCount = foodCount || 1;	
};

FoodManager.prototype.redrawFood = function() {
	var foodContext = document.getElementById("food").getContext("2d");
	foodContext.clearRect(0, 0, this.screenSize.width, this.screenSize.height);
	foodContext.beginPath();
	// раскраска змеи
	foodContext.fillStyle = 'black';
	foodContext.lineWidth = 7;
	foodContext.strokeStyle = 'yellow';
		
	var that = this;
	this.foodCoords.forEach(function(coord) {
		foodContext.rect(coord.x, coord.y, that.gridSize.width, that.gridSize.height);
		foodContext.fill();
		foodContext.stroke();
	});
};

