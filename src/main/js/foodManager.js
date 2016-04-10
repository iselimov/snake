'use strict'

/**
 * Объект, отвечающий за управление генерацией еды на игровом поле
 * 
 * @param screenSize размеры экрана
 * @param gridSize размеры сетки
 */
var FoodManager = function(screenSize, gridSize) {
	this.screenSize = screenSize;
	this.gridSize = gridSize;
	this.maxCoords = {x: this.screenSize.width - this.gridSize.width, y: this.screenSize.height - this.gridSize.height };
	this.minCoords = {x: 0, y: 0};
	this.foodCount = 1;
	this.food = [];
	this.foodRefreshed = new Publisher();
	this.foodContext = document.getElementById("food").getContext("2d");
	this.foodContext.canvas.width = this.screenSize.width;
	this.foodContext.canvas.height = this.screenSize.height;

};
/**
 * Генерирует новый объект еды
 * 
 * @param data информация о координатах змеи и координатах объекта еды, который требуется уничтожить, 
 *             приходящая от издателя события
 */
FoodManager.prototype.generateFood = function(data) {
	if (data.foodCoord && game.foodMng.food.length) {
		game.foodMng.food = game.foodMng.food.filter(function(elem) {
			return elem.coord.x !== data.foodCoord.x && elem.coord.y !== data.foodCoord.y;
		});
	}
	if (!game.foodMng.food.length) {
		game.foodMng.doGenerateFood(data.snakeCoords);
	}
	game.foodMng.redrawFood();
	game.foodMng.foodRefreshed.deliver(game.foodMng.food);
	
};
/**
 * Отвечает за генерацию новых координатах объекта еды 
 * в зависимости от размера сетки и координат змейки
 * 
 * @param snakeCoords координаты змейки
 */
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
		game.foodMng.food.push({coord: randomCoord, growth: 1});
	}
};

FoodManager.prototype.doGenerateRandomFoodCoords = function() {
	var randomCoord = { x: Math.floor(Math.random() * (this.maxCoords.x - this.minCoords.x + this.gridSize.width)) + this.minCoords.x,
						y: Math.floor(Math.random() * (this.maxCoords.y - this.minCoords.y + this.gridSize.height)) + this.minCoords.y };
	randomCoord.x -= randomCoord.x % this.gridSize.width;
	randomCoord.y -= randomCoord.y % this.gridSize.height;
	return randomCoord;
};
/**
 * Изменяет количество объектов еды на поле
 * 
 * @param foodCount требуемое количество объектов еды 
 */
FoodManager.prototype.changeFoodCount = function(foodCount) {
	this.foodCount = foodCount || 1;	
};
/**
 * Выполняет отрисовку объектов еды по координатам
 */
FoodManager.prototype.redrawFood = function() {
	game.foodMng.foodContext.clearRect(0, 0, this.screenSize.width, this.screenSize.height);
	game.foodMng.foodContext.beginPath();
	
	game.foodMng.foodContext.fillStyle = 'black';
	game.foodMng.foodContext.lineWidth = 7;
	game.foodMng.foodContext.strokeStyle = 'yellow';
		
	var that = this;
	this.food.forEach(function(elem) {
		game.foodMng.foodContext.rect(elem.coord.x, elem.coord.y, that.gridSize.width, that.gridSize.height);
		game.foodMng.foodContext.fill();
		game.foodMng.foodContext.stroke();
	});
};
/**
 * Очищаем издателя события
 */ 
FoodManager.prototype.flush = function() {
	if (this.foodRefreshed) {
		this.foodRefreshed = null;
	}
};