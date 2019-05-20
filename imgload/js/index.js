window.onload=function () {
	let img111 = new img(document.getElementById('context'),20,'https://gank.io/api/data/%E7%A6%8F%E5%88%A9');
	let wh = window.innerHeight;
	window.onscroll=function(){
		if(Math.ceil(window.innerHeight+document.documentElement.scrollTop) >= document.documentElement.offsetHeight&&img111.ifload==true){
			document.getElementsByTagName('option')[0].style.display = "block";
			img111.load();
		}
	}
}
	