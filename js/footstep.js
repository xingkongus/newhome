 $(document).ready(function() {
	var API_URL = "http://xk.leekachung.cn/api/getmes1xk";//轮播图数据API接口，目前本地数据模拟。

	$.ajax({
		url:API_URL,
		async:false,
		success : function(res) {
			fpdata = res.fpdata;
		},
		dataType:"json"
	});


// 只显示有数据的年份
	var fplen = $(fpdata).length;
	var fpdatanum = ["","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008",""];
	// var fpdatanum = ["","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008",""];
	fpdatanum = $(fpdatanum).slice(0,fplen+1);
	fpdatanum.push("");
	fpdatanum.push("");

// 加载默认数据
	var showing = $('#showing');
	$(showing).find("#showimg").css('background-image','url(' + ((fpdata[1])[0]).img + ')');
	$(showing).find("p").text(((fpdata[1])[0]).name + " " + ((fpdata[1])[0]).time );
	$(showing).find(".illstra").text(((fpdata[1])[0]).text);

// 年份选择
	var now = $('#now');
	var roll = $('#roll');
	var yearnex = $('#yearnex');
	var yearpre = $('#yearpre');

	var rollkid = $(roll).children();
	var kidlen = $(rollkid).length;
	var end = $(fpdatanum).length - 3;

	function turn(direction) {
		var yearpage = $(roll).attr('yearpage');

		if( yearpage >= 0 && yearpage <= end) {
			var yp = $(roll).attr('yearpage');

			yp = getpage2(direction,yp,end)
		
			for( var i = 1; i <= kidlen; i++) {
				var j = parseInt(i) + parseInt(yp) - 2;
				var y = fpdatanum[j];

				$(rollkid[kidlen - i]).text(y);
				$(rollkid[kidlen - i]).attr('year',y);
			}

			var fpda = getda($(now).attr('year'),fpdata,fpdatanum);
			
			$(showing).fadeOut(500,function() {
				$(showing).find("#showimg").css('background-image','url(' + fpda[0].img + ')');
				$(showing).find("p").text(fpda[0].name + " " + fpda[0].time );
				$(showing).find(".illstra").text(fpda[0].text);
			}).fadeIn(500);
			
			$(roll).attr('yearpage',yp);
		}
	}

	$(yearpre).click(function() {
			// turn(1);
		
	});
	$(yearnex).click(function() {
			// turn(-1);
	});

// 轮播
	var imgpre = $('#imgpre');
	var imgnex = $('#imgnex');
	var num = 1;
	
	$(imgpre).click(function() {
		var fpda = getda($(now).attr('year'),fpdata,fpdatanum);
		var account = fpda.length;
		lunbo(account,num,0,-1,$(showing),false,3,fpda);
	});
	$(imgnex).click(function() {
		var fpda = getda($(now).attr('year'),fpdata,fpdatanum);
		var account = fpda.length;
		lunbo(account,num,0,1,$(showing),false,3,fpda);
	});

});
