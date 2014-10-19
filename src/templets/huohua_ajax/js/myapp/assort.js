/*
 * 应用和游戏
 * by yvesyu
*/
var g_ranktype = 0;
var g_icfa = "-1";

var g_currentpage='';
//应用、游戏分类
function getAppCategory() {
	var qry_web = "qrycategorylist_web.php";
	var func = showAppCategory;
	var mf = MANIFEST.app_type_sort;
	if(g_layout == "game") {//游戏分类
		qry_web = "qrygamecategory_web.php";
		mf = MANIFEST.game_type_sort;
	}
	//从缓存中获取显示
	if(UI.getlocaldata(func, mf)){
		return;
	}
	$.getJSON(g_action + qry_web,
			{					
				"r" : Math.random()
			},
			function(json){			
				if(json && json.result==0){
					if(json.info.value.length > 0){
						//保存并显示
						UI.savelocaldata(func, mf, json);
					}
				}else{
					$("#category_list").html(UI.errorequest("li", json.msg));
				}
			});//end of getJSON
}
function showAppCategory(json){
	var shtml = [];
	var data = json.info.value;
	var len = data.length;
	var cid_all = -1, icfa_all = "15144050000000000000";
	if(g_layout == "game"){//游戏分类
		cid_all = 120;
		icfa_all = "15144206000120000000";
	}
	shtml.push("<li data-cid=\""+cid_all+"\" data-icfa=\""+icfa_all+"\"><a href=\"javascript:void(0);\">全部</a></li>");
	for(var i=0; i<len; i++){
		var item = data[i];
		if(item.categoryid == 120){
			continue;
		}
		shtml.push("<li data-cid=\""+item.categoryid+"\" data-icfa=\""+item.icfa+"\"><a href=\"javascript:void(0);\">"+UI.htmlEncode(item.categoryname)+"</a></li>");
	}
	$("#category_list").html(shtml.join(""));
	
	$("#category_list>li").each(function(){
		if($(this).attr("data-cid") == g_cid){
			categorySelected(this);
			//分类应用
			showCategoryApp(Number(UI.gethashparam("pageno")));
		}
	});
	$("#category_list>li").click(function(){//选择子类

		categorySelected(this);
		//设置hash
		showCategoryApp();
	});
}
//分类选中
function categorySelected(that){
	var $that = $(that);
	$that.siblings("li").removeClass("nownav");
	$that.addClass("nownav");
	g_cid = $that.attr("data-cid");
	g_icfa = $that.attr("data-icfa");
	g_cname = $that.find("a").html();
	var pagetitle = g_cname;
	if(g_cid == -1){
		pagetitle += "应用";
	}else if(g_cid >= 120){
		pagetitle += "游戏";
	}
	document.title = pagetitle + " - 火花市场";
	$("ol.bread-nav>li").eq(2).html(g_cname);
	
	if(g_cid==-1 || g_cid==120){
		if(g_ranktype == 1){
			g_ranktype = 0;
			$("div.filternav>a").eq(1).removeClass("nownav");
			$("div.filternav>a").eq(0).addClass("nownav");
		}
		$("div.filternav>a").eq(1).hide();
	}else{
		$("div.filternav>a").eq(1).show();
	}
}
//排序type选中
function ranktypeSelected(obj){
	g_ranktype = $(obj).attr("data-rank");
	$("div.filternav>a.nownav").removeClass("nownav");
	$(obj).addClass("nownav");
}
//分类应用
function showCategoryApp(pageno, pageindex){
	if(!pageno){
		pageno = 1;
	}
	if(!pageindex){
		pageindex = -1;
	}
	//设置hash
	var hash = UI.gethash();

	if(window.g_currentpage!=''&&window.g_currentpage==window.location.href){
		UI.puthash("cid="+g_cid+"&rank="+g_ranktype+"&pageno="+pageno);
	}
	window.g_currentpage=window.location.href;



	var qry_web = "qrycategoryranking_web.php";
	if(g_cid == 10013){
		qry_web = "qryinersoftrank_web.php";
	}
	$.getJSON(g_action + qry_web,
			{
				"cid" : g_cid,
				"ranktype" : g_ranktype,
				"icfa" : g_icfa,
				"pageNo" : pageno,
				"pageIndex" : pageindex,
				"pageSize" : 10,
				"r" : Math.random()
			},
			function(json){
				var obj = $("ul.longranklist");
				if(json && json.result==0){
					var app_lmid = [UI.lmid.app_recomm,UI.lmid.app_hot,UI.lmid.app_new];
					var game_lmid = [UI.lmid.game_recomm,UI.lmid.game_hot,UI.lmid.game_new];
					var lmid = g_lmid;
					if(lmid <= 0){
						if(g_layout == "app"){//应用
							lmid = app_lmid[g_ranktype];
						}else{//游戏
							lmid = game_lmid[g_ranktype];
						}
					}
					/*
					if(g_cid == 10013){
						lmid = 1015;
					}
					*/
					obj.html(buildAppContent(json.info.value, lmid));
					obj.siblings("div.pagenav").html(UI.buildPageBar({"pageNo":json.info.pageNo,"pageIndex":json.info.nextPageIndex,"pageCount":json.info.pageCount},"showCategoryApp"));
					obj.find("img.img_scrolloading_"+lmid).scrolloading();
				}else{
					obj.html(UI.errorequest("li", json.msg, "padding:20px 0 20px 10px;"));
				}
				if(window.g_inited){
					if($(document).scrollTop() > obj.offset().top){
						$("html,body").animate({
							scrollTop : obj.offset().top - 30
						},400);
					}
				}
				window.g_inited = true;
			});//end of getJSON
}
//构建列表
function buildAppContent(data, lmid){
	var shtml = [];
	var len = data.length;
	for(var i=0; i<len; i++){
		var item = data[i];
		shtml.push("<li onmouseover=\"$(this).addClass('hover');$(this).find('>div').find('>p').eq(0).addClass('stargreybg');\" onmouseout=\"$(this).removeClass('hover');$(this).find('>div').find('>p').eq(0).removeClass('stargreybg');\">");
		shtml.push("	<div class=\"app-rank-hover\">");
		shtml.push("		<div class=\"app-img\">");
		shtml.push("			<a href=\"appdetail.jsp?appid="+item.appid+"&icfa="+item.icfa+"&lmid="+lmid+gf_param+"\" title=\""+UI.htmlAttributeEncode(item.softname)+"\">");
		shtml.push("				<img class=\"img_scrolloading_"+lmid+"\" src=\""+g_respath+"/images/myapp/default-icon.jpg\" data-url=\""+item.icon+"\" width=\"72\" height=\"72\" alt=\""+UI.htmlAttributeEncode(item.softname)+"\">");
		//shtml.push("				<div class=\"shadow\"></div>");
		shtml.push("			</a>");
		shtml.push("		</div>");
		shtml.push("		<p class=\"app-name\"><a href=\"appdetail.jsp?appid="+item.appid+"&icfa="+item.icfa+"&lmid="+lmid+gf_param+"\">"+UI.htmlEncode(item.softname)+"</a>"+UI.buildAppStar(item.starnumber)+"</p>");
		shtml.push("		<p class=\"app-introduce\">"+UI.htmlEncode(item.softdesc)+"</p>");
		shtml.push("		<p class=\"grey\">发布时间："+item.publishtime+"     <span>支持固件："+UI.firmwareSupport(item.sdkver)+"</span></p>");
		shtml.push("		<div class=\"free-download\" style=\"width:68px;\">");
		//shtml.push("			<a href=\"down.jsp?appid="+item.appid+"&pkgid="+item.pkgid+"&icfa="+item.icfa+"&lmid="+lmid+gf_param+"\" onclick=\"_gaq.push(['_trackPageview', '/virtual/insite/downapp/"+lmid+"/list/"+item.appid+"']);pingHotag('downapp."+lmid+".list."+item.appid+"');\"><span>免费下载</span></a>");
		shtml.push("			<a href=\"javascript:void(0);\" onclick=\"qqapp_dl_apk(this);_gaq.push(['_trackEvent', 'list', 'download - easy', '"+item.appid+"']);pingHotag('list.download.easy."+item.appid+"');\" ex_url=\""+g_hostpath+"/android/down.jsp?appid="+item.appid+"&pkgid="+item.pkgid+"&type=5&icfa="+item.icfa+"&lmid="+lmid+gf_param+"\" asistanturlid=\"990428\" appname=\""+UI.htmlAttributeEncode(item.softname)+"\" title=\"使用腾讯手机管家(PC版)一键安装到手机\"><span>一键安装</span></a>");
		shtml.push("		</div>");
		shtml.push("	</div>");
		shtml.push("</li>");
	}
	return shtml.join("");
};
//初始化
function init(){
	//获取hash参数
	var cid = Number(UI.gethashparam("cid"));
	if(cid){
		g_cid = cid;
	}
	var rank = Number(UI.gethashparam("rank"));
	if(rank){
		$("div.filternav>a").each(function(){
			if($(this).attr("data-rank") == rank){
				ranktypeSelected(this);
			}
		});
	}


	//排行type绑定事件
	$("div.filternav>a").click(function(){
		ranktypeSelected(this);
		showCategoryApp();
	});
	//应用、游戏分类
	getAppCategory();
	
	checkLocation(function(){
		var cid=Number(UI.gethashparam("cid"))||$("#category_list>li:first").attr('data-cid'),
		    ranktype=Number(UI.gethashparam("rank"))||$('.filternav>a:first').attr('data-rank'),
		    pageno=Number(UI.gethashparam("pageno"));
		ranktypeSelected($("div.filternav>a[data-rank='"+ranktype+"']"));
		categorySelected($("#category_list>li[data-cid='"+cid+"']"));
		g_cid=cid;
		g_ranktype=ranktype;
		showCategoryApp(pageno);
	});

};



window.checkLocation=function(func){
	return setInterval(function(){
		if(window.g_currentpage!=window.location.href){
			func();
		}

	},300);
};

