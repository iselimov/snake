'use strict'

/**
 * Контроллер змеи, отвечает за цикл движение змеи, обрабатывает события, приходящие от клиента
 *
 * @param snake объект змеи
 * @param screenSize размеры игрового экрана
 * @param snakeSpeed скорость движения змеи
 */
var SnakeManager = function(snake, screenSize, snakeSpeed) {
	this.snake = snake;
	this.refreshInterval = this.countSpeed(snakeSpeed);
	this.screenWidth = screenSize.width;
	this.screenHeight = screenSize.height;
	this.currSnakeDirectional = snake.snakeDirectional;
	// используется для запоминания клавиш, нажатых пользователем
	// например, за 1 секунду можно нажать 4 клавиши и все должны быть обработаны
	this.nextDirectionals = [];
	var snakeCtx = document.getElementById("snake").getContext("2d");
	snakeCtx.canvas.width = this.screenWidth;
	snakeCtx.canvas.height = this.screenHeight;
	window.onkeydown = this.onKeyDown;
	this.onEat = new Publisher();
	this.onDie = new Publisher();
	this.food = [];
};
/**
 * Перечисление кодов, которые ассоциируются с нажатиями клавиш
 */
SnakeManager.prototype.KEY_CODE = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};
/**
 * Запускает таймер, отвечающий за движение змеи, проверяя, не запущен ли еще один
 */
SnakeManager.prototype.start = function() {
	if (this.intervalId) {
		return;
	}
	this.intervalId = setInterval(function() {
	   var currSnakeDir = this.game.snakeMng.nextDirectionals.length ? this.game.snakeMng.nextDirectionals.shift() : this.game.snakeMng.currSnakeDirectional;
	   this.game.snakeMng.refresh(currSnakeDir);
	}, this.refreshInterval);
};
/**
 * @param speed параметрическое значение скорости
 *
 * @return скорость относительно единицы времени(с.)
 */
SnakeManager.prototype.countSpeed = function(speed) {
	return 1000 / ( speed || 1 );	
};
/**
 * Позволяет изменить скорость движения змеи, создав новый таймер
 *
 * @param speed параметрическое значение скорости
 */
SnakeManager.prototype.changeSpeed = function(speed) {
	clearInterval(this.intervalId);
	this.intervalId = null;
    this.refreshInterval = this.countSpeed(speed);
	this.start();
};
/**
 * Останавливает таймер, отвечающий за движение змеи
 */	
SnakeManager.prototype.stop = function() {
	clearInterval(this.intervalId);
	this.intervalId = null;
};
/**
 * Обработчик нажатия клавиш, позволяющий изменять направление движения змеи
 *
 * @param event событие нажатия клавиши
 */
SnakeManager.prototype.onKeyDown = function(event) {
	var snakeDirectional;
	if (!this.game.snakeMng.keyPressedCode) {
		this.game.snakeMng.keyPressedCode = this.game.snakeMng.KEY_CODE.DOWN;
	}
	if (this.game.snakeMng.keyPressedCode === event.keyCode) {
		return;		
	}
	var isOpposeKeyPressed = this.game.snakeMng.isOpposeKeyPressed(event.keyCode);
	if (!isOpposeKeyPressed) {
		if (event.keyCode === this.game.snakeMng.KEY_CODE.LEFT) {
			snakeDirectional = this.game.snakeMng.snake.SNAKE_POS.LEFT;
		} else if (event.keyCode === this.game.snakeMng.KEY_CODE.RIGHT) {
			snakeDirectional = this.game.snakeMng.snake.SNAKE_POS.RIGHT;
		} else if (event.keyCode === this.game.snakeMng.KEY_CODE.UP) {
			snakeDirectional = this.game.snakeMng.snake.SNAKE_POS.UP;
		} else if (event.keyCode === this.game.snakeMng.KEY_CODE.DOWN) {
			snakeDirectional = this.game.snakeMng.snake.SNAKE_POS.DOWN;
		} else {
			return;
		}
		this.game.snakeMng.keyPressedCode = event.keyCode;
		this.game.snakeMng.nextDirectionals.push(snakeDirectional);
		this.game.snakeMng.currSnakeDirectional = snakeDirectional;
	}
};
/**
 * @param currentCode код нажатой клавиши
 * 
 * @return true, если была нажата клавиша, которая отвечает за направление, противоположное текущему
 */
