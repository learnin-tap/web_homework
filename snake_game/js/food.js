(function() { //食物的自调用函数
	var foods = []; //用来保存每个食物
	function Food(x, y, width, height, color) { //先定义构造函数,然后创建对象
		this.x = x || 0; //横坐标
		this.y = y || 0; //纵坐标
		this.width = width || 20; //宽
		this.height = height || 20; //高
		this.color = color || "green"; //食物颜色
	}
	Food.prototype.init = function(map) { //把map传进来
		remove(); //先删除食物
		var div = document.createElement("div"); //创建食物的div
		map.appendChild(div); //把div加到map中
		div.style.width = this.width + "px";
		div.style.height = this.height + "px";
		div.style.backgroundColor = this.color;
		div.style.position = "absolute"; //脱离文档流
		div.style.borderRadius = "50%";
		//设置食物随机位置
		this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
		this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
		div.style.left = this.x + "px";
		div.style.top = this.y + "px";
		foods.push(div); //把div加入到数组foods中
	};

	function remove() { //吃掉食物
		for (var i = 0; i < foods.length; i++) { //foods数组中有这个食物
			var food = foods[i];
			food.parentNode.removeChild(food); //找到这个子元素的父级元素,然后删除这个子元素
			foods.splice(i, 1); //再次把foods中的这个子元素也要删除
		}
	}
	window.Food = Food; //给Window对象,外部调用
}());
