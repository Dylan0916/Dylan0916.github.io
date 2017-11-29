"use strict";

var winResizeHandler = function() {
	var w = $('.cell').width();
	$(".cell").height(w).css({
		'font-size': w + 'px',
		'line-height': w * 0.92 + 'px'
	});	
};

// 隨視窗改變大小 & 任意鍵遊戲重來
$(window)
	.resize(winResizeHandler)
	.keydown(function(e) {
		e.preventDefault();	// 阻止按鍵默認事件
		initGame();
	});

winResizeHandler();


var gameOver = true,
	currentState = [],
	symbols = ['&times;', '&#9675;'],
	currentStep = 0;

// 勝利組合
var winningCombos = {
	combo0: [0, 1, 2],
	combo1: [3, 4, 5],
	combo2: [6, 7, 8],
	combo3: [0, 3, 6],
	combo4: [1, 4, 7],
	combo5: [2, 5, 8],
	combo6: [0, 4, 8],
	combo7: [2, 4, 6]
};

// 點擊後尋找勝利組合
var potentialCombos = {
	0: ['combo0', 'combo3', 'combo6'],
	1: ['combo0', 'combo4'],
	2: ['combo0', 'combo5', 'combo7'],
	3: ['combo1', 'combo3'],
	4: ['combo1', 'combo4', 'combo6', 'combo7'],
	5: ['combo1', 'combo5'],
	6: ['combo2', 'combo3', 'combo7'],
	7: ['combo2', 'combo4'],
	8: ['combo2', 'combo5', 'combo6'],
};

$('.cell').click(function() {
	if (!gameOver) {
		var $this = $(this);
		var i = $this.data('i');
		if (currentState[i] === null) {
			var s = symbols[currentStep++ % 2];
			currentState[i] = s;
			$this.html(s);
			for (var j = 0, len = potentialCombos[i].length; j < len; j++) {
				var ww = winningCombos[potentialCombos[i][j]];
				if (checkCombo(ww)) {
					gameOver = true;
					$('.ss').text('Press any key to start new game.');
					return;
				}
			}
			if (currentStep === 9) {
				gameOver = true;
				$('.ss').text('Draw! Press any key to start new game.');
				return;
			}
			showArrow(currentStep);
		}
	}
});

// 檢查符號陣列中是否在勝利組合的位置是一樣的符號
var checkCombo = function(a) {
	var a0 = currentState[a[0]],
		a1 = currentState[a[1]],
		a2 = currentState[a[2]];
	var w = (a0 === a1 && a1 === a2);
	if (w) {
		$('.cell[data-i="' + a[0] + '"]').addClass('win');
		$('.cell[data-i="' + a[1] + '"]').addClass('win');
		$('.cell[data-i="' + a[2] + '"]').addClass('win');
	}
	return w;
};

var showArrow = function(p) {
	if (p % 2 === 0) {
		$('.player1 .arrow').removeClass('inv');
		$('.player2 .arrow').addClass('inv');
	} else {
		$('.player1 .arrow').addClass('inv');
		$('.player2 .arrow').removeClass('inv');
	}
};

var initGame = function() {
	if (gameOver) {
		$('.cell').empty().removeClass('win');
		gameOver = false;
		for (var i = 0; i < 9; i++) {
			currentState[i] = null;
		}
		currentStep = 0;
		showArrow(currentStep);
		$('.ss').text('');
	}
}
initGame();

