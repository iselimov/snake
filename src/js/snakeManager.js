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
	this.refresh(snake.snakeDirectional);
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
	   var currSnakeDir = this.snakeMng.nextDirectionals.length > 0 ? this.snakeMng.nextDirectionals.shift() : this.snakeMng.currSnakeDirectional;
	   this.snakeMng.refresh(currSnakeDir);
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
	if (!this.snakeMng.keyPressedCode) {
		this.snakeMng.keyPressedCode = this.snakeMng.KEY_CODE.DOWN;
	}
	if (this.snakeMng.keyPressedCode === event.keyCode) {
		return;		
	}
	var isOpposeKeyPressed = this.snakeMng.isOpposeKeyPressed(event.keyCode);
	if (!isOpposeKeyPressed) {
		if (event.keyCode === this.snakeMng.KEY_CODE.LEFT) {
			snakeDirectional = this.snake.SNAKE_POS.LEFT;
		} else if (event.keyCode === this.snakeMng.KEY_CODE.RIGHT) {
			snakeDirectional = this.snake.SNAKE_POS.RIGHT;
		} else if (event.keyCode === this.snakeMng.KEY_CODE.UP) {
			snakeDirectional = this.snake.SNAKE_POS.UP;
		} else if (event.keyCode === this.snakeMng.KEY_CODE.DOWN) {
			snakeDirectional = this.snake.SNAKE_POS.DOWN;
		} else {
			return;
		}
		this.snakeMng.keyPressedCode = event.keyCode;
		this.snakeMng.nextDirectionals.push(snakeDirectional);
		this.snakeMng.currSnakeDirectional = snakeDirectional;
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
		alert('FUCK!');
		return;
	}
	this.redrawSnake();
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
		this.snake.setHeadPosition(this.screenWidth - this.snake.gridWidth, headPos.y);
	} else if (headPos.y >= this.screenHeight) {
		this.snake.setHeadPosition(headPos.x, 0);
	} else if (headPos.y < 0) {
		this.snake.setHeadPosition(headPos.x, this.screenHeight - this.snake.gridHeight);
	}
};
/**
 * Отвечает за отрисовку змеи на экране покоординатно, также очищает предущий кадр контекста змеи
 */
SnakeManager.prototype.redrawSnake = function() {
	var snakeContext = document.getElementById("snake").getContext("2d");
	snakeContext.clearRect(0, 0, this.screenWidth, this.screenHeight);
	snakeContext.beginPath();
	// раскраска змеи
	snakeContext.fillStyle = 'blue';
	snakeContext.lineWidth = 7;
	snakeContext.strokeStyle = 'red';
		
	this.snake.getCoords().forEach(function(coord) {
		snakeContext.rect(coord.x, coord.y, snake.gridWidth, snake.gridHeight);
		snakeContext.fill();
		snakeContext.stroke();
	});
};