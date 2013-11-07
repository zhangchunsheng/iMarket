/*
 * 公共模块
 * by yvesyu
*/
//用做过滤直接放到正则表达式中的
String.prototype.escRegexp = function(){
	return this.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function(a,b){ return "\\"+a; });
};
//清空数组
Array.prototype.clear = function(){
	this.splice(0, this.length);
};
var UI = {};
//栏目id
UI.lmid = {"index_adv1":2001,
		   "index_adv2":2002,
		   "index_adv3":2003,
		   "index_adv4":2004,
		   "index_baodown":2015,
		   "index_baohddown":2016,
		   "index_appnece":2017,
		   "index_mannece":2018,
		   "index_womannece":2019,
		   "index_dailychosen":2020,
		   "index_firstmarket":2021,
		   "index_apprank":2023,
		   "index_hotcate":2024,
		   "index_morecate":2025,
		   "index_appwall":2026,
		   "appwall":2026,
		   "app_recomm":2031,
		   "app_hot":2032,
		   "app_new":2033,
		   "game_recomm":2034,
		   "game_hot":2035,
		   "game_new":2036,
		   "topic_advs":2037,
		   "topic_hot":2038,
		   "topic_new":2039,
		   "topicdetail":2040,
		   "user_friendplay":2041,
		   "user_myfavorite":2042,
		   "user_myshare":2043,
		   "user_guesslike":2044,
		   "appdetail_relate":2045,
		   "appdetail_otherver":2046};
