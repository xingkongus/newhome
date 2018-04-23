$(document).ready(function() {
// 加载数据
	var API_URL = "http://xk.leekachung.cn/api/getmesxk";
	var API_URL2 = "http://xk.leekachung.cn/api/getmes1xk";

	$.ajax({
		url:API_URL,
		async:false,
		success : function(res) {
			//成功获取到res，在此可以给变量赋值。
			appdata = res.appdata;
			bannerdata = res.bannerdata;
			tuiwendata = res.tuiwendata;
			designdata = res.designdata;
			photodata = res.photodata;
			mvideodata = res.mvideodata;
		},
		dataType:"json"
	});

	$.ajax({
		url:API_URL2,
		async:false,
		success : function(res) {
			fpdata = res.fpdata;
		},
		dataType:"json"
	});


// banner部分样式

  // 加载默认数据
	var bannershow = $('#bannershow');
	$(bannershow).css('background-image','url(' + bannerdata[0].img + ')');

	var bannerarrow = $('.bannerarrow');
	var bannerpre = $('#bannerpre');
	var bannernex = $('#bannernex');
	var banner = $('.banner');
	// var bannerdots = $('#bannerdots');

 	var _width = parseInt($(banner).css('width'));
 	var _h = parseInt($(bannerarrow).css('height'));
	$(bannerarrow).css('margin-top',300 - _h / 2);
	$(bannernex).css('margin-left',_width - parseInt($(bannernex).css('width')) - 100 );
	// $(bannerdots).css('margin-left',_width/2 - parseInt($(bannerdots).css('width'))/2 );

	$(window).resize(function() {
	 	var _width = parseInt( $(banner).css('width') );
 		var _h = parseInt($(bannerarrow).css('height'));
		$(bannerarrow).css('margin-top',300 - _h / 2);
		$(bannernex).css('margin-left',_width - parseInt($(bannernex).css('width')) - 100 );
		// $(bannerdots).css('margin-left',_width/2 - parseInt($(bannerdots).css('width'))/2 );
	});


// banner轮播
	var bannerlen = bannerdata.length;
	var bannernum = 1;

	$(banner).mouseout(function() {
		autoplay(bannerlen,bannernum,0,1,$(bannershow),false,1,$(bannerdata),2500);
	}).mouseover(function() {
		stopplay($(bannershow));
	});
	$(bannerpre).click(function() {
		lunbo(bannerlen,bannernum,0,-1,$(bannershow),false,1,$(bannerdata));
	});
	$(bannernex).click(function() {
		lunbo(bannerlen,bannernum,0,1,$(bannershow),false,1,$(bannerdata));
	});


// 产品轮播
	var apppre = $('#apps_leftarrow');
	var appnex = $('#apps_rightarrow');
	var app = $('#apps_product');
	var appkid = $(app).children();
	var applen = $(appdata).length;
	var appnum = 3;

  // 加载默认数据
	for( var i = 0; i < appnum; i++) {
		$(appkid[i]).find("div").css('background-image','url(' + appdata[i].img + ')');
		$(appkid[i]).find("p").text(appdata[i].text);
	}

	$(apppre).click(function() {
		lunbo(applen,appnum,0,-1,$(app),false,2,$(appdata));
	});
	$(appnex).click(function() {
		lunbo(applen,appnum,0,1,$(app),false,2,$(appdata));
	});


// 推文轮播
	var actipre = $('#actipre');
	var actinex = $('#actinex');
	var acticle = $('#acticlepart');

	var actlen = $(tuiwendata).length;
	var actnum = 1;

  //样式修改
  	var temph = parseInt($(acticle).find('#acti_img').css('height')) - 50;
	$('.actiarrow').css('margin-top',temph /2 );

  // 加载默认数据
	$(acticle).find("#acti_img").css('background-image','url(' + tuiwendata[0].img + ')');
	$(acticle).find("#text_head").attr("href",tuiwendata[0].href);
	$(acticle).find("#text_con").attr("href",tuiwendata[0].href);
	$(acticle).find("#text_head").text(tuiwendata[0].head);
	$(acticle).find("#text_con").text(tuiwendata[0].content);
	$(acticle).find("#text_time").text(tuiwendata[0].time);
	$(acticle).find("#text_author").text(tuiwendata[0].author);
	$(acticle).find("#tag1").text(tuiwendata[0].tag1);
	$(acticle).find("#tag2").text(tuiwendata[0].tag2);
	$(acticle).find("#tag3").text(tuiwendata[0].tag3);

	$(actipre).click(function() {
		lunbo(actlen,actnum,0,-1,$(acticle),false,5,$(tuiwendata));
	});
	$(actinex).click(function() {
		lunbo(actlen,actnum,0,1,$(acticle),false,5,$(tuiwendata));
	});


// 传媒层
	var design = $('#design');
	var mvideo = $('#video');
	var photograph = $('#photograph');
	var mediacontainer = $('#bigMediaContainer');
	var conshow = $('#conshow');

	$(window).resize(function() {
		if( parseInt($("html").css("width") ) < 600 ){
			var _w = parseInt($("body").css('width'));
			var _h = _w*16/9;
		// }else {
		// 	var _w = document.documentElement.clientWidth;
		// 	var _h = document.documentElement.clientHeight;
		}
		$(mediacontainer).css('width',_w).css('height',_h);
	});
	if( parseInt($("html").css("width") ) < 600 ){
		var _w = parseInt($("body").css('width'));
		var _h = _w*16/9;
	}else {
		var _w = document.documentElement.clientWidth;
		var _h = document.documentElement.clientHeight;
	}
	$(mediacontainer).css('width',_w).css('height',_h);
	$(mediacontainer).click(function() {
		$(mediacontainer).hide(400);
	});

	function mediaData() {
		var nowmedia = $(conshow).attr('nowmedia');
		if( nowmedia == 'design') {
			return designdata;
		}else if( nowmedia == 'photograph' ) {
			return photodata;
		}else if( nowmedia == 'video' ) {
			return mvideodata;
		}
	}

	$('.media_item').click(function() {
		$('.con').remove();

		$(conshow).attr('nowmedia',$(this).attr('id'));
		var data = mediaData();
		flag =  $(this).attr('id') == 'video';
		if(flag) {
			$(conshow).prepend('<iframe class="con video_iframe" src="' + data[0].src + '"></iframe>');	
			
		}else {
			$(conshow).prepend('<div class="con" style="background-image: url(' + data[0].img + '); "></div>');
		}
		$(conshow).find('.introtext').text(data[0].text);		
	
		if( parseInt($("html").css("width") ) < 600 ){
			
		}

		$(mediacontainer).show(300,function() {
			var _h = parseInt($(mediacontainer).css('height'));
			$(conshow).css('margin-top',(_h - 600)/2 );
			$(mediacontainer ).find(".arrow").css('margin-top',(_h - 50)/2 );
			if(flag) {
				var before = $('.con').width();
				$('.con').width($('.con').height()*4/3);
				var d = before - $('.con').width();
				$('.con').css('margin-left',d/2);
			}
		});

	});

  //轮播
	$('#prearrow').click(function(event) {
		event.stopPropagation();
		var data = mediaData();
		var nowmedia = $(conshow).attr('nowmedia');
		if( nowmedia == 'video' ) {
			lunbo(5,1,0,-1,$(conshow),false,7,data);
		}else {
			lunbo(5,1,0,-1,$(conshow),false,8,data);
		}
	});

	$('#nexarrow').click(function(event) {
		event.stopPropagation();
		var data = mediaData();
		var nowmedia = $(conshow).attr('nowmedia');
		if( nowmedia == 'video' ) {
			lunbo(5,1,0,1,$(conshow),false,7,data);
		}else {
			lunbo(5,1,0,1,$(conshow),false,8,data);
		}
	});


// 活动
	var activitycon = $('#activitycon');
	var activitykid = $(activitycon).children();
	var actiIntroImg = [];
	var actiIntroText = [];

	$(activitycon).css('height',parseInt($(activitykid[j]).css('width')) *9/16 );

  // 默认数据
	var j = 0;
	for( var i = 0; i < $(fpdata).length; i++) {
		for( var k = 0; k < $(fpdata[i]).length; k++) {
			if( j < 4 ) {
				$(activitykid[j]).find(".activity_name").text( ((fpdata[i])[k]).name );
				$(activitykid[j]).find(".activity_time").text( ((fpdata[i])[k]).time );
				actiIntroImg.push( ( (fpdata[i])[k] ).img );
				actiIntroText.push( ((fpdata[i])[k]).text );
				j++;
			}else if(j == 4) {
				$(activitykid[j]).css('line-height',$(activitycon).css('height') );
			}
		}
	}

  // 内容补充
	var intro = $('#actiintro');
	$(activitykid).bind('mouseenter',function(event) {
		var itemindex = parseInt( $(this).attr('itemindex') );
		if( itemindex ) {
			itemindex -= 1;
			intro.find('.introcon-img').css('background-image','url(' + actiIntroImg[itemindex] + ')');
			intro.find('.introcon-text').text( actiIntroText[itemindex] );
			$(intro).css('width',parseInt($(this).css('width')) + 50 );
			$(intro).css('margin-left',$(this).offset().left - (parseInt($(intro).css('width')) - parseInt($(this).css('width')))/2 );
			intro.animate({
				opacity: 1
			});
		}else{
			intro.animate({
				opacity: 0
			});
		}
	});
	$(activitykid).bind('mouseleave',function() {
		event.stopPropagation();
		intro.css('opacity',0);
		
	});
	$(activitycon).bind('mouseleave',function() {
		intro.animate({
			opacity: 0
		});
	});


// 关于星空 动画
	var _tempw = parseInt($('.showpart').css('width'));
	var _temph = _tempw * 1.06;
	$('.showpart').css('height',_temph);
	$('.showpart').find('.icon').css('height',_temph);
	$('.showpart').find('.apartment').css('height',_temph);
	$('.showpart').bind('mouseenter',function() {
		if( parseInt( $(this).attr('flag') ) == 1) {
			$(this).animate({
				height: $('.brief').css('height')
			},500);
			$(this).attr('flag',2);
		}
	});
	$('.showpart').bind('mouseleave',function() {
		if( parseInt( $(this).attr('flag') ) == 2) {
			$(this).animate({
					height: _temph
				},800);
			$(this).attr('flag',1);
		}
	});


});
