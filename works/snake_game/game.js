"use strict";
var disp = $('.disp'),
    msg = $('.msg');
var gameRunning = false,
	gameInterval;
var timeStep, currTime, frameStep;  // frameStep 控制蛇的速度，越小越快

// 食物位置
var currentCoin;

// 可用的畫素
var availablePixels;

var BAD_MOVE = 1,
    ACE_MOVE = 2,
    GOOD_MOVE = 3;

var dispWidthInPixels = 40;

var beep = document.createElement('audio'),
	gameover = document.createElement('audio');
if (!!(beep.canPlayType && beep.canPlayType('audio/mpeg;').replace(/no/, ''))) {
	beep.src = 'beep.mp3';
	gameover.src = 'gameover.mp3';
} else {
	beep.src = 'beep.ogg';
	gameover.src = 'gameover.ogg';
}

for (var i = 0; i < dispWidthInPixels; i++) {
	for (var j = 0; j < dispWidthInPixels; j++) {
		var tmp = $('<div class="pixel" data-x="' + j + '" data-y="' + i + '"></div>');
		disp.append(tmp);
	}
}

var showMessage = function(ma, mb) {
	msg.find('.msg-a').text(ma);
	msg.find('.msg-b').text(mb);
};

// 將可用畫素變成蛇的一部分
var tryAllocatingPixel = function(x, y) {
	var ap = availablePixels,
		p = x + '|' + y,
		idx = ap.indexOf(p);
	if (idx !== -1) {
		ap.splice(idx, 1);
		$('div.pixel[data-x="' + x + '"][data-y="' + y +'"]').addClass('taken');
		return true;
	} else {
		return false;
	}

};

// 隨機找一個畫素當下個食物
var useNextRandomPixelForCoin = function() {
	var ap = availablePixels;
	if (ap.length === 0) {
		return false;
	}
	var rand = Math.floor(Math.random() * ap.length);
	currentCoin = ap.splice(rand, 1)[0].split('|');
	$('div.pixel[data-x="' + currentCoin[0] + '"][data-y="' + currentCoin[1] +'"]').addClass('taken');
	return true;
};

// 調整蛇前進速度
var adjustSpeed = function(l) {
	if (l >= 500) {
		frameStep = 50;
	} else if (l >= 400) {
		frameStep = 100;
	} else if (l >= 300) {
		frameStep = 150;
	} else if (l >= 200) {
		frameStep = 200;
	}
};

// 釋放蛇的尾巴給可用畫素
var releasePixel = function(x, y) {
	$('div.pixel[data-x="' + x + '"][data-y="' + y +'"]').removeClass('taken');
	availablePixels.push(x + '|' + y);
}

var DIR_LEFT = 'l',
	DIR_RIGHT = 'r',
	DIR_UP = 'u',
	DIR_DOWN = 'd';

var snake = {
	// 行進方向
	direction: 'l',
	// 身體所占畫素
	bodyPixels: [],
	move: function() {
		var head = this.bodyPixels[this.bodyPixels.length - 1];

		var nextHead = [];
		if (this.direction === DIR_RIGHT) {
			nextHead.push(head[0] + 1);
		} else if (this.direction === DIR_LEFT) {
			nextHead.push(head[0] - 1);
		} else {
			nextHead.push(head[0]);
		}

		if (this.direction === DIR_DOWN) {
			nextHead.push(head[1] + 1);
		} else if (this.direction === DIR_UP) {
			nextHead.push(head[1] - 1);
		} else {
			nextHead.push(head[1]);
		}

		if (nextHead[0] == currentCoin[0] && nextHead[1] == currentCoin[1]) {
			this.bodyPixels.push(nextHead);

			beep.play();
			adjustSpeed(this.bodyPixels.length);
			if (useNextRandomPixelForCoin()) {
				return GOOD_MOVE;
			} else {
				return ACE_MOVE;
			}
		} else if (tryAllocatingPixel(nextHead[0], nextHead[1])) {
			this.bodyPixels.push(nextHead);
			var tail = this.bodyPixels.splice(0, 1)[0];
			releasePixel(tail[0], tail[1]);
			return GOOD_MOVE;
		} else {
			gameover.play();
			return BAD_MOVE;
		}
	}
};

// 初始化
var initializeGame = function() {
	frameStep = 250;
	timeStep = 50;
	currTime = 0;

	availablePixels = [];
	for (var i = 0; i < dispWidthInPixels; i++) {
		for (var j = 0; j < dispWidthInPixels; j++) {
			availablePixels.push(i + '|' + j);
		}
	}
	$('div.pixel').removeClass('taken');

	snake.direction = 'l';
	snake.bodyPixels = [];
	for (var i = 29, end = 29 - 16; i > end; i--) {
		tryAllocatingPixel(i, 25);
		snake.bodyPixels.push([i, 25]);
	}

	useNextRandomPixelForCoin();
};

// 遊戲主要程序(運作蛇每秒動作)
var startMainLoop = function() {
	gameInterval = setInterval(function() {
		currTime += timeStep;
		// 控制蛇的速度
		if (currTime >= frameStep) {
			var m = snake.move();
			if (m === BAD_MOVE) {
				clearInterval(gameInterval);
				gameRunning = false;
				showMessage('Game Over', 'Press space to start again');
			} else if (m === ACE_MOVE) {
				clearInterval(gameInterval);
				gameRunning = false;
				showMessage('You Won', 'Press space to start again');
			}
			currTime %= frameStep;
		}
	}, timeStep);
	showMessage('', '');
};

// 按鍵控制
$(window).keydown(function(e) {
	var k = e.which;

	switch (k) {
		// up
		case 38:
			e.preventDefault();
			if (snake.direction !== DIR_DOWN)
				snake.direction = DIR_UP;
			break;
		// down
		case 40:
			e.preventDefault();
			if (snake.direction !== DIR_UP)
				snake.direction = DIR_DOWN;
			break;
		// left
		case 37:
			e.preventDefault();
			if (snake.direction !== DIR_RIGHT)
				snake.direction = DIR_LEFT;
			break;
		// right
		case 39:
			e.preventDefault();
			if (snake.direction !== DIR_LEFT)
				snake.direction = DIR_RIGHT;
			break;
		// space (start)
		case 32:
			e.preventDefault();
			if (!gameRunning) {
				initializeGame();
				startMainLoop();
				gameRunning = true;
			}
			break;
		// p (stop)
		case 80:
			if (gameRunning) {
				if (gameInterval) {
					clearInterval(gameInterval);
					gameInterval = null;
					showMessage('Paused', '');
				} else {
					startMainLoop();
				}
			}
			break;
		// f, for Left turn
		case 70:
			if (snake.direction === DIR_UP) {
				snake.direction = DIR_LEFT;
			} else if (snake.direction === DIR_RIGHT) {
				snake.direction = DIR_UP;
			} else if (snake.direction === DIR_DOWN) {
				snake.direction = DIR_RIGHT;
			} else if (snake.direction === DIR_LEFT) {
				snake.direction = DIR_DOWN;
			}
			break;
		// j, for Right turn
		case 74:
			if (snake.direction === DIR_LEFT) {
				snake.direction = DIR_UP;
			} else if (snake.direction === DIR_UP) {
				snake.direction = DIR_RIGHT;
			} else if (snake.direction === DIR_RIGHT) {
				snake.direction = DIR_DOWN;
			} else if (snake.direction === DIR_DOWN) {
				snake.direction = DIR_LEFT;
			}
			break;
	}
});

showMessage('Snake', 'Press space to start!');
