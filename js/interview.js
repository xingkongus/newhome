$(document).ready(function() {
	var API_URL = "http://xk.leekachung.cn/api/getmes2xk";

	$.ajax({
		url: API_URL,
		async: false,
		success: function(res) {
			videodata = res.videodata;
			newvideo = res.newvideo;
		},
		dataType: "json"
	});


// 加载默认数据
	var newv = $('#newvideo');
	$(newv).find(".video_iframe").attr('src',newvideo.src);
	$(newv).find(".vname").text(newvideo.name);
	$(newv).find(".vtime").text(newvideo.time);

	var oldvkid = $('#old').children();
	var vlen = $(videodata[0].first).length;
	for( var i = 0; i < vlen; i++) {
		$(oldvkid[i]).find(".video_iframe").attr('src',((videodata[0].first)[i]).src);
		$(oldvkid[i]).find(".vname").text(((videodata[0].first)[i]).name);
		$(oldvkid[i]).find(".vtime").text(((videodata[0].first)[i]).time);
	}
	if( $(videodata[0].second).length == 0 ) {
		$('#nextterm').css('background-image','url(image/unchoose.png)');
	}

// 样式修改
	var _tempmt = parseInt($('html').css("height")) * 0.45;
	$('.container').css("margin-top",_tempmt);

	var yearshow = $('#yearshow');
	$(yearshow).mouseover(function() {
		$(yearshow).find("#temporary").remove();
	}).mouseout(function() {
		$(yearshow).prepend('<li id="temporary">' + $(old).attr('year') +'</li>');
	});

// 数据
	function turntermdata(term) {
		var len = $(term).length;
		var pageaccount = Math.ceil( len / num ); 
		var oldkid = $(old).children();

		$('.page').remove();
		for( var i = 1; i <= pageaccount; i++) {
			$(pagenum).append('<li class="page" page=" ' + i + ' "> ' + i + '</li>');
		}

		var _width = ( 1 / parseInt(pageaccount) ) * ( 1 - (pageaccount * 0.05) ) * parseInt($(pagenum).css('width'));
		$('.page').css('width',_width);

	
		$(old).fadeOut(500,function() {
			for( var i = 0; i < len; i++) {
				$(oldkid[i]).find(".video_iframe").attr('src',term[i].src);
				$(oldkid[i]).find(".vname").text(term[i].name);
				$(oldkid[i]).find(".vtime").text(term[i].time);
			}
			for( var i = len; i < 4; i++) {
				$(oldkid[i]).find(".video_iframe").attr('src',"");
				$(oldkid[i]).find(".vname").text(" ");
				$(oldkid[i]).find(".vtime").text(" ");
			}
		}).fadeIn(500);
	}

// 切换年份
	var old = $('#old');
	var yearchoose = $('.yearchoose');
	var lastterm = $('#lastterm');
	var nextterm = $('#nextterm');
	var pagenum = $('#pagenum');
	var videonum = ["","2018","2017"];
	var num = 4;

	$(yearchoose).click(function() {
		var year = $(this).attr('year');
		var vdata = getda(year,videodata,videonum);

		turntermdata(vdata.first);
		$(old).attr('year',year);

		if( $(vdata.first).length == 0) {
			$(lastterm).css('background-image','url(image/unchoose.png)');
		}else {
			$(lastterm).css('background-image','url()')
		}
		if( $(vdata.second).length == 0) {
			$(nextterm).css('background-image','url(image/unchoose.png)');
		}else {
			$(nextterm).css('background-image','url()');
		}
	});

	$(lastterm).click(function() {
		var vdata = getda($(old).attr('year'),videodata,videonum);
		turntermdata(vdata.first);
		$(old).attr('term',"last");

		if( $(vdata.first).length != 0) {
			$(lastterm).css('background-color','rgba(188,193,209,.5)');
			if( $(vdata.second).length != 0) {
				$(nextterm).css('background-color','rgb(74,82,166)');
			}
		}
	});

	$(nextterm).click(function() {
		var vdata = getda($(old).attr('year'),videodata,videonum);
		turntermdata(vdata.second);
		$(old).attr('term',"next");

		if( $(vdata.second).length != 0) {
			$(nextterm).css('background-color','rgba(188,193,209,.5)');
			if( $(vdata.first).length != 0) {
				$(lastterm).css('background-color','rgb(74,82,166)');
			}
		}
	});

// 页数轮播切换
	var pagepre = $('#pagepre');
	var pagenex = $('#pagenex');
	var pagenum = $('#pagenum');

	function changePagenumCss() {
		var pnkid = $(pagenum).children();
		for( var i = 0; i < $(pnkid).length; i++) {
			if( i == parseInt($(old).attr('page')) - 1) {
				$(pnkid[i]).css('color','rgb(255,255,255)'); 
			}else{
				$(pnkid[i]).css('color','rgb(121,120,120)');
			}
		}
	}

	$(pagepre).click(function() {
		var vdata = getda($(old).attr('year'),videodata,videonum);
		if( $(old).attr('term') == "last" ) {
			vdata = vdata.first;
		}else if( $(old).attr('term') == "next" ) {
			vdata = vdata.second;
		}

		lunbo($(vdata).length,num,4,-1,$(old),false,4,$(vdata));
		changePagenumCss();
	});

	$(pagenex).click(function() {
		var vdata = getda($(old).attr('year'),videodata,videonum);
		if( $(old).attr('term') == "last" ) {
			vdata = vdata.first;
		}else if( $(old).attr('term') == "next" ) {
			vdata = vdata.second;
		}

		lunbo($(vdata).length,num,4,1,$(old),false,4,$(vdata));
		changePagenumCss();
	});

});