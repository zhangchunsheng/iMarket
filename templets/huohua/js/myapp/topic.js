/*
 * 专题和专题详情
 * by yvesyu
*/
//
var g_currentPage='';


//所有专题
function getAllTopic(pageno, pageindex){
	if(!pageno){
		pageno = 1;
	}
	if(!pageindex){
		pageindex = -1;
	}
	//设置hash
	//if(pageno > 1){
	//	UI.puthash("pageno="+pageno);
	//}
	
	//grace add
	if(g_currentPage!=''&&g_currentPage==location.href&&pageno > 1){//这是非前进后退按钮的情况
		UI.puthash("pageno="+pageno);
	}
	g_currentPage=location.href;
	//end

	$.getJSON(g_action + "qrytopiclist_web.php",
			{
				"pageNo" : pageno,
				"pageIndex" : pageindex,
				"pageSize" : 12,
				"type" : 0,
				"r" : Math.random()
			},
			function(json){
				var obj = $("#newtopic_list");
				if(json && json.result==0){
					var lmid = UI.lmid.topic_new;
					obj.html(UI.buildAllTopic(json.info.value, lmid));
					obj.parent().siblings("div.pagenav").html(UI.buildPageBar({"pageNo":json.info.pageNo,"pageIndex":json.info.nextPageIndex,"pageCount":json.info.pageCount},"getAllTopic"));
					obj.find("img.img_scrolloading_"+lmid).scrolloading();
				}else{
					obj.html(UI.errorequest("li", json.msg));
				}
				if(window.g_inited){
					if($(document).scrollTop() > obj.offset().top){
						$("html,body").animate({
							scrollTop : obj.offset().top
						},400);
					}
				}
				window.g_inited = true;
			}
		);
}
UI.buildAllTopic = function(data, lmid){
	var shtml = [];
	var len = data.length;
	for(var i=0; i<len; i++){
		var item = data[i];
		shtml.push("<li>");
		shtml.push("	<div class=\"img\">");
		shtml.push("		<a href=\"topicdetail.jsp?topicid="+item.topicid+"&lmid="+lmid+gf_param+"\" title=\""+UI.htmlAttributeEncode(item.topicname)+"\">");
		shtml.push("			<img class=\"img_scrolloading_"+lmid+"\" data-url=\""+item.picurl+"\" width=\"200\" height=\"100\" alt=\""+UI.htmlAttributeEncode(item.topicname)+"\" />");
		shtml.push("		</a>");
		shtml.push("	</div>");
		shtml.push("	<div class=\"right\">");
		shtml.push("		<div class=\"sub-header\"><a class=\"fs14\" href=\"topicdetail.jsp?topicid="+item.topicid+"&lmid="+lmid+gf_param+"\">"+UI.htmlEncode(item.topicname)+"</a></div>");
		shtml.push("		<div class=\"msg\"><span class=\"pad20\" title=\"浏览\"></span>"+item.viewcnt+"&nbsp;&nbsp;&nbsp;&nbsp;<font class=\"grey\" title=\"顶\">u</font>"+item.agree+"</div>");
		shtml.push("		<p>"+UI.htmlEncode(item.description)+"</p>");
		shtml.push("	</div>");
		shtml.push("</li>");
	}
	return shtml.join("");
};
//热门专题
function getHotTopic(){
	var func = showHotTopic;
	//var mf = MANIFEST.topic_list_hot;
	//从缓存中获取显示
	/*
	if(UI.getlocaldata(func, mf)){
		return;
	}
	*/
	$.getJSON(g_action + "qrytopiclist_web",
			{
				"pageNo" : 1,
				"pageSize" : 5,
				"type" : 1,
				"r" : Math.random()
			},
			function(json){
				if(json && json.result==0){
					if(json.info.value.length > 0){
						//保存并显示
						//UI.savelocaldata(func, mf, json);
						func(json);
					}
				}else{
					$("#hotopic_list").html(UI.errorequest("li", json.msg));
				}
			}
		);
}
function showHotTopic(json){
	var lmid = UI.lmid.topic_hot;
	var obj = $("#hotopic_list");
	obj.html(UI.buildHoTopic(json.info.value, lmid));
	obj.find("img.img_scrolloading_"+lmid).scrolloading();
}
UI.buildHoTopic = function(data, lmid){
	var shtml = [];
	var len = data.length;
	for(var i=0; i<len; i++){
		var item = data[i];
		shtml.push("<li>");
		shtml.push("	<a href=\"topicdetail.jsp?topicid="+item.topicid+"&lmid="+lmid+gf_param+"\" title=\""+UI.htmlAttributeEncode(item.topicname)+"\"><img class=\"img_scrolloading_"+lmid+"\" data-url=\""+item.picurl+"\" width=\"200\" height=\"100\" alt=\""+UI.htmlAttributeEncode(item.topicname)+"\" /></a>");
		shtml.push("	<p class=\"sub-header\"><a class=\"anoline\" href=\"topicdetail.jsp?topicid="+item.topicid+"&lmid="+lmid+gf_param+"\" title=\""+UI.htmlAttributeEncode(item.topicname)+"\">"+UI.htmlEncode(item.topicname)+"</a></p>");
		shtml.push("	<div class=\"sub-footer\"><span class=\"pad20\" title=\"浏览\"></span>"+item.viewcnt+"<b><font class=\"grey\" title=\"顶\">u</font>"+item.agree+"</b></div>");
		shtml.push("</li>");
	}
	return shtml.join("");
};
//专题应用列表
function showTopicDetail(){
	$.getJSON(
			g_action + "qrytopicdetail_web",
			{
				"pageNo" : 1,
				"pageSize" : 50,
				"topicid" : g_topicid,
				"r" : Math.random()
			},
			function(json){
				var obj = $("ul.longranklist");
				if(json && json.result==0){
					var lmid = g_lmid;
					if(lmid <= 0){
						lmid = UI.lmid.topicdetail;
					}
					obj.html(UI.buildAppContent(json.info.value, lmid, g_topicid));
					obj.find("img.img_scrolloading_"+lmid).scrolloading();
				}else{
					obj.html(UI.errorequest("li", json.msg));
				}
			}
		);
}
//专题顶踩
function voteTopic(obj, vtype){
	$.getJSON(g_action + "votetopic_web",
			{
				"topicid" : g_topicid,
				"opertype" : vtype,
				"r" : Math.random()
			},
			function(json){
				var tip_obj = $(obj).find("div");
				if(json && json.result==0){
					obj = $(obj).find("label");
					obj.html(Number(obj.html())+1);
					
					var ot = "";
					if(vtype == 0){
						ot = "顶";
					}else{
						ot = "踩";
					}
					tip_obj.attr("class", "success-tip");
					tip_obj.html(ot+"成功！");
				}else{
					tip_obj.attr("class", "success-tip been");
					tip_obj.html("已顶或踩过！");
				}
				tip_obj.css("filter", "alpha(opacity=0)");
				tip_obj.css("opacity", "0");
				tip_obj.css("display", "block");
				tip_obj.fadeTo("slow", 1, function(){
					window.setTimeout(function(){
						tip_obj.fadeTo("slow", 0, function(){
							tip_obj.css("display", "none");
						});
					},1500);
				});
			}
		);
}


function init(){
	getAllTopic(Number(UI.gethashparam("pageno")));
	g_oriHistoryLen=history.length;
	checkLocation(function(){		
		getAllTopic(Number(UI.gethashparam("pageno")));		
	});

}


window.checkLocation=function(func){
	return setInterval(function(){
		var url=window.location.href;
		if(url!=g_currentPage){
			func();
		}

	},300);
};