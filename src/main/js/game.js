'use strict'

/**
 * Точка входа в игру
 */
var Game = function() {
	// размеры сетки
	this.gridSize = { width: 50, height: 50 };
	// размеры игрового экрана
	this.screenSize = { width: 800, height: 600 };
};
Game.prototype.start = function() {
	this.foodCounter = 0;
	// отрисовываем сетку
	this.fieldMng = new FieldManager(this.screenSize, this.gridSize);
	this.fieldMng.drawGrid();
	// генерим змейку
	var snake = new Snake(this.screenSize.width / 2, this.screenSize.height / 2, this.gridSize, 5, 1);
	this.snakeMng = new SnakeManager(snake, this.screenSize, 5);
	this.foodMng = new FoodManager(this.screenSize, this.gridSize);
	// добавляем подписчиков на события
	FoodManager.prototype.generateFood.addListener(this.snakeMng.onEat);
	Game.prototype.gameEnd.addListener(this.snakeMng.onDie)
	Game.prototype.refreshFood.addListener(this.foodMng.foodRefreshed);
	// генерим еду
	this.foodMng.generateFood({snakeCoords: snake.getCoords()});
	// запускаем движение
	this.snakeMng.start();
};
Game.prototype.restart = function() {
	this.foodCounter = 0;
	this.snakeMng.start();
	
};

/**
 * Обработчик события, которое возникает по генерации еды на поле
 */
Game.prototype.refreshFood = function(foodCoords) {
	game.fieldMng.drawScore(game.foodCounter++);
	game.snakeMng.refreshFoodCoords(foodCoords);
};
/**
 * Обработчик события, которое возникает по столкновению змейки
 */
Game.prototype.gameEnd = function() {
	if (confirm("Game Over? Want to restart?")) {
		game.restart();
	} else {
		game.snakeMng.flush();
		game.foodMng.flush();
	}
};