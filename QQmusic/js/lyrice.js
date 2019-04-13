(function(window){
	function Lyrice(path){
		return new Lyrice.prototype.init(path);
	}
	Lyrice.prototype = {
		constructor: Lyrice,
		init:function (path){
			this.path = path;
		},
		times: [],/*时间*/
		lyrics:[],/*歌词*/
		index: -1,
		loadLyric:function(callBack){
			var $this = this;
			// 获取到歌词
			$.ajax({
				url: $this.path,
				dataType: "text",
				success:function(data){
					$this.parseLyric(data);
					callBack();
				},
				error:function(e){
					console.log(e);
				}
			});
		},
		parseLyric:function(data){
			var $this = this;
			this.times = [];
			this.lyrics = [];
			var array = data.split("\n");
			var res = /^\[(\d+:\d+\.\d+)\]/;
			$.each(array,function(index,ele){
				// 获取歌词
				var lrc = ele.split("]")[1];
				if(lrc.length == 1)return true;
				$this.lyrics.push(lrc);

				// 获取时间
				var res1 = res.exec(ele);
				if(res1 == null)return true;
				var timeStr = res1[1];
				var min = parseInt(timeStr.split(":")[0]) * 60;
				var sec = parseFloat(timeStr.split(":")[1]);
				var time2 = parseFloat(Number(min+sec).toFixed(2));
				$this.times.push(time2);
			});
		},
		currentIndex:function(currentTime){
			if(currentTime > this.times[(this.index+1)]){
				this.index++;
			}
			return this.index;
		}
	}
	Lyrice.prototype.init.prototype = Lyrice.prototype;
	window.Lyrice = Lyrice;
})(window);