//设置hash
UI.puthash = function(hash) {
	window.location.hash = encodeURIComponent(hash);
};
//获取hash
UI.gethash = function() {
	var hash = window.location.hash.replace(/^#/, "");
	return $.trim(decodeURIComponent(hash));
};
//解析hash参数
UI.gethashparam = function(name) {
	var hash = UI.gethash();
	if(hash == ""){
		return null;
	}
	if(hash.indexOf(name) != -1){
		var param = hash.split("&");
		var len = param.length;
		for(var i=0; i<len; i++){
			var item = param[i].split("=");
			if(item[0]==name && item.length>1){
				return item[1];
			}
		}
	}
	return null;
};
UI.gethashparam = function(name){
	var hash = UI.gethash();
	if(hash == ""){
		return null;
	}
	hash = "?" + hash;
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	//var r = window.location.search.substr(1).match(reg);
	var r = hash.substr(1).match(reg);
	if (r != null){
		var arg = r[2];
		if(arg != ""){
			return arg;
		}
	}
	return null;
};
//获取字串的长度,中文算两个字节
UI.getStrLength = function(str){
	var oLength = str.length;
    var l = 0;
    for(var i = 0; i < oLength; i++){
        if(str.substring(i, i + 1).match(/[\u4e00-\u9fa5]/)){
			l += 2;
        }else{
        	l += 1;
        }
    }
    return l;
};
//html正文编码：对需要出现在HTML正文里(除了HTML属性外)的不信任输入进行编码
UI.htmlEncode = function(str){
	str = str || "";
	str = str.toString();
	str = str.replace(/&/g,"&amp;");
	str = str.replace(/>/g,"&gt;");
	str = str.replace(/</g,"&lt;");
	str = str.replace(/"/g,"&quot;");
	str = str.replace(/'/g,"&#39;");
	return str;
};
/*
html属性编码：对需要出现在HTML属性里的不信任输入进行编码
注意:
(1)该函数不适用于属性为一个URL地址的编码.这些标记包括:a/img/frame/iframe/script/xml/embed/object...
属性包括:href/src/lowsrc/dynsrc/background/...
(2)该函数不适用于属性名为 style="[Un-trusted input]" 的编码
*/
UI.htmlAttributeEncode = function(str){
	str = str || "";
	str = str.toString();
	str = str.replace(/&/g,"&amp;");
	str = str.replace(/>/g,"&gt;");
	str = str.replace(/</g,"&lt;");
	str = str.replace(/"/g,"&quot;");
	str = str.replace(/'/g,"&#39;");
	str = str.replace(/=/g,"&#61;");
	str = str.replace(/`/g,"&#96;");
	return str;
};
//单引号也进行编码
UI.encodeuri = function(str){
	str = str || "";
	str = str.toString();
	str = window.encodeURIComponent(str);
	str = str.replace(/'/g, "%27");
	return str;
};
UI.decodeuri = function(str){
	str = str || "";
	str = str.toString();
	str = window.decodeURIComponent(str);
	return str;
};
UI.loadstyles = function(url){
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = url;
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(link);
};
//获取缓存数据并判断，如果有效就显示缓存数据
UI.getlocaldata = function(func, mf){
	var flag = false;
	var localdata = $.fn.getLocalStorage(mf.key);
	if(MANIFEST.swit && localdata){
		var x = localdata.indexOf("|||");
		if(x != -1){
			var arr = localdata.substring(0, x).split("|");
			if(arr[0]==mf.freq && arr[1]==mf.ver){
				//读缓存显示ui
				func(window.JSON.parse(localdata.substr(x+3)));
				flag = true;
			}
		}
	}
	return flag;
};
//保存缓存数据并显示对应的ui
UI.savelocaldata = function(func, mf, json){
	//缓存
	if(MANIFEST.swit){
		$.fn.setLocalStorage(mf.key, mf.freq + "|" + mf.ver + "|||" + window.JSON.stringify(json));
	}
	//显示ui
	func(json);
};
/* 处理搜索回车事件 */
UI.onSearchKeyDown = function(e){
    var kc = window.event ? e.keyCode:e.which;
    if(kc == 13){
    	UI.searchapp();
        return false;
    }
};
//搜索app
UI.searchapp = function(){
	var keyword = document.getElementById("keyword").value;
	if(keyword.length > 0){
		window.location.href = g_action+"searchresult.jsp?keyword="+encodeURIComponent(keyword)+gf_param;
	}
};
//生成分页
//pageNo:整型，当前页，从1开始索引
//pageIndex:整型，翻页索引
//pageCount:整型，总页数
//method:字符串，点击页码的时候处理方法
UI.buildPageBar = function(args, method){
	var pageNo = args.pageNo;
	var pageIndex = args.pageIndex;
	var pageCount = args.pageCount;
	if(pageCount <= 1){
		return "";
	}
	var strBuffer = [];
	pageNo = parseInt(pageNo);//强制转换成整型
	pageCount = parseInt(pageCount);//强制转换成整型
	var itemCount = 3; //前后显示页码个数		
	if (pageNo > 1) {
		strBuffer.push("<a href=\"javascript:void(0)\" onclick=\"" + method + "(" + (pageNo - 1) + ");\"><span class=\"hack\">上一页</span></a>");
	}
	if (pageCount <= (2 * itemCount)) {
		for (var i = 1; i <= pageCount; i++) {
			if (i != pageNo) {
				strBuffer.push("<a href=\"javascript:void(0)\" onclick=\"" + method + "(" + i + ");\"><span>" + i + "</span></a>");
			}else {
				strBuffer.push("<a class=\"nowpage\" href=\"javascript:void(0)\" onclick=\"" + method + "(" + i + ");\"><span>" + i + "</span></a>");
			}
		}
	}else if ((pageNo - itemCount) <= 0) {
		for (var i = 1; i <= (2 * itemCount); i++) {
			if (i != pageNo) {
				strBuffer.push("<a href=\"javascript:void(0)\" onclick=\"" + method + "(" + i + ");\"><span>" + i + "</span></a>");
			}else {
				strBuffer.push("<a class=\"nowpage\" href=\"javascript:void(0)\" onclick=\"" + method + "(" + i + ");\"><span>" + i + "</span></a>");
			}
		}
		strBuffer.push("<a href=\"javascript:void(0)\" onclick=\"" + method + "(" + (2 * itemCount + 1) + ");\"><span>…</span></a>");
	}else if ((pageCount - pageNo) <= itemCount) {
		strBuffer.push("<a href=\"javascript:void(0)\" onclick=\"" + method + "(" + (pageCount - 2 * itemCount) + ");\"><span>…</span></a>");
		for (var i = (pageCount - 2 * itemCount + 1); i <= pageCount; i++) {
			if (i != pageNo) {
				strBuffer.push("<a href=\"javascript:void(0)\" onclick=\"" + method + "(" + i + ");\"><span>" + i + "</span></a>");
			}else {
				strBuffer.push("<a class=\"nowpage\" href=\"javascript:void(0)\" onclick=\"" + method + "(" + i + ");\"><span>" + i + "</span></a>");
			}
		}
	}else {
		strBuffer.push("<a href=\"javascript:void(0)\" onclick=\"" + method + "(" + (pageNo - itemCount - 1) + ");\"><span>…</span></a>");
		for (var i = (pageNo - itemCount); i <= (pageNo + itemCount); i++) {
			if (i != pageNo) {
				strBuffer.push("<a href=\"javascript:void(0)\" onclick=\"" + method + "(" + i + ");\"><span>" + i + "</span></a>");
			}else {
				strBuffer.push("<a class=\"nowpage\" href=\"javascript:void(0)\" onclick=\"" + method + "(" + i + ");\"><span>" + i + "</span></a>");
			}
		}
		strBuffer.push("<a href=\"javascript:void(0)\" onclick=\"" + method + "(" + (pageNo + itemCount + 1) + ");\"><span>…</span></a>");
	}
	if (pageNo < pageCount) {
		strBuffer.push("<a href=\"javascript:void(0)\" onclick=\"" + method + "(" + (pageNo + 1) + ", " + pageIndex + ");\"><span class=\"hack\">下一页</span></a>");
	}    
	return strBuffer.join("");
};
//应用评分
UI.buildAppStar = function(num){
	return "<span class=\"star stargrey\"><span class=\"star starlight\" style=\"width:"+num+"%\" itemprop=\"rating\">"+num+"</span></span>";
};
//固件版本
UI.firmwareSupport = function(str){
	var ver = "1.5";
	if(str && str.length>0){
		ver = str.replace(/android/g, "");
	}
	return ver + "及以上";
};
//ajax获取数据异常
UI.errorequest = function(tag, msg, sty){
	if(!sty){
		sty = "padding:20px 0 20px 0;";
	}
	return "<"+tag+" style=\""+sty+"\">"+(msg && msg.length ? msg : "系统繁忙！")+"</"+tag+">";
}
//必备、精选应用
UI.buildAppList = function(data, lmid){
	var shtml = [];
	var len = data.length;
	var n = 0;
	for(var i=0; i<len; i++){
		var item = data[i];
		if((lmid==UI.lmid.index_appnece || lmid==UI.lmid.index_mannece || lmid==UI.lmid.index_womannece) && item.eletype=="text"){
			continue;
		}
		shtml.push("<li onmouseover=\"$(this).addClass('hover');\" onmouseout=\"$(this).removeClass('hover');\">");
		shtml.push("	<div class=\"app-img\">");
		var img_attr = "src=\""+g_respath+"/images/myapp/default-icon.jpg\" data-url=\""+item.icon+"\"";
		if((lmid==UI.lmid.index_appnece || lmid==UI.lmid.index_mannece || lmid==UI.lmid.index_womannece) && n++<7){
			img_attr = "src=\""+item.icon+"\"";
		}
		var lanmu = lmid;
		if(item.isnewdaily && item.isnewdaily=="true"){
			lanmu = 1032;
		}
		shtml.push("		<a href=\""+g_action+"appdetail.jsp?appid="+item.appid+"&icfa="+item.icfa+"&lmid="+lanmu+gf_param+"\" title=\""+UI.htmlAttributeEncode(item.softname)+"\">");
		if(lmid == UI.lmid.index_firstmarket){
			shtml.push("			<div class=\"first\"></div>");
		}
		shtml.push("			<img class=\"img_scrolloading_"+lmid+"\" "+img_attr+" width=\"72\" height=\"72\" alt=\""+UI.htmlAttributeEncode(item.softname)+"\" />");
		//shtml.push("			<div class=\"shadow\"></div>");
		shtml.push("		</a>");
		shtml.push("	</div>");
		shtml.push("	<p class=\"app-name\"><a href=\""+g_action+"appdetail.jsp?appid="+item.appid+"&icfa="+item.icfa+"&lmid="+lanmu+gf_param+"\">"+UI.htmlEncode(item.softname)+"</a></p>");
		shtml.push("	<p>"+UI.buildAppStar(item.starnumber)+"</p>");
		shtml.push("</li>");
	}
	return shtml.join("");
};
//应用排行榜
UI.buildAppRank = function(data, lmid){
	var shtml = [];
	var len = data.length;
	for(var i=0; i<len; i++){
		var item = data[i];
		var hover = "", num = "", two = "";
		switch(i){
		case 0:
			hover = " class=\"hover\"";
			num = " class=\"first\"";
			break;
		case 1:
			num = " class=\"second\"";
			break;
		case 2:
			num = " class=\"third\"";
			break;
		default:
			num = "";
		}
		if(i >= 9){
			two = " class=\"two\"";
		}
		shtml.push("<li"+hover+">");
		shtml.push("	<div class=\"app-rank-normal\">");
		shtml.push("		<div class=\"rank-number\"><s"+num+">r</s><span"+two+">"+(i+1)+"</span></div>");
		shtml.push("		<p>"+UI.htmlEncode(item.softname)+"</p>");
		shtml.push("		<div class=\"rank-star\">"+UI.buildAppStar(item.starnumber)+"</div>");
		shtml.push("	</div>");
		shtml.push("	<div class=\"app-rank-hover\">");
		shtml.push("		<div class=\"app-img\">");
		var img_attr = "src=\""+g_respath+"/images/myapp/default-icon.jpg\" data-url=\""+item.icon+"\"";
		if(i == 0){
			img_attr = "src=\""+item.icon+"\"";
		}
		shtml.push("			<a href=\""+g_action+"appdetail.jsp?appid="+item.appid+"&icfa="+item.icfa+"&lmid="+lmid+gf_param+"\" title=\""+UI.htmlAttributeEncode(item.softname)+"\">");
		shtml.push("				<img "+img_attr+" width=\"60\" height=\"60\" alt=\""+UI.htmlAttributeEncode(item.softname)+"\" />");
		//shtml.push("				<div class=\"shadow\"></div>");
		shtml.push("			</a>");
		shtml.push("		</div>");
		shtml.push("		<p><a href=\""+g_action+"appdetail.jsp?appid="+item.appid+"&icfa="+item.icfa+"&lmid="+lmid+gf_param+"\">"+UI.htmlEncode(item.softname)+"</a></p>");
		shtml.push("		<p class=\"grey\">"+item.downcount+"下载</p>");
		shtml.push("		<div class=\"free-download\">");
		//shtml.push("			<a href=\""+g_action+"down.jsp?appid="+item.appid+"&pkgid="+item.pkgid+"&icfa="+(item.icfa?item.icfa:-1)+"&lmid="+lmid+gf_param+"\" onclick=\"_gaq.push(['_trackPageview', '/virtual/insite/downapp/"+lmid+"/list/"+item.appid+"']);pingHotag('downapp."+lmid+".list."+item.appid+"');\"><span>免费下载</span></a>");
		shtml.push("			<a href=\"javascript:void(0);\" onclick=\"qqapp_dl_apk(this);_gaq.push(['_trackEvent', 'list', 'download - easy', '"+item.appid+"']);pingHotag('list.download.easy."+item.appid+"');\" ex_url=\""+g_hostpath+"/android/down.jsp?appid="+item.appid+"&pkgid="+item.pkgid+"&type=5&icfa="+(item.icfa?item.icfa:-1)+"&lmid="+lmid+gf_param+"\" asistanturlid=\"990428\" appname=\""+UI.htmlAttributeEncode(item.softname)+"\" title=\"使用腾讯手机管家(PC版)一键安装到手机\"><span>一键安装</span></a>");
		shtml.push("		</div>");
		shtml.push("	</div>");
		shtml.push("</li>");
	}
	return shtml.join("");
};
//应用列表，带内容介绍的
UI.buildAppContent = function(data, lmid, topicid){
	var topic = "";
	if(topicid){
		topic = "&topicid="+topicid;
	}
	var shtml = [];
	var len = data.length;
	for(var i=0; i<len; i++){
		var item = data[i];
		shtml.push("<li onmouseover=\"$(this).addClass('hover');$(this).find('>div').find('>p').eq(0).addClass('stargreybg');\" onmouseout=\"$(this).removeClass('hover');$(this).find('>div').find('>p').eq(0).removeClass('stargreybg');\">");
		shtml.push("	<div class=\"app-rank-hover\">");
		shtml.push("		<div class=\"app-img\">");
		shtml.push("			<a href=\""+g_action+"appdetail.jsp?appid="+item.appid+"&lmid="+lmid+topic+gf_param+"\" title=\""+UI.htmlAttributeEncode(item.softname)+"\">");
		shtml.push("				<img class=\"img_scrolloading_"+lmid+"\" src=\""+g_respath+"/images/myapp/default-icon.jpg\" data-url=\""+item.icon+"\" width=\"72\" height=\"72\" alt=\""+UI.htmlAttributeEncode(item.softname)+"\">");
		//shtml.push("				<div class=\"shadow\"></div>");
		shtml.push("			</a>");
		shtml.push("		</div>");
		shtml.push("		<p class=\"app-name\"><a href=\""+g_action+"appdetail.jsp?appid="+item.appid+"&lmid="+lmid+topic+gf_param+"\">"+UI.htmlEncode(item.softname)+"</a>"+UI.buildAppStar(item.starnumber)+"</p>");
		shtml.push("		<p class=\"app-introduce\">"+UI.htmlEncode(item.softdesc)+"</p>");
		shtml.push("		<p class=\"grey\">发布时间："+item.publishtime+"     <span>支持固件："+UI.firmwareSupport(item.sdkver)+"</span></p>");
		shtml.push("		<div class=\"free-download\">");
		//shtml.push("			<a href=\""+g_action+"down.jsp?appid="+item.appid+"&pkgid="+item.pkgid+"&icfa="+(item.icfa?item.icfa:-1)+"&lmid="+lmid+topic+gf_param+"\" onclick=\"_gaq.push(['_trackPageview', '/virtual/insite/downapp/"+lmid+"/list/"+item.appid+"']);pingHotag('downapp."+lmid+".list."+item.appid+"');\"><span>免费下载</span></a>");
		shtml.push("			<a href=\"javascript:void(0);\" onclick=\"qqapp_dl_apk(this);_gaq.push(['_trackEvent', 'list', 'download - easy', '"+item.appid+"']);pingHotag('list.download.easy."+item.appid+"');\" ex_url=\""+g_hostpath+"/android/down.jsp?appid="+item.appid+"&pkgid="+item.pkgid+"&type=5&icfa="+(item.icfa?item.icfa:-1)+"&lmid="+lmid+topic+gf_param+"\" asistanturlid=\"990428\" appname=\""+UI.htmlAttributeEncode(item.softname)+"\" title=\"使用腾讯手机管家(PC版)一键安装到手机\"><span>一键安装</span></a>");
		shtml.push("		</div>");
		shtml.push("	</div>");
		shtml.push("</li>");
	}
	return shtml.join("");
};
//进入个人中心
UI.goUserCenter = function(url){
	if(g_logined){
		window.location.href = url;
	}else{
		openLogin(url);
	}
};
//toast
UI.popwinToast = function(txt){
	var obj = $("#message_toast");
	if(obj.length > 0){
		var client_height = $(window).height();
		obj.find(">span").html(txt);
		obj.css("filter", "alpha(opacity=0)");
		obj.css("opacity", "0");
		obj.css("top", ($(document).scrollTop() + client_height/2) + "px");
		obj.css("left", "50%");
		obj.css("position", "absolute");
		obj.css("z-index", "1000");
		obj.css("margin-top", -obj.height()/2 + "px");
		obj.css("margin-left", -obj.width()/2 + "px");
		obj.css("display", "block");
		obj.fadeTo("slow", 1, function(){
			window.setTimeout(function(){
				obj.fadeTo("slow", 0, function(){
					obj.css("display", "none");
				});
			}, 2000);
		});
	}
};
//弹框
UI.popwinWrap = function(oid, func){
	var obj = $(oid);
	if(obj.length > 0){
		if(obj.css("display") == "block"){
			obj.fadeTo("fast", 0, function(){
				obj.css("display", "none");
				if(func){
					func();
				}
			});
		}else{
			var client_height = $(window).height();
			obj.css("filter", "alpha(opacity=0)");
			obj.css("opacity", "0");
			obj.css("top", ($(document).scrollTop() + client_height/2) + "px");
			obj.css("left", "50%");
			obj.css("position", "absolute");
			obj.css("z-index", "1000");
			obj.css("margin-top", -obj.height()/2 + "px");
			obj.css("margin-left", -obj.width()/2 + "px");
			obj.css("display", "block");
			obj.fadeTo("fast", 1);
		}
	}
};
//弹框遮罩
UI.popwinMask = function(v){
	if($("#popwin_mask").length == 0){
		$("body").append("<div id=\"popwin_mask\"></div>");
	}
	var obj = $("#popwin_mask");
	if(obj.length > 0){
		if(v == 0){
			obj.hide();
		}else{
			var scroll_height = document.body.scrollHeight;
			var client_height = $(window).height();
			obj.css("width", "100%");
			obj.css("height", (scroll_height>client_height ? scroll_height:client_height) + "px");
			obj.css("top", "0");
			obj.css("left", "0");
			obj.css("position", "absolute");
			obj.css("background-color", "#000");
			obj.css("filter", "alpha(opacity=50)");
			obj.css("opacity", "0.5");
			obj.css("z-index", "999");
			obj.show();
		}
	}
};
//登录模块start
window.document.domain = window.location.hostname.split(".").slice(-2).join(".");
function ptlogin2_onResize(width, height){	
	var login_wnd = document.getElementById("login_wrap");
	if(login_wnd){
		login_wnd.style.visibility = "hidden";
		login_wnd.style.width = width + "px";
		login_wnd.style.height = height + "px";		
		login_wnd.style.visibility = "visible";
	}
}
function ptlogin2_onClose(){
	document.getElementById("login_wrap").style.display = "none";
	UI.popwinMask(0);
}
function openLogin(returnURL){
	var url = "http://ui.ptlogin2.myapp.com/cgi-bin/login?appid=544000403&s_url=";
	if(window.document.domain == "qq.com"){
		url = "http://ui.ptlogin2.qq.com/cgi-bin/login?appid=16000101&s_url=";
	}
	url += encodeURIComponent(returnURL ? returnURL : g_returl);
	var login_wnd = document.getElementById("login_wrap");
	if (login_wnd != null){
	    document.getElementById("login_frame").src = url;
		login_wnd.style.display = "block";
		login_wnd.style.position = "absolute";
		login_wnd.style.top = (getScrollTop() + getClientHeight()/2) + "px";
		login_wnd.style.left = "50%";
		login_wnd.style.marginTop = "-190px";
		login_wnd.style.marginLeft = "-275px";
		UI.popwinMask(1);
	}
}
function getClientHeight(){
	var clientHeight = "800";
	if(document.documentElement.clientHeight){
        clientHeight = document.documentElement.clientHeight;
	}
	return clientHeight;
}
function getScrollTop(){
	var scrollTop = 0;
	if(document.documentElement && document.documentElement.scrollTop){
		scrollTop = document.documentElement.scrollTop;
    }else if(document.body){
    	scrollTop = document.body.scrollTop;
    }
	return scrollTop;
}
//登录模块end

//ie6背景图切换闪烁问题
(function(){
	if($.browser.msie && ($.browser.version=="6.0") && !$.support.style){
		document.execCommand("BackgroundImageCache", false, true);
	}
})();
if(gf_param.indexOf("970035") == -1){
	//返回顶部
	window.setInterval(function(){
		var wht = $(window).height();
		var wst = $(document).scrollTop();
	    if(wst > 80){
	    	var dht = $(document).height();
	    	if($.browser.msie && ($.browser.version=="6.0") && !$.support.style){
				$("div.gototop").css("position", "absolute");
				if((dht-wst-wht) < 148){
					$("div.gototop").css("top", (dht-148-34)+"px");
				}else{
					$("div.gototop").css("top", (wst+wht-34)+"px");
				}
	    	}else{
	    		if((dht-wst-wht) < 138){
	    			$("div.gototop").css("bottom", (138-(dht-wht-wst))+"px");
	    		}else{
	    			$("div.gototop").css("bottom", "-3px");
	    		}
	    	}
	    	$("div.gototop").show();
	    }else{
	    	$("div.gototop").hide();
	    }
	}, 200);
}
function gototop(){
    $("html,body").animate({
        scrollTop: 0
    }, 500);
}