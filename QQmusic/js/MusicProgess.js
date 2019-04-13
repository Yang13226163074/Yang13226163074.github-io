(function(window){
	function Progress($progressBar,$progressDoc,$progressLine){
		return new Progress.prototype.init($progressBar,$progressDoc,$progressLine);
	}
	Progress.prototype = {
		constructor:Progress,
		init:function($progressBar,$progressDoc,$progressLine){
			this.$progressBar = $progressBar;
			this.$progressDoc = $progressDoc;
			this.$progressLine = $progressLine;
		},
		isMove: false,
		// 点击进度条
		progressClick:function(callBack){
			var $this = this;
			this.$progressBar.click(function(e){
				// 获取整个进度条框距离浏览器的左距离
				var normalLeft = $(this).offset().left;
				// 获取点击位置距离浏览器的左距离
				var eventLeft = e.pageX || e.clientX;
				$this.$progressDoc.css("width",eventLeft-normalLeft+"px");
				$this.$progressLine.css("left",eventLeft-normalLeft+"px");
				var value = (eventLeft-normalLeft)/ $(this).width();
			console.log($this.$progressBar,$this.$progressDoc,$this.$progressLine);

				callBack(value);
			});
		},	
		// 拖拽进度条
		progressMove:function(callBack){
			var $this = this;
			var normalLeft = $this.$progressBar.offset().left;
			var barWidth = $this.$progressBar.width();
			var eventLeft;
			this.$progressLine.mousedown(function(){
				var offset;
				$this.isMove = true;
				$(document).mousemove(function(e){
					// 获取移动位置距离浏览器的左距离
					eventLeft = e.pageX || e.clientX;
					offset = eventLeft-normalLeft;
					if(offset < 0 ||offset > barWidth){
						return;
					}
					$this.$progressDoc.css("width",offset+"px");
					$this.$progressLine.css("left",offset+"px");
					// console.log($this.$progressDoc);
				});

			});
			$(document).mouseup(function(){
				if($this.isMove == true){
					$(document).off("mousemove");
					$this.isMove = false;
					var value = (eventLeft-normalLeft)/ barWidth;
					callBack(value);
				}	
			});
		},
		setProgress:function(value){
			if(this.isMove == true)return;
			if(value < 0 || value > 100)return;
			this.$progressDoc.css("width",value+"%");
			this.$progressLine.css("left",value+"%");
		}
	}
	Progress.prototype.init.prototype = Progress.prototype;
	window.Progress = Progress;
})(window);