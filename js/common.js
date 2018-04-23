$(window).bind("load",function() {
  //页面加载时AJAX加载共用内容
	var ajaxObj;//AJAX对象

	ajaxObj = $.ajax({url:"./header.html",async:false});//同步加载导航栏
	if(ajaxObj.status == 200)
		$("header").html(ajaxObj.responseText);

	ajaxObj = $.ajax({url:"./footer.html",async:false});//同步加载footer
	if(ajaxObj.status == 200)
		$("footer").html(ajaxObj.responseText);


  // header样式修改
	var awidth = $('header').find(".firstmenu").css('width');
	$('.firstmenu').find("li").css('width',awidth);

	$('.secondmenu').find('a').bind('mouseenter',function() {
		$(this).parent().find('li').animate({
			opacity: 1
		});
	});
	$('.secondmenu').bind('mouseleave',function() {
		$(this).parent().find('li').animate({
			opacity: 0
		});
	});

});
