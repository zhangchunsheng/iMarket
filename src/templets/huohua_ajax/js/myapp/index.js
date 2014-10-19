/*
 * 首页
 * by yvesyu
*/
//导航下面广告图切换效果
(function($) {
	$.fn.Slider = function(options) {
		var setting = {
			"img"     : "",
			"num"     : "",
			"timeout" : 5000
		};
		var opts = $.extend({},setting, options);
 
		var runIndex = 0;
		var $img = $(this).find(opts.img);
		var $num = $(this).find(opts.num + " li");
		var adWidth = $img.width();
		var timer = null;
		
		var _showImg = function(index) {
			var obj_img = $img.find("img").eq(index);
			if(!obj_img.attr("src") || obj_img.attr("src")==""){
				window.setTimeout(function(){obj_img.attr("src",obj_img.attr("data-url"));},0);
			}
			$img.stop(true, false).animate({opacity : 0.3}, 100, "swing", function(){
				$(this).scrollLeft(adWidth * index).animate({opacity : 1.0}, 200, "swing");
			 }); 
			$num.removeClass("nownav").eq(index).addClass("nownav");
		};
 
		var _auto = function() {
			timer = setTimeout(function() {
				runIndex++;
				if (runIndex >= $img.find("li").length) {
					runIndex = 0;
				}
				_showImg(runIndex);
				_auto();
			},opts.timeout);
		};
 
		var _stop = function() {
			clearTimeout(timer);
		};
 
		return this.each(function() {
			_auto();
			$img.hover(function() {
				_stop();
			},function() {
				_auto();
			});
 
			$num.hover(function() {
				_stop();
				runIndex = $num.index(this);
				_showImg(runIndex);
			},function() {
				_auto();
			}).eq(0).hover().addClass("nownav");
		});
	};
})(jQuery);

/**
 * 导航下面广告图列表
 */
function getFlashAdvs(){
	var func = showFlashAdvs;
	var mf = MANIFEST.index_cms_advs;
	//从缓存中获取显示
	if(UI.getlocaldata(func, mf)){
		return;
	}
	$.getJSON(g_action + "qrytopicbycms_web.php",
			{
				"r" : Math.random()
			},
			function(json){
				if(json && json.result==0){
					if(json.info.value && json.info.value.length){
						//保存并显示
						UI.savelocaldata(func, mf, json);
					}
				}
			});
}
function showFlashAdvs(json){
	var imgBuffer = [], navBuffer = [], lmidArr = [UI.lmid.index_adv1,UI.lmid.index_adv2,UI.lmid.index_adv3,UI.lmid.index_adv4];
	var results = json.info.value;
	var len = results.length;
	for(var i = 0;i<len;i++){
		var item = results[i];
		var lmid = lmidArr[i];
		if(!lmid){
			lmid = 0;
		}
		var tempUrl = "index.jsp";//type=soft时候去详情页，type=topic时候去专题页面
		if(item.type=="soft"){
			tempUrl = "appdetail.jsp?appid="+item.appid+"&icfa="+item.icfa+"&lmid="+lmid+gf_param;
		}else if(item.type=="topic"){
			tempUrl = "topicdetail.jsp?topicid="+item.topicid+"&icfa="+item.icfa+"&lmid="+lmid+gf_param;
		}else if(item.type=="weblink"){
			tempUrl = item.url + "\" target=\"_blank";
		}
		
		if(item.picsrc.indexOf(".swf") != -1){
			imgBuffer.push("<li><embed src=\""+item.picsrc+"\" quality=\"high\" wmode=\"transparent\" pluginspage=\"http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash\" type=\"application/x-shockwave-flash\" width=\"630\" height=\"200\"></embed></li>");
		}else{
			var img_attr = "data-url=\""+item.picsrc+"\"";
			if(i == 0){
				img_attr = "src=\""+item.picsrc+"\"";
			}
			imgBuffer.push("<li><a href=\""+tempUrl+"\"><img "+img_attr+" width=\"630\" height=\"200\" alt=\"\" /></a></li>");
		}
		
		var curnav = "";
		if(i == 0){
			curnav = " class=\"nownav\"";
		}
		navBuffer.push("<li"+curnav+"><a href=\"javascript:void(0);\">"+(i+1)+"</a></li>");
	}
	$("ul.flash-img").html(imgBuffer.join(""));
	$("ul.flash-nav").html(navBuffer.join(""));
	//执行导航下面广告图动画
	$("#flash-wrap").Slider({
		"img"     : ".flash-content",
		"num"     : ".flash-nav",
		"timeout" : 5000
	});
}

