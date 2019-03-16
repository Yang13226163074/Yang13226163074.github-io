$(document).ready(function(){
	luanbo();
	lunbo2();
	$("#new_head>ul>li").mouseenter(function (){
		this.style.borderBottom = "solid 2px #f40";
		$(this).siblings().css("border-bottom","none");
		var new_num = $(this).index();
		var new_content = $(".new_content").eq(new_num);
		new_content.css("display","block");
		new_content.siblings().css("display","none");
	});
});
var time,time2;
function luanbo(){
	var i = parseInt($("#show_img>ul").css("left"));
	i -= 520;
	if(i == -3120){
		i = 0;
		$("#show_img>ul").css("left","0");
		time = setTimeout("luanbo()",1);
		return;
	}
	$("#show_img>ul").animate({
		left:i
	},1000);
	time = setTimeout("luanbo()",2000);

}
function lunbo2(){
	var i = parseInt($("#brand_tp>ul").css("left"));
	var num = (i / -520);
	i -= 520;
	//判定是否已经是末尾了，如果是重新倒回开头
	if(i == -3640){
		i = 0;
		$("#brand_tp>ul").css("left","0");
		time = setTimeout("lunbo2()",1);
		return;
	}
	$("#progress_bar>ul>li").eq(num).css("background-color","#000");
	$("#progress_bar>ul>li").eq(num).siblings().css("background-color","#f40");
	$(".c3").html(num+1);
	time2 = setTimeout("lunbo2()",2500);
	//移动动画
	$("#brand_tp>ul").animate({
		left:i
	},1000);
	
}
/*var num = (i / -520);
	$("#progress_bar>ul>li").eq(num).css("background-color","#000");
	$("#progress_bar>ul>li").eq(num).siblings().css("background-color","#f40");*/