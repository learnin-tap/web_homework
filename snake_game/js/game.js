(function() { //游戏的自调用函数
	var that = null; //保存游戏Game的实例对象
	function Game(map) { //游戏的构造函数
		this.food = new Food(); //食物对象
		this.snake = new Snake(); //小蛇对象
		this.map = map; //地图
		that = this; //把当前的实例对象保存到that变量中
	}
	Game.prototype.init = function() {
		this.food.init(this.map); //初始化食物
		this.snake.init(this.map); //小蛇初始化
		this.runSnake(this.food, this.map); //调用小蛇自动移动方法
		this.bindKey(); //调用键盘
	};
	Game.prototype.runSnake = function(food, map) {//小蛇自动移动的原型方法
		var timeId = setInterval(function() {
			this.snake.move(food, map); //移动小蛇
			this.snake.init(map); //初始化小蛇
			var maxX = map.offsetWidth / this.snake.width; //横坐标的最大值
			var maxY = map.offsetHeight / this.snake.height; //纵坐标的最大值
			var headX = this.snake.body[0].x; //蛇头横坐标
			var headY = this.snake.body[0].y; //蛇头纵坐标
			if (headX < 0 || headX >= maxX) { //横坐标
				clearInterval(timeId); //清除计时
				alert("game over !");
			}
			if (headY < 0 || headY >= maxY) { //纵坐标
				clearInterval(timeId); //清除计时
				alert("game over !");
			}
		}.bind(that), 200);
	};
	Game.prototype.bindKey = function() { //设置用户按键,改变小蛇移动的方向
		document.addEventListener("keydown", function(e) { //获取用户的按键,改变小蛇的方向
			switch (e.keyCode) {
				case 37:
					this.snake.direction = "left";
					break;
				case 38:
					this.snake.direction = "top";
					break;
				case 39:
					this.snake.direction = "right";
					break;
				case 40:
					this.snake.direction = "bottom";
					break;
			}
		}.bind(that), false);
	};
	window.Game = Game; //给Window对象,外部调用
}());