/**
 * 装机必备
 */
var g_nesseary_animate = false;
var g_nesseary_pageno = 0;
var g_nesseary_pagesize = 7;
var g_nesseary_pagecount = 1;
var g_nesseary_lmid = 0;
function getAppNesseary(vtype){
	$("#necessary_tab>li").each(function(idx){
		if(idx == vtype){
			$(this).attr("class", "nownav");
		}else{
			$(this).attr("class", "");
		}
	});
	var func = showAppNesseary;
	var mf = null;
	switch(vtype){
	case 0://装机必备
		g_nesseary_lmid = UI.lmid.index_appnece;
		mf = MANIFEST.index_app_nesseary;
		break;
	case 1://男生必备
		g_nesseary_lmid = UI.lmid.index_mannece;
		mf = MANIFEST.index_man_nesseary;
		break;
	case 2://女生必备
		g_nesseary_lmid = UI.lmid.index_womannece;
		mf = MANIFEST.index_woman_nesseary;
		break;
	default://装机必备
		g_nesseary_lmid = UI.lmid.index_appnece;
		mf = MANIFEST.index_app_nesseary;
	}
	//从缓存中获取显示
	if(UI.getlocaldata(func, mf)){
		return;
	}
	$.getJSON(g_action + "qrynesseary_web.php",
			{
				"type" : vtype,
				"r" : Math.random()
			},
			function(json){			
				if(json && json.result==0){
					if(json.info.value.length > 0){
						//保存并显示
						UI.savelocaldata(func, mf, json);
					}
				}else{
					$("#app_nesseary ul").html(UI.errorequest("li", json.msg));
				}
			});//end of getJSON
}
function showAppNesseary(json){
	var lmid = g_nesseary_lmid;
	var obj_wrap = $("#app_nesseary");
	obj_wrap.find(">div.show-app").scrollLeft(0);
	obj_wrap.find("ul").html(UI.buildAppList(json.info.value, lmid));
	g_nesseary_pageno = 0;
	
	g_nesseary_pagecount = Math.ceil(obj_wrap.find("ul li").length/g_nesseary_pagesize);
	obj_wrap.find(">a.prev").addClass("prevdis");
	if(g_nesseary_pagecount > 1){
		obj_wrap.find(">a.next").removeClass("nextdis");
	}
}
//必备分页效果
function pageAppNesseary(pk){
	var obj_wrap = $("#app_nesseary");
	if(pk == "prev"){
		if(g_nesseary_pageno<=0 || g_nesseary_animate){
			return;
		}
		g_nesseary_pageno--;
		g_nesseary_animate = true;
		if(g_nesseary_pageno <= 0){
			obj_wrap.find(">a.prev").addClass("prevdis");
		}
		obj_wrap.find(">a.next").removeClass("nextdis");
	}else if(pk == "next"){
		if(g_nesseary_pageno>=(g_nesseary_pagecount-1) || g_nesseary_animate){
			return;
		}
		g_nesseary_pageno++;
		g_nesseary_animate = true;
		obj_wrap.find(">a.prev").removeClass("prevdis");
		if(g_nesseary_pageno >= g_nesseary_pagecount-1){
			obj_wrap.find(">a.next").addClass("nextdis");
		}
	}
	var i = g_nesseary_pageno * g_nesseary_pagesize;
	var len = i + g_nesseary_pagesize;
	while(i<len){
		var obj_icon = obj_wrap.find("ul li").eq(i).find("img").eq(0);
		if(!obj_icon.attr("src") || obj_icon.attr("src")=="" || obj_icon.attr("src").indexOf("/images/myapp/default-icon.jpg")!=-1){
			obj_icon.attr("src",obj_icon.attr("data-url"));
		}
		i++;
	}
	obj_wrap.find(">div.show-app").stop(true, false).animate({
		scrollLeft : 805 * g_nesseary_pageno
	}, 500, "linear", function(){
		g_nesseary_animate = false;
	});
}

/**
 * 每日精选
 */
