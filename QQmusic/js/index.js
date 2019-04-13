$(function(){
	// 播放音乐的js
	var $audio = $("audio");
	var player = new Player($audio);
	// 无音乐的状态
	var initial ={
		    "name":"",
		    "singer": "",
		    "album": "",
		    "time": "00:00",
		    "cover":"../images/player_cover.png",
	};
	var progress;/*播放进度条*/
	var voive;/*音量*/
	var lyrice;/*歌词*/
	var Mode = 1;/*播放模式：1顺序播放，2随机播放，3单曲循环播放，4，循环播放*/	

	// 滚动条样式
	$(".content_left_content").mCustomScrollbar();

	// 进度条监听
	initProgress();
	function initProgress(){
		// 进度条背景
		var $progressBar = $(".music_progess_bar");
		// 进度条前景
		var $progressDoc = $(".music_progess_doc");
		// 进度条小圆
		var $progressLine = $(".music_progess_line");
	 	progress = new Progress($progressBar,$progressDoc,$progressLine);
	 	progress.progressClick(function(value){
	 		player.musicSeekTo(value);
	 	});
	 	progress.progressMove(function(value){
	 		player.musicSeekTo(value);
	 	});


		// 进度条背景
		var $voiveBar = $(".music_voive_bar");
		// 进度条前景
		var $voiveDoc = $(".music_voive_doc");
		// 进度条小圆
		var $voiveLine = $(".music_voive_line");
		voive = new Progress($voiveBar,$voiveDoc,$voiveLine);
		voive.progressClick(function(value){
	 		player.musicVoiceSeekTo(value);
	 	});
	 	voive.progressMove(function(value){
	 		player.musicVoiceSeekTo(value);
	 	});

	}


	getPlayerList();
	/*获取json文件信息*/
	function getPlayerList(){
		$.ajax({
			url:"./source/musiclist.json",
			dataType:"json",
			success:function(data){
				player.musicList = data;
				var $musicList = $(".music-list");
				$.each(data,function(index,ele){
					var $item = crateMusicItem(index,ele);
					$musicList.append($item);
				})
				initMusicInfo(data[0]);
				initMusicLyric(data[0]);

			},
			error:function(e){
				console.log(e);
			}
		});
	}

	// 初始化音乐信息
	function initMusicInfo(music){
		// 获取对应的元素
		var songImg = $(".song_img>img");
		var songName = $(".song_name>span");
		var songerName = $(".songer_name>span");
		var songAblum = $(".song_ablum>span");
		var musicProgressName = $(".music_progess_name");
		var musicProgressTime = $(".music_progess_time");
		var mackBg = $(".mack_bg");
		// 为其赋值
		songImg.attr("src",music.cover);
		songName.text(music.name);
		songerName.text(music.singer);
		songAblum.text(music.album);
		musicProgressName.text(music.album+" / "+music.singer);
		musicProgressTime.text("00:00 / "+music.time);
		mackBg.css("background", "url('"+music.cover+"') no-repeat");
	}

	// 初始化歌词
	function initMusicLyric(music){
		lyrice = new Lyrice(music.link_lrc);
		lyrice.loadLyric(function(){
			var songLyrice = $(".song_lyrice>ul");
			var onlyMode =$(".onlyMode>ul");
			songLyrice.html("");
			onlyMode.html("");
			$(".song_lyrice>ul").css("top","0px");
			$(".onlyMode>ul").css("top","0px");
			$.each(lyrice.lyrics,function(index,ele){
				var $item = "<li>"+ele+"</li>";
				songLyrice.append($item);
				onlyMode.append($item);
			});
		});

	}

	/*添加音乐*/
	function crateMusicItem(index,music){
		var $item = $("<div class=\"row list-music\">\
                        <div class=\"col-sm-1 col-xs-1\"><span class='list_check'></span></div>\
                        <div class=\"col-sm-7 col-xs-11\"><span class='list_number'>"+(index+1)+"</span>\
                        "+music.name+"\
                            <div class=\"list_menu\">\
                                <a href=\"javascript:;\" title=\"播放\" class=\"list_menu_play\"></a>\
                                <a href=\"javascript:;\" title=\"添加\" class='hidden-xs'></a>\
                                <a href=\"javascript:;\" title=\"下载\" class='hidden-xs'></a>\
                                <a href=\"javascript:;\" title=\"分享\" class='hidden-xs'></a>\
                            </div>\
                        </div>\
                        <div class=\"col-sm-2 hidden-xs list-name\">"+music.singer+"</div>\
                        <div class=\"col-sm-2 hidden-xs list-time\">\
                            <p>"+music.time+"</p>\
                            <a href=\"javascript:;\" title=\"删除\" class='list_delete'></a>\
                        </div></div>");
		$item.get(0).index = index;
		$item.get(0).music = music;
		return $item;
	}


	//初始化事件监听
    initEvents();
    function initEvents(){
    	/*为歌曲功能添加移入移出事件*/
  //   	$("#content_left_head>ul>li").hover(function(){
		// 	$(this).css("opacity","1");
		// },
		// function(){
		// 	$(this).css("opacity","0.5");
		// });

  //   	/*子菜单显示与隐藏*/
  //   	$(".content_left_ul").delegate(".list_music","mouseenter",function(){
  //   		/*子菜单显示*/
  //   		$(this).find(".list_menu").css("display","inline-block");
  //   		/*时长隐藏与删除键显示*/
  //   		$(this).find(".list_time a").css("display","inline-block");
  //   		$(this).find(".list_time span").css("display","none");
  //   	});
  //   	$(".content_left_ul").delegate(".list_music","mouseleave",function(){
  //   		/*子菜单隐藏*/
  //   		$(this).find(".list_menu").css("display","none");
  //   		/*时长显示与删除键隐藏*/
  //   		$(this).find(".list_time a").css("display","none");
  //   		$(this).find(".list_time span").css("display","inline-block");
  //   	});
    	// 复选框点击
    	$(".music-list").delegate(".list_check","click",function(){
    		$(this).toggleClass("list_checked");
    	});
    	// 全选-复选框（但有漏洞，此处添加的点击事件是在上面的委托事件之前，所以只能反其道而行）
    	$(".list_check_all").on("click",function(){
    		if($(this).hasClass("list_checked")){
				$(".list-music").each(function(index,ele){
					$(ele).find(".list_check").removeClass("list_checked");
				});	
			}else{
				$(".list-music").each(function(index,ele){
					$(ele).find(".list_check").addClass("list_checked");
				});
			}
    	});

    	// 纯净模式的开关
    	$(".music_only").click(function(){
    		$(this).toggleClass("music_only2");
    		if($(this).hasClass("music_only2")){
    			$(".music").fadeToggle(400,function(){
    				$(".onlyMode").fadeToggle(400);
    			});
    		}else{
    			$(".onlyMode").fadeToggle(400,function(){
    				$(".music").fadeToggle(400);
    			});
    		}
    		

    	});

    	// 是否喜欢
    	$(".music_fav").click(function(){
    		$(this).toggleClass("music_fav2");
    	});

    	// 声音点击
    	$(".music_voice_icon").click(function(){
    		$(this).toggleClass("music_voice_icon2");
    		if($(this).hasClass("music_voice_icon2")){
    			player.musicVoiceSeekTo(0);
    		}else{
    			player.musicVoiceSeekTo(player.Volume);
    		}
    	});

    	// 模式控制
    	$(".music_mode").click(function(){
    		$(this).removeClass("music_mode"+Mode);
    		switch(Mode){
    			case 1:
    				Mode++;
    				$(this).attr("title","顺序播放");
    				break;
    			case 2:
    				Mode++;
    				$(this).attr("title","随机播放");
    				$audio.attr("loop","loop");
    				break;
    			case 3:
    				Mode++;
    				$(this).attr("title","单曲循环");
    				$audio.removeAttr("loop");
    				/*单曲循环*/
    				break;
    			case 4:
    				Mode = 1;
    				$(this).attr("title","列表循环");
    				break;    				
    		}
    		$(this).addClass("music_mode"+Mode);
    	});

    	/*点击播放*/
    	var $musicPlay = $(".music_playing");

    	$(".music-list").delegate(".list_menu_play","click",function(){
    		var ListMusic = $($(this).parents(".row")[0]);
            // console.log($(this).parents(".row")[0]);
    		// 1.1切换子菜单按钮
    		$(this).toggleClass("list_menu_play2");
    		// 1.2回复其他兄弟元素的样式
    		$(this).parents().siblings().find(".list_menu_play").removeClass("list_menu_play2");
    		// 1.3将数字切换为音乐动态图标
    		ListMusic.find(".list_number").toggleClass("list_number2");
    		ListMusic.siblings().find(".list_number2").removeClass("list_number2");
    		// 1.4切换底部播放图标（如果已经播放，且只是播放另一首则不切换按钮）
    		if($(this).hasClass("list_menu_play2")){
    			// 切换图标
    			$musicPlay.addClass("glyphicon-pause");
                $musicPlay.removeClass("glyphicon-play");
    			// 让文字高亮
    			ListMusic.css("color","#fff");
    			ListMusic.siblings().css("color","rgba(255,255,255,0.5");
    			// 将数字切换为音乐动态图标
    			ListMusic.find(".list_number")
    		}else{
    			// 切换图标
    			$musicPlay.addClass("glyphicon-play");
                $musicPlay.removeClass("glyphicon-pause");
    			// 让文字不高亮
    			ListMusic.css("color","rgba(255,255,255,0.5");
    		}
    		// 播放音乐
    		player.playMusic(ListMusic.get(0).index,ListMusic.get(0).music);
    		// 获取对应的元素
    		// console.log(ListMusic.get(0).music);
    		initMusicInfo(ListMusic.get(0).music);
    		initMusicLyric(ListMusic.get(0).music);

    	});


    	// 底部控制播放
    	// 播放按钮
    	$musicPlay.click(function(){
    		// 判断之前是否播放过音乐，如果没有则播放第一首，如果有则继续播放
         console.log(1);   // 
    		if(player.currentTime == -1){
    			$(".list-music").eq(0).find(".list_menu_play").trigger("click");
    		}else{
    			$(".list-music").eq(player.currentTime).find(".list_menu_play").trigger("click");
    		}
    	});
    	// 下一首按钮
    	$(".music_next").click(function(){
    		$(".list-music").eq(player.nextIndex(Mode)).find(".list_menu_play").trigger("click");
    	});
    	// 上一首按钮
    	$(".music_pre").click(function(){
    		$(".list-music").eq(player.preIndex()).find(".list_menu_play").trigger("click");
    	});

    	// 播放事件监听
    	player.musicTimeUpdate(function(timeStr,duration,currentIndex){
    		$(".music_progess_time").text(timeStr);
    		var value = (currentIndex / duration)*100;
    		progress.setProgress(value);
    		var value2 = lyrice.currentIndex(currentIndex);
    		var $item = $(".song_lyrice>ul>li").eq(value2);
    		var $item2 = $(".onlyMode>ul>li").eq(value2);
    		$($item).addClass("now_lyrice");
    		$($item2).addClass("now_onlyMode");
    		$($item).siblings().removeClass("now_lyrice");
    		$($item2).siblings().removeClass("now_onlyMode");
    		if(value2 <= 2)return true;
    		$(".song_lyrice>ul").animate({
    			top:(-value2+2)*30+"px"
    		},150);
    		$(".onlyMode>ul").animate({
    			top:(-value2+2)*50+"px"
    		},150);
    	});

		// 音乐播放结束后播放另一首音乐
    	$audio.on("ended",function(){
    		if(Mode == 1){
    			// 顺序播放
    			if(player.currentTime == player.musicList.length-1){
    				$(".music_play").trigger("click");
    				player.audio.pause();
    			}else{
    				$(".music_next").trigger("click");
    			}
    		}else{
    			// 循环播放
    			$(".music_next").trigger("click");
    		}
    		
    	});

    	// 删除键点击事件
    	$(".music-list").delegate(".list_delete","click",function(){
    		var $item = $(this).parents(".list-music");

    		// 删除对应的音乐
    		if(player.currentTime == $item.get(0).index){
				$(".music_next").trigger("click");
    			$item.remove();
    		}else{
    			$item.remove();
    		}
    		// 删除内部数据
    		player.removeMusic($item.get(0).index);
    		// 重新排序
    		$(".list-music").each(function(index,ele){
    			ele.index = index;
    			$(ele).find(".list_number").text(index+1);
    		});
            // 判定是否为最后一首
           if(player.musicList.length == 1){
                // 停止音乐
                if(!($("audio").get(0).paused)){
                    $(".list-music").eq(0).find(".list_menu_play").trigger("click");
                }
                // 恢复初始状态
                initMusicInfo(initial);
                player.currentTime = -1;
            }else{
                 
            }
    	});
    	// 顶部删除键点击事件
    	$(".clearMusic").click(function(){
    		$(".list_checked").each(function(index,ele){
    			$(ele).parents(".list-music").find(".list_delete").trigger("click");
    		});
    	});
    	// 清空列表点击事件
    	$(".clearList").click(function(){
    		if(confirm("您确定要清空列表？"))
    			{$(".list-music").each(function(index,ele){
    				$(ele).find(".list_delete").trigger("click"); 			
    			});
    		}
    	});

		$(".navbar-toggle").click(function(){
			$(".navbar-toggle-span").toggleClass("navbar-toggle-active");
			$(".navbar-toggle-span2").toggleClass("navbar-toggle-active2");
		});
    }
});