SnakeManager.prototype.isOpposeKeyPressed = function(currentCode) {
	return currentCode === this.KEY_CODE.LEFT && this.keyPressedCode === this.KEY_CODE.RIGHT 
		|| currentCode === this.KEY_CODE.RIGHT && this.keyPressedCode === this.KEY_CODE.LEFT
		|| currentCode === this.KEY_CODE.UP && this.keyPressedCode === this.KEY_CODE.DOWN
		|| currentCode === this.KEY_CODE.DOWN && this.keyPressedCode === this.KEY_CODE.UP
};
/**
 * Отвечает за обработку кадров игры
 * 
 * @param snakeDirectional направление движения змеи
 */
SnakeManager.prototype.refresh = function(snakeDirectional) {
	this.snake.transform(snakeDirectional);
	this.checkBorder();
	if (this.snake.wasIntersected()) {
		this.stop();
		this.onDie.deliver();
		return;
	}
	this.redrawSnake();	
	this.checkEatFood();
};
/**
 * Проверяет позицию головы змеи относительно размеров игрового экрана.
 * В случае выхода за его пределы устанавливает голову змеи на противоположной границе.
 */
SnakeManager.prototype.checkBorder = function() {
	var headPos = this.snake.getHeadPosition();
	if (headPos.x >= this.screenWidth) {
		this.snake.setHeadPosition(0, headPos.y);
	} else if (headPos.x < 0) {
		this.snake.setHeadPosition(this.screenWidth - this.snake.gridSize.width, headPos.y);
	} else if (headPos.y >= this.screenHeight) {
		this.snake.setHeadPosition(headPos.x, 0);
	} else if (headPos.y < 0) {
		this.snake.setHeadPosition(headPos.x, this.screenHeight - this.snake.gridSize.height);
	}
};
/**
 * Проверяет пересечение головы змеи с едой, активирует событие в случае успеха
 */
SnakeManager.prototype.checkEatFood = function() {
	var headPos = this.snake.getHeadPosition();	
	var eatFood = this.food.find(function(elem) {
		return elem.coord.x === headPos.x && elem.coord.y === headPos.y; 
	});
	if (eatFood) {
		this.snake.eat(eatFood);
		this.onEat.deliver({snakeCoords: this.snake.getCoords(), foodCoord: eatFood.coord});
	}
};
/**
 * Отвечает за отрисовку змеи на экране покоординатно, также очищает предущий кадр контекста змеи
 */
SnakeManager.prototype.redrawSnake = function() {
	var snakeContext = document.getElementById("snake").getContext("2d");
	snakeContext.clearRect(0, 0, game.snakeMng.screenWidth, game.snakeMng.screenHeight);
	snakeContext.beginPath();
	// раскраска змеи
	snakeContext.fillStyle = 'aqua';
	snakeContext.lineWidth = 7;
	snakeContext.strokeStyle = 'black';
		
	this.snake.getCoords().forEach(function(coord) {
		snakeContext.rect(coord.x, coord.y, game.snakeMng.snake.gridSize.width, game.snakeMng.snake.gridSize.height);
		snakeContext.fill();
		snakeContext.stroke();
	});
};
/**
 * Устанавливает массив объектов еды
 *
 * @param food массив с едой
 */
SnakeManager.prototype.refreshFoodCoords = function(food) {
	this.food = food.slice();
};
/**
 * Очищаем издателей событий
 */ 
SnakeManager.prototype.flush = function() {
	if (this.onEat) {
		this.onEat = null;
	}
	if (this.onDie) {
		this.onDie = null;
	}
};