function getDailyChosen(){
	var func = showDailyChosen;
	var mf = MANIFEST.index_daily_chosen;
	//从缓存中获取显示
	/*
	if(UI.getlocaldata(func, mf)){
		return;
	}
	*/
	$.getJSON(g_action + "dayrecommend_web.php",
			{
				"pageNo" : 1,
				"pageSize" : 15,
				"r" : Math.random()
			},
			function(json){
				if(json && json.result==0){
					if(json.info.exclusivelist.length>0 || json.info.todayList.length>0){
						//保存并显示
						UI.savelocaldata(func, mf, json);
					}
				}else{
					$("#daily_chosen").html(UI.errorequest("li", json.msg));
				}
			});//end of getJSON
}
function showDailyChosen(json){
	var lmid1 = UI.lmid.index_firstmarket;
	var lmid2 = UI.lmid.index_dailychosen;
	var shtml = [];
	shtml.push(UI.buildAppList(json.info.exclusivelist, lmid1));
	shtml.push(UI.buildAppList(json.info.todayList, lmid2));
	var obj = $("#daily_chosen");
	obj.html(shtml.join(""));
	obj.find("img.img_scrolloading_"+lmid1).scrolloading();
	obj.find("img.img_scrolloading_"+lmid2).scrolloading();
}

/**
 * 排行榜
 */
function tabAppRank(cid){
	if(typeof(cid) == "undefined"){
		var cids = [-1, 120];
		cid = cids[Math.round(parseInt(10*Math.random())/10)];
	}
	var obj = $("#appRankList").siblings("ul.rank-ul").children("li");
	obj.removeClass("rank-now");
	if(cid == -1){
		obj.eq(0).addClass("rank-now");
	}else{
		obj.eq(1).addClass("rank-now");
	}
	getAppRankList(cid);
}
function getAppRankList(cid){
	var func = showAppRankList;
	var mf = MANIFEST.index_app_rank;
	var cmstype = 415;
	if(cid == 120){
		mf = MANIFEST.index_game_rank;
		cmstype = 416;
	}
	//从缓存中获取显示
	if(UI.getlocaldata(func, mf)){
		return;
	}
	$.getJSON(g_action + "qryranking_web.php",
			{
				"ranktype" : 0,
				"cid" : cid,
				"cmstype" : cmstype,
				"icontype" : 60,
				"pageNo" : 1,
				"pageSize" : 12,
				"r" : Math.random()
			},
			function(json){			
				if(json && json.result==0){
					if(json.info.value.length > 0){
						//保存并显示
						UI.savelocaldata(func, mf, json);
					}
				}else{
					$("#appRankList").html(UI.errorequest("li", json.msg));
				}
			});//end of getJSON
}
function showAppRankList(json){
	$("#appRankList").html(UI.buildAppRank(json.info.value, UI.lmid.index_apprank));
	$("#appRankList li").each(function(){
		$(this).mouseover(function(){
			$("#appRankList li.hover").removeClass("hover");
			var obj_icon = $(this).find("img").eq(0);
			if(!obj_icon.attr("src") || obj_icon.attr("src")=="" || obj_icon.attr("src").indexOf("/images/myapp/default-icon.jpg")!=-1){
				obj_icon.attr("src",obj_icon.attr("data-url"));
			}
			$(this).addClass("hover");
		});
	});
}

/**
 * 热门分类
 */
