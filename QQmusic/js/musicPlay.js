(function(window){
	function Player($audio){
		return new Player.prototype.init($audio);
	}
	Player.prototype = {
		constructor: Player,
		musicList:[],
		init:function ($audio){
			this.$audio = $audio;
			this.audio = $audio.get(0);
		},
		currentTime : -1,
		Volume : 1,
		
		// 播放音乐
		playMusic:function(index,music){
			// 首先判断是否为同一首音乐
			if(this.currentTime == index){
				if(this.audio.paused){
					this.audio.play();
				}else{
				this.audio.pause();
				}
			}else{
				this.$audio.attr("src",music.link_url);
				this.audio.play();
				this.currentTime = index;
			}
		},
		// 上一首算法
		preIndex:function(){
			var index;
			if(this.currentTime == 0){
				index = this.musicList.length - 1;
			}else{
				index = this.currentTime - 1; 
			}
			return index;
		},
		// 下一首算法
		nextIndex:function(Mode){
			var index;
			if(Mode == 2){
				do{
					index = parseInt(Math.random()*this.musicList.length);
				}while(index == this.currentTime)
				// 随机播放
			}else{
				if(this.currentTime == this.musicList.length-1){
					index = 0;
				}else{
					index = this.currentTime + 1;
				}
			}

			
			return index;
		},
		// 删除音乐数据
		removeMusic:function(index){
			this.musicList.splice(index,1);
			// 如果删除的音乐在播放的音乐之前，则减一
			if(index < this.currentTime){
				this.currentTime = this.currentTime-1;
			}
		},
		// 为歌曲播放时添加监听事件
		musicTimeUpdate:function(callBack){
			var $this = this;
			this.$audio.on("timeupdate",function(){
				// 总时长
				var duration = $this.audio.duration;
				// 已播放时长
				var currentIndex = $this.audio.currentTime;
				if(isNaN(duration) || isNaN(currentIndex)){
					return;
				}
				var timeStr = $this.formatDate(duration,currentIndex);
				callBack(timeStr,duration,currentIndex);

			})
		},
		// 将时间格式化后返回
		formatDate:function(duration,currentIndex){
			var endMin = parseInt(duration / 60);
			var endSec = parseInt(duration % 60);
			if(endMin < 10){
				endMin = "0" + endMin;
			}
			if(endSec < 10){
				endSec = "0" + endSec;
			}

			var starMin = parseInt(currentIndex / 60);
			var starSec = parseInt(currentIndex % 60);
			if(starMin < 10){
				starMin = "0"+starMin;
			}
			if(starSec < 10){
				starSec = "0" + starSec;
			}
			return starMin+":"+starSec+" / "+endMin+":"+endSec;
		},
		// 跳转音乐
		musicSeekTo:function(value){
			if(isNaN(value))return;
			this.audio.currentTime = this.audio.duration * value;
		},
		// 控制音量
		musicVoiceSeekTo:function(value){
			if(isNaN(value))return;
			if(value != 0){
				this.Volume = value;
			}
			console.log(this.Volume);
			this.audio.volume = value;
		}
	}
	Player.prototype.init.prototype = Player.prototype;
	window.Player = Player;



})(window);