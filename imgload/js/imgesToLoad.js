// window.onload=function () {
	function img(el,num,url){
		return new img.prototype.init(el,num,url);
	}
	img.prototype = {
		init:function(el,inx,url){
			this.el = el;	/*元素*/
			this.url = url;	/*地址*/
			this.inx = inx;	/*一次加载多少张图片*/
			this.sum = 0;	/*放了几张图片*/
			this.num = 0;	/*页数*/
			this.larr = [];
			this.tarr = [];
			this.list = 0;
			this.getlist();
			this.ifload = true;
			this.last_tarr = [...this.tarr];			
			this.load();
		},
		// 加载图片
		load:function(){
			if(this.ifload == true){
				for(let i = 0;i < this.inx;i++){
					let node = `<div class="images" style="top:${this.tarr[this.getmix()]}px;left:${this.larr[i%this.list]}px">
						<img src="images/timg.gif" alt="" ">
					</div>`;
					this.tarr[i%this.list] = this.tarr[i%this.list]+153.5;
					this.el.innerHTML += node;
					
				}
				this.ifload = false;
				this.getjson();
			}else{
				alert("数据加载中请稍等...");
			}		

		},
		getjson:function(){
			let xmlhttp=null;
			let $this = this;

			let p = new Promise(function(resolve,reject){					
					if(window.XMLHttpRequest){
					  	xmlhttp = new XMLHttpRequest();
					 }else if (window.ActiveXObject){
					  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
					 }
					 if (xmlhttp!=null){
					  	xmlhttp.open("GET",`${$this.url}/${$this.inx}/${$this.num}`,true);
					  	xmlhttp.onreadystatechange = function(){
					  		if (xmlhttp.readyState == 4) {
								if (xmlhttp.status == 200) {
									resolve(xmlhttp.responseText);

								} else {
									console.log("Problem retrieving XML data");
								}
							}
					  	};
					  	xmlhttp.send();					  	
					 }else{
					  	alert("Your browser does not support XMLHTTP.");
					 }

				});
				p.then(res => {
					let json = JSON.parse(res).results;					
					let obj = document.getElementsByClassName('images');
					for(let i = $this.num*$this.inx;i <= obj.length-1;i++){
							let objimg = new Image();
							objimg.onload = function(){
								let objh = (190/objimg.width*objimg.height).toFixed(2);
								$this.sum++;
								$this.tarr = [...$this.last_tarr];
								obj[i].getElementsByTagName('img')[0].src = json[i-$this.num*$this.inx].url;
								obj[i].style.top = `${$this.tarr[$this.getmix()]}px`;
								obj[i].style.left = `${$this.larr[$this.getmix()]}px`;
								$this.last_tarr[$this.getmix()] += +objh+12;
									console.log(1);

								if($this.sum==obj.length){
									Promise.resolve().then(res=>{
										$this.ifload = true;
										++$this.num;
										document.getElementById('context').style.height = $this.tarr[$this.getmax()]+'px';
									})
									$this.tarr = [...$this.last_tarr];
								}

							}
							objimg.onerror = function(){
								$this.sum++;
								$this.tarr = [...$this.last_tarr];
								obj[i].getElementsByTagName('img')[0].src = "images/timg.gif";
								obj[i].style.top = `${$this.tarr[$this.getmix()]}px`;
								obj[i].style.left = `${$this.larr[$this.getmix()]}px`;
								$this.last_tarr[$this.getmix()] += +143+16;
								if($this.sum==obj.length){
									Promise.resolve().then(res=>{
										$this.ifload = true;
										++$this.num;
										document.getElementById('context').style.height = $this.tarr[$this.getmax()]+'px';
									})
									$this.tarr = [...$this.last_tarr];
								}
							}
							// console.log(i-$this.num*$this.inx);

							objimg.src = json[i-$this.num*$this.inx].url;
							// console.log($this.tarr[$this.getmax()]);

					}

					

				})


			
		},
		getlist:function(){
			let ih =document.body.clientWidth;
			this.list = Math.floor(ih/(180+10));
			for(let i = 0;i < this.list;i++){
				this.larr.push(i*190+6+(i*12));
				this.tarr.push(5);
			}
		},
		getmix:function(){
			let mix = 0;
			for(let i = 0;i < this.tarr.length;i++){
				if(this.tarr[i] < this.tarr[mix]){
					mix = i;
				}
			}
			return mix;
		},
		getmax:function(){
			let max = 0;
			for(let i = 0;i < this.tarr.length;i++){
				if(this.tarr[i] > this.tarr[max]){
					max = i;
				}
			}
			return max;
		}

	}
	img.prototype.init.prototype = img.prototype;
// }