function getHotCategory(){
	/*
	var func = showHotCategory;
	var mf = MANIFEST.index_hot_category;
	//从缓存中获取显示
	if(UI.getlocaldata(func, mf)){
		return;
	}
	*/
	$.getJSON(g_action + "qryhotcate_web.php",
			{
				"hotcatenum" : 6,
				"icontype" : 48,
				"pagesize" : 5,
				"r" : Math.random()
			},
			function(json){			
				if(json && json.result==0){
					/*
					if(json.info.value.length>0 && json.info.allcategorys.length>0){
						//保存并显示
						UI.savelocaldata(func, mf, json);
					}
					*/
					showHotCategory(json);
				}else{
					$("#hot_category").html(UI.errorequest("p", json.msg));
				}
			});//end of getJSON
}
function showHotCategory(json){
	var lmid = UI.lmid.index_hotcate;
	var results = json.info.value;
	var len = results.length;
	var shtml = [];
	for(var i=0; i<len; i++){
		var item = results[i];
		var etyle = item.eletype;
		if(i!=0 && etyle=="text"){
			shtml.push("	</ul>");
			shtml.push("</article>");
		}
		if(etyle == "text"){
			shtml.push("<article>");
			var gocate = "app.jsp";
			if(item.cid == 120){
				gocate = "game.jsp";
			}
			gocate += "?cid="+item.cid+"&cname="+encodeURIComponent(item.cname)+"&lmid="+UI.lmid.index_morecate+gf_param;
			shtml.push("	<h2><a href=\""+gocate+"\">"+UI.htmlEncode(item.cname)+"</a></h2>");
			shtml.push("	<ul class=\"mod-app-item mod-app-category\">");
		}
		if(etyle == "soft"){
			shtml.push("		<li onmouseover=\"$(this).addClass('hover');\" onmouseout=\"$(this).removeClass('hover');\">");
			shtml.push("			<div class=\"app-img\">");
			shtml.push("				<a href=\"appdetail.jsp?appid="+item.appid+"&icfa="+item.icfa+"&lmid="+lmid+gf_param+"\" title=\""+UI.htmlAttributeEncode(item.softname)+"\">");
			shtml.push("					<img class=\"img_scrolloading_"+lmid+"\" src=\""+g_respath+"/images/myapp/default-icon.jpg\" data-url=\""+item.icon+"\" width=\"48\" height=\"48\" itemprop=\"photo\" alt=\""+UI.htmlAttributeEncode(item.softname)+"\" />");
			//shtml.push("					<div class=\"shadow\"></div>");
			shtml.push("				</a>");
			shtml.push("			</div>");
			shtml.push("			<p class=\"app-name\"><a href=\"appdetail.jsp?appid="+item.appid+"&icfa="+item.icfa+"&lmid="+lmid+gf_param+"\">"+UI.htmlEncode(item.softname)+"</a></p>");
			shtml.push("			<p class=\"category-star\">"+UI.buildAppStar(item.starnumber)+"</p>");
			shtml.push("			<p class=\"grey\">"+item.downcount+"下载</p>");
			shtml.push("		</li>");
		}
		if(i == len-1){
			shtml.push("	</ul>");
			shtml.push("</article>");
		}
	}
	$("#hot_category").html(shtml.join("")).find("img.img_scrolloading_"+lmid).scrolloading();
	//全部分类
	shtml.clear();
	var cates = json.info.allcategorys;
	var cath = cates.length;
	for(var c=0; c<cath; c++){
		var cate = cates[c];
		var tocate = "app.jsp";
		if(cate.categoryid == 120){
			tocate = "game.jsp";
		}
		tocate += "?cid="+cate.categoryid+"&cname="+encodeURIComponent(cate.categoryname)+"&lmid="+UI.lmid.index_morecate+gf_param;
		shtml.push("<a href=\""+tocate+"\">"+UI.htmlEncode(cate.categoryname)+"</a>");
	}
	$("div.all-category").html(shtml.join(""));
}
function handAnimate(){
	if(!($.browser.msie && ($.browser.version=="6.0") && !$.support.style)){
        $("aside.appcenter-product div.hand").animate({right:"140"}, "slow", "linear", function(){
			var obj = $(this).siblings("a.app-submit");
			obj.addClass("app-submit-anni");
        	window.setTimeout(function(){
        		obj.removeClass("app-submit-anni");
            }, 1000);
        });
    }
}
//一键收听
function dofollowmicro(){
	if(!g_logined){
		openLogin();
		return;
	}
	$.getJSON(g_action + "followmicroblog_web",
			{
				"r" : Math.random()
			},
			function(json){			
				if(json && json.result==0){
					UI.popwinToast("成功收听应用宝官方微博！");
				}else{
					var oid = "#message_info";
					$(oid).find("div.line1").html(json.msg && json.msg.length ? json.msg : "系统繁忙！");
					UI.popwinMask(1);
					UI.popwinWrap(oid);
				}
			});
}
(function(){
	if(gf_param.indexOf("970035") == -1){
		if(!($.browser.msie && ($.browser.version=="6.0") && !$.support.style)){
			$("#qrcodefloatwin").show();
		}
	}
})();