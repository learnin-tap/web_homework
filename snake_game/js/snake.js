(function() { //小蛇的自调用函数
	var elements = []; //存放小蛇的身体部分
	function Snake(width, height, direction) {
		this.width = width || 20;
		this.height = height || 20;
		this.body = [ //小蛇的初始身体
			{
				x: 3,
				y: 2,
				color: "red" //头
			},
			{
				x: 2,
				y: 2,
				color: "orange" //身体
			},
			{
				x: 1,
				y: 2,
				color: "orange" //身体
			}
		];
		this.direction = direction || "right"; //方向默认向右
	}

	Snake.prototype.init = function(map) { //小蛇初始化的原型方法
		remove(); //先删除之前的小蛇
		for (var i = 0; i < this.body.length; i++) {
			var obj = this.body[i];
			var div = document.createElement("div"); //创建div
			map.appendChild(div); //把div加入到map地图中
			div.style.position = "absolute";
			div.style.width = this.width + "px";
			div.style.height = this.height + "px";
			div.style.left = obj.x * this.width + "px"; //横坐标
			div.style.top = obj.y * this.height + "px"; //纵坐标
			div.style.backgroundColor = obj.color; //颜色
			elements.push(div); //把div加入到elements数组中，方便删除
		}
	};
	Snake.prototype.move = function(food, map) { //小蛇移动的原型方法
		var i = this.body.length - 1;//改变小蛇身体的坐标位置
		for (; i > 0; i--) {
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
		}
		switch (this.direction) { //改变蛇头的坐标位置
			case "right":
				this.body[0].x += 1;
				break;
			case "left":
				this.body[0].x -= 1;
				break;
			case "top":
				this.body[0].y -= 1;
				break;
			case "bottom":
				this.body[0].y += 1;
				break;
		}

		var headX = this.body[0].x * this.width;
		var headY = this.body[0].y * this.height;
		if (headX == food.x && headY == food.y) {//判断小蛇的头的坐标和食物的坐标是否相同
			var last = this.body[this.body.length - 1]; //获取小蛇的最后的尾巴
			this.body.push({ //把最后的蛇尾复制一个,加入到小蛇的body中
				x: last.x,
				y: last.y,
				color: last.color
			});
			food.init(map); //把食物删除,重新初始化食物
		}
	};

	function remove() {
		var i = elements.length - 1;//从蛇尾向蛇头方向删除div
		for (; i >= 0; i--) {
			var ele = elements[i]; 
			ele.parentNode.removeChild(ele); //从map地图上删除这个子元素div
			elements.splice(i, 1);
		}
	}
	window.Snake = Snake; //给Window对象,外部调用
}());
