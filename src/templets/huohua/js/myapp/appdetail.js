/*
 * 应用详情
 * by yvesyu
*/
//截图翻页显示效果
var g_appic_animate = false;
$(function(){
	var obj = $("div.showpic");
	obj.find("img").each(function(idx){
		if(idx < 2){
			$(this).attr("src", $(this).attr("data-url"));
		}
	});
	obj.children("a.prev").click(function(){
		if(g_picindex>2 && !g_appic_animate){
			g_picindex--;
		}else{
			return;
		}
		g_appic_animate = true;
		if(g_picindex > 2){
			$(this).attr("class","prev");
		}else{
			$(this).attr("class","prev prevdis");
		}
		obj.children("a.next").attr("class","next");
		var obj_wrap = obj.children("div.pic-wrap");
		obj_wrap.stop().animate({scrollLeft:obj_wrap.scrollLeft()-236}, "slow", "linear", function(){
			g_appic_animate = false;
		});
	});
	
	obj.children("a.next").click(function(){
		if(g_picindex<g_piclength && !g_appic_animate){
			g_picindex++;
		}else{
			return;
		}
		g_appic_animate = true;
		obj.children("a.prev").attr("class","prev");
		if(g_picindex < g_piclength){
			$(this).attr("class","next");
		}else{
			$(this).attr("class","next nextdis");
		}
		var obj_img = obj.find("img").eq(g_picindex-1);
		if(!obj_img.attr("src") || obj_img.attr("src").indexOf("/images/myapp/defaultappic.jpg")!=-1){
			obj_img.attr("src", obj_img.attr("data-url"));
		}
		var obj_wrap = obj.children("div.pic-wrap");
		obj_wrap.stop().animate({scrollLeft:obj_wrap.scrollLeft()+236}, "slow", "linear", function(){
			g_appic_animate = false;
		});
	});
});
//相关推荐
function showRelateApp(){
	$.getJSON(g_action + "qryrelatesoft_web.php",
			{
				"appid" : g_appid,
				"icontype" : 60,
				"pageNo" : 1,
				"pageSize" : 10,
				"r" : Math.random()
			},
			function(json){
				var obj = $("#relate_app");
				if(json && json.result==0){
					var lmid = UI.lmid.appdetail_relate;
					obj.html(UI.buildRelateApp(json, lmid));
					obj.find("img.img_scrolloading_"+lmid).scrolloading();
				}else{
					obj.html(UI.errorequest("li", json.msg));
				}
			}
		);
}
UI.buildRelateApp = function(json, lmid){
	var results = json.info.value;
	var len = results.length;
	var shtml = [];
	for(var i=0; i<len; i++){
		var item = results[i];
		var bn = "";
		if(i == len-1){
			bn = " class=\"bn\"";
		}
		shtml.push("<li"+bn+" onmouseover=\"$(this).addClass('hover');\" onmouseout=\"$(this).removeClass('hover');\">");
		shtml.push("	<div class=\"app-img\">");
		shtml.push("		<a href=\"appdetail.jsp?appid="+item.appid+"&icfa="+item.icfa+"&lmid="+lmid+gf_param+"\" title=\""+UI.htmlAttributeEncode(item.softname)+"\">");
		shtml.push("			<img class=\"img_scrolloading_"+lmid+"\" src=\""+g_respath+"/images/myapp/default-icon.jpg\" data-url=\""+item.icon+"\" width=\"60\" height=\"60\" alt=\""+UI.htmlAttributeEncode(item.softname)+"\" />");
		//shtml.push("			<div class=\"shadow\"></div>");
		shtml.push("		</a>");
		shtml.push("	</div>");
		shtml.push("	<p class=\"app-name\"><a href=\"appdetail.jsp?appid="+item.appid+"&icfa="+item.icfa+"&lmid="+lmid+gf_param+"\">"+UI.htmlEncode(item.softname)+"</a></p>");
		shtml.push("	<p>"+UI.buildAppStar(item.starnumber)+"</p>");
		shtml.push("	<p>版本："+UI.htmlEncode(item.versionname)+"</p>");
		shtml.push("	<p>更新时间："+item.publishtime+"</p>");
		shtml.push("</li>");
	}
	return shtml.join("");
};

var g_starPosted = false;
var g_starTextList = ["很差", "较差", "还行", "推荐", "力荐"];
//获取用户评分
function getUserScore(){
	if(g_logined){
		$.getJSON(g_action + "qryuserpostscore_web",
			{
				"appid" : g_appid,
				"pkgid" : g_pkgid,
				"r" : Math.random()
			},
			function(json){
				if(json && json.result==0){
					var results = json.info.value;
					g_starPosted = results.postable;
				}
			}
		);
	}
}
function onfocusonblur(obj, v){
	if(!g_logined){
		openLogin();
		return;
	}
	if(v == 0){
		$(obj).css("color", "#333");
		if($.trim($(obj).val()) == "您最多可以输入255个汉字~"){
			$(obj).val("");
		}
	}else{
		if($.trim($(obj).val()) == ""){
			$(obj).css("color", "#A0A0A0");
			$(obj).val("您最多可以输入255个汉字~");
		}
	}
}
var g_clickstar = false;
//选择星星
function changeStar(pk, num){
	if(!g_logined){
		openLogin();
		return;
	}
	// 已经评过星星
	if(g_starPosted){
		return;
	}
	if(g_clickstar && pk==0){
		return;
	}
	if(pk == 1){
		g_clickstar = true;
	}
	var obj = $("#comment_add");
	// 设置星星
	obj.find("p.startComm a").each(function(idx){
		if(idx < num){
			$(this).attr("class","light");
		}else{
			$(this).attr("class","");
		}
	});
	
	obj.find("p.startComm span").addClass("result").html(g_starTextList[num-1]);
}
//打开评论框
function openCommentBox(){
	if(!g_logined){
		openLogin();
		return;
	}
	if(g_starPosted){
		var oid = "#message_info";
		var obj = $(oid);
		obj.find("h1").html("添加评价");
		obj.find("div.line1").html("你已经评价过了，不能重复评价！");
		UI.popwinMask(1);
		UI.popwinWrap(oid);
	}else{
		var oid = "#comment_add";
		var obj = $(oid);
		obj.find("div.error-tip>span").html("").parent().hide();
		obj.find("textarea").val("您最多可以输入255个汉字~");
		obj.find("input[type='text']").val("");
		UI.popwinMask(1);
		UI.popwinWrap(oid);
	}
}
//评论
function doComment(){
	var oid = "#comment_add";
	var obj = $(oid);
	var coment_score = obj.find("p.startComm a.light").length;
	if(coment_score == 0){
		obj.find("div.error-tip>span").html("请评分！").parent().show();
		return;
	}
	var comment_info = $.trim(obj.find("textarea").val());
	if(comment_info=="您最多可以输入255个汉字~"){
		comment_info = "";
	}
	if(UI.getStrLength(comment_info) > 510){
		obj.find("div.error-tip>span").html("您输入的字数超过255个汉字，请修改后再提交！").parent().show();
		return;
	}
	var vcode = $.trim(obj.find("input[type='text']").val());
	/*if(vcode.length < 4){
		obj.find("div.error-tip>span").html("请输入验证码！").parent().show();
		return;
	}*/
	obj.find("a.left").attr("disabled", true);
	$.getJSON(g_action + "postscore_web",
			{
				"appid" : g_appid,
				"pkgid" : g_pkgid,
				"score" : coment_score,
				"comment" : comment_info,
				"code" : vcode,
				"r" : Math.random()
			},
			function(json){
				if(json && json.result==0){
					UI.popwinWrap(oid, function(){
						UI.popwinToast("评价成功！");
					});
					UI.popwinMask(0);
					$("ul.comment-list").prepend(UI.buildAppComment(json.info.value, 1)).children("li[data-type='tips']").remove();
				}else{
					obj.find("div.error-tip>span").html(json.msg && json.msg.length ? json.msg : "系统繁忙！").parent().show();
					obj.find("a.left").attr("disabled", false);
					//getVirifyCode(0);
				}
			}
	);//end JSON
}
//评论列表
function showAppComment(pageno, pageindex){
	if(!pageno){
		pageno = 1;
	}
	if(!pageindex){
		pageindex = -1;
	}
	$.getJSON(g_action + "commentlist_web.php",
			{
				"appid" : g_appid,
				"pkgid" : g_pkgid,
				"pageNo" : pageno,
				"pageIndex" : pageindex,
				"pageSize" : 10,
				"r" : Math.random()
			},
			function(json){
				var obj = $("ul.comment-list");
				if(json && json.result==0){
					if(pageno == 1){
						var obj_score = $("#app_score_detail");
						obj_score.find(">div.average-score>p.item2").html(json.info.allscore+"星");
						obj_score.find(">div.average-score span.bigstarlight").css("width", json.info.allstarnumber+"%").html(json.info.allstarnumber);
						obj_score.find(">div.average-score>p").eq(3).html("<span class=\"hide-clip\">总评分人数</span>"+json.info.allcount);
						var all1vcount = json.info.all1vcount;
						var all2vcount = json.info.all2vcount;
						var all3vcount = json.info.all3vcount;
						var all4vcount = json.info.all4vcount;
						var all5vcount = json.info.all5vcount;
						var arrcount = [all1vcount, all2vcount, all3vcount, all4vcount, all5vcount];
						arrcount.sort(sortNumber);
						var maxcount = arrcount[arrcount.length-1];
						obj_score.find(">div.star-bar div.score-value1").stop(true, false).animate({
							width : Math.floor(all5vcount*100/maxcount)+"%"
						}, 500);
						obj_score.find(">div.star-bar div.score-value2").stop(true, false).animate({
							width : Math.floor(all4vcount*100/maxcount)+"%"
						}, 500);
						obj_score.find(">div.star-bar div.score-value3").stop(true, false).animate({
							width : Math.floor(all3vcount*100/maxcount)+"%"
						}, 500);
						obj_score.find(">div.star-bar div.score-value4").stop(true, false).animate({
							width : Math.floor(all2vcount*100/maxcount)+"%"
						}, 500);
						obj_score.find(">div.star-bar div.score-value5").stop(true, false).animate({
							width : Math.floor(all1vcount*100/maxcount)+"%"
						}, 500);
						obj_score.find(">div.star-bar>div.item3").eq(0).html(all5vcount);
						obj_score.find(">div.star-bar>div.item3").eq(1).html(all4vcount);
						obj_score.find(">div.star-bar>div.item3").eq(2).html(all3vcount);
						obj_score.find(">div.star-bar>div.item3").eq(3).html(all2vcount);
						obj_score.find(">div.star-bar>div.item3").eq(4).html(all1vcount);
					}
					if(pageno==1 && json.info.value.length==0){
						obj.html("<li data-type=\"tips\">现在还没有评论，快来抢沙发吧~</li>");
					}else{
						obj.html(UI.buildAppComment(json.info.value));
					}
					$("#comment_page").html(UI.buildPageBar({"pageNo":json.info.pageNo,"pageIndex":-1,"pageCount":json.info.pageCount},"showAppComment"));
					obj.find("img.img_scrolloading_userphoto").scrolloading();
				}else{
					obj.html("<li data-type=\"tips\">"+(json.msg && json.msg.length ? json.msg : "系统繁忙！")+"</li>");
				}
				if($(document).scrollTop() > obj.offset().top){
					$("html,body").animate({
						scrollTop : obj.offset().top - 20
					},400);
				}
			}
		);
}
function sortNumber(a, b){
	return a - b;
}
function tranToversion(chanel){
	var str = "网页版";
	switch(chanel){
		case "web":
		str = "PC网页";
		break;
		case "client":
		str = "<a href=\"http://bao.myapp.com/\" target=\"_blank\">应用宝</a>";
		break;
		case "touch":
		str = "手机网页";
		break;
		case "wap1":
		case "wap2":
		str = "手机网页";
		break;
		case "apad":
		str = "应用宝HD";
		break;
	}
	return str;
}
UI.buildAppComment = function(data, sta){
	var shtml = [];
	var len = data.length;
	for(var i=0; i<len; i++){
		var item = data[i];
		shtml.push("<li itemscope itemtype=\"http://data-vocabulary.org/Review\">");
		shtml.push("	<meta itemprop=\"itemreviewed\" content=\""+UI.htmlAttributeEncode(item.content.replace(/\r\n/g, '<br />'))+"\" />");
		shtml.push("	<div class=\"comment-left\">");
		var user_photo = "class=\"img_scrolloading_userphoto\" src=\""+g_respath+"/images/myapp/default-avatar.jpg\" data-url=\""+item.userphoto+"\"";
		if(typeof(sta)!="undefined" && sta==1){
			user_photo = "src=\""+item.userphoto+"\"";
		}
		shtml.push("		<img "+user_photo+" width=\"50\" height=\"50\" alt=\""+UI.htmlAttributeEncode(item.username)+"\" />");
		shtml.push("		<div class=\"shadow\"></div>");
		if(item.isstar == "true"){
			shtml.push("		<div class=\"comment-star\">评论之星</div>");
		}
		shtml.push("	</div>");
		shtml.push("	<div class=\"first-line\">");
		shtml.push("		<span class=\"username\" itemprop=\"reviewer\">"+UI.htmlEncode(item.username)+"</span>");
		shtml.push("		"+UI.buildAppStar(item.userpoststarno)+"");
		shtml.push("	</div>");
		shtml.push("	<p itemprop=\"description\">");
		shtml.push("		"+UI.htmlEncode(item.content).replace(/\r\n/g, '<br />')+"");
		shtml.push("	</p>");
		shtml.push("	<div class=\"clear\"></div>");
		shtml.push("	<div class=\"comment-func\">");
		shtml.push("		<time itemprop=\"dtreviewed\" datetime=\""+item.createtime+"\">"+item.createtime+"</time><span>来自"+tranToversion(item.channel)+"</span>");
		shtml.push("		<div class=\"fr\">");
		if(g_authcomment && item.isdqbb == "true"){
			shtml.push("			<a href=\"javascript:void(0);\" onclick=\"voteComment(this,"+item.commentid+",2);\">置顶</a>&nbsp;");
		}
		if(g_authcomment && item.isstar == "true"){
			shtml.push("			<a href=\"javascript:void(0);\" onclick=\"voteComment(this,"+item.commentid+",3);\">重置</a>&nbsp;");
		}
		if(g_qqno>0 && g_qqno==item.userid){
			shtml.push("			<font class=\"grey\">u</font><span>"+item.agree+"</span>");
			shtml.push("			<font class=\"grey\">d</font><span>"+item.disagree+"</span>");
		}else{
			shtml.push("			<a class=\"u\" href=\"javascript:void(0);\" onclick=\"voteComment(this,"+item.commentid+",0);\" title=\"顶\">");
			shtml.push("				<font class=\"green\">u</font><label>"+item.agree+"</label>");
			shtml.push("				<div style=\"display:none;\"></div>");
			shtml.push("			</a>");
			shtml.push("			<a class=\"d\" href=\"javascript:void(0);\" onclick=\"voteComment(this,"+item.commentid+",1);\" title=\"踩\">");
			shtml.push("				<font class=\"orange\">d</font><label>"+item.disagree+"</label>");
			shtml.push("				<div style=\"display:none;\"></div>");
			shtml.push("			</a>");
		}
		shtml.push("		</div>");
		shtml.push("	</div>");
		shtml.push("	<div class=\"clear\"></div>");
		shtml.push("</li>");
	}
	return shtml.join("");
};
//评论顶踩
function voteComment(obj, cid, vtype){
	if(!g_logined){
		openLogin();
		return;
	}
	$.getJSON(g_action + "votecomment_web",
			{
				"appid" : g_appid,
				"commentid" : cid,
				"opertype" : vtype,
				"r" : Math.random()
			},
			function(json){
				var tip_obj = $(obj).find(">div");
				if(json && json.result==0){
					if(vtype < 2){
						obj = $(obj).find(">label");
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
						UI.popwinToast("操作成功！");
					}
				}else{
					if(vtype < 2){
						tip_obj.attr("class", "success-tip been");
						tip_obj.html("已顶或踩过！");
					}else{
						UI.popwinToast("操作失败！");
					}
				}
				if(vtype < 2){
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
			}
		);
}
//打开收藏框
function openFavoriteBox(){
	if(!g_logined){
		openLogin();
		return;
	}
	appAddFavorite();
	//showMyFavorite();
	//UI.popwinMask(1);
	//UI.popwinWrap("#favorite_add");
}
//加入收藏tab切换
function addFavoriteTab(v){
	var obj = $("#favorite_add");
	var fav = obj.find("ul.collectc>li");
	obj.find("ul.collect-nav>li").each(function(idx){
		if(idx == v){
			$(this).attr("class", "nownav");
			fav.eq(idx).show();
		}else{
			$(this).attr("class", "");
			fav.eq(idx).hide();
		}
	});
	if(v == 0){
		obj.find(">footer").hide();
	}else{
		obj.find(">footer").show();
	}
}
//我的收藏夹
function showMyFavorite(pageno, pageindex){
	if(!pageno){
		pageno = 1;
	}
	if(!pageindex){
		pageindex = -1;
	}
	$.getJSON(g_action + "operatfavoriten_web",
			{
				"type" : 4,
				"pageNo" : pageno,
				"pageIndex" : pageindex,
				"pageSize" : 6,
				"r" : Math.random()
			},
			function(json){
				var obj = $("#favorite_add");
				if(json && json.result==0){
					obj.find("ul.collect-applist").html(UI.buildMyFavorite(json.info.value));
					obj.find("div.pagenav").html(UI.buildPageBar({"pageNo":json.info.pageNo,"pageIndex":-1,"pageCount":json.info.pageCount},"showMyFavorite"));
				}else{
					obj.find("ul.collect-applist").html(UI.errorequest("li", json.msg));
				}
			});//end of getJSON
}
UI.buildMyFavorite = function(data){
	var shtml = [];
	var len = data.length;
	for(var i=0; i<len; i++){
		var item = data[i];
		shtml.push("<li onmouseover=\"$(this).find('>a').eq(0).addClass('nowfile');\" onmouseout=\"$(this).find('>a').eq(0).removeClass('nowfile');\">");
		shtml.push("	<a class=\"collect-icolist\" href=\"javascript:appAddFavorite("+item.favid+");\">");
		var icons = item.icons;
		var lth = icons.length;
		for(var j=0; j<lth; j++){
			shtml.push("		<img src=\""+icons[j].icon+"\" width=\"72\" height=\"72\" alt=\"\" />");
		}
		while(lth < 4){
			shtml.push("		<img src=\""+g_respath+"/images/myapp/default-icon.jpg\" width=\"72\" height=\"72\" alt=\"\" />");
			lth++;
		}
		shtml.push("	</a>");
		shtml.push("	<p class=\"category-name\">"+UI.htmlEncode(item.favname)+"</p>");
		shtml.push("</li>");
	}
	return shtml.join("");
};
//应用添加到收藏夹
function appAddFavorite(favid){
	$.getJSON(g_action + "operatsoft2fav_web",
			{
				"type" : 1,
				//"favid" : favid,
				"appid" : g_appid,
				"r" : Math.random()
			},
			function(json){
				if(json && json.result==0){
					//UI.popwinWrap("#favorite_add", function(){
						UI.popwinToast("成功添加到收藏夹！");
					//});
					//UI.popwinMask(0);
				}else{
					var oid = "#message_info";
					var obj = $(oid);
					obj.find("h1").html("加入收藏");
					obj.find("div.line1").html(json.msg && json.msg.length ? json.msg : "系统繁忙！");
					//UI.popwinWrap("#favorite_add", function(){
					UI.popwinMask(1);
					UI.popwinWrap(oid);
					//});
				}
			});//end of getJSON
}
//应用添加到新收藏夹
function appAddNewFavorite(){
	var oid = "#favorite_add";
	var obj = $(oid);
	var favname = $.trim(obj.find("input").eq(0).val());
	if(favname == ""){
		obj.find("div.error-tip>span").html("收藏夹名称不能为空！").parent().show();
		return;
	}
	if(UI.getStrLength(favname) > 20){
		obj.find("div.error-tip>span").html("收藏夹名称不能超过10个汉字！").parent().show();
		return;
	}
	var ispub = obj.find("input").eq(1).attr("checked") ? 1 : 0;
	
	obj.find("a.left").attr("disabled", true);
	$.getJSON(g_action + "addsoft2newfavor_web",
			{
				"favname" : favname,
				"description" : "",
				"ispub" : ispub,
				"appid" : g_appid,
				"r" : Math.random()
			},
			function(json){
				if(json && json.result==0){
					UI.popwinWrap(oid, function(){
						UI.popwinToast("成功添加到收藏夹！");
					});
					UI.popwinMask(0);
					obj.find("div.error-tip>span").html("").parent().hide();
					obj.find("input").eq(0).val("");
				}else{
					obj.find("div.error-tip>span").html(json.msg && json.msg.length ? json.msg : "系统繁忙！").parent().show();
				}
				obj.find("a.left").attr("disabled", false);
			}
		);
}
//应用分享
function appShare(vtype){
	$.getJSON(g_action + "share_web",
			{
				"appid" : g_appid,
				"sharetype" : vtype,
				"reason" : "",
				"r" : Math.random()
			},
			function(json){
				if(json && json.result==0){
					
				}else{
					
				}
			}
		);
}
//举报
$(function(){
	var $report = $("#report_app").find("input[name='reportype']");
	$report.bind("change", function(){
		if($report.filter("[value=1],[value=2]").filter(":checked").length > 0){
			var that = this;
			$report.each(function(){
				if($(that).val() != $(this).val()){
					$(this).removeAttr("checked").attr("disabled", "disabled");
				}
			});
		}else if($report.filter("[value=5],[value=6],[value=7],[value=8],[value=9]").filter(":checked").length > 0){
			$report.filter("[value=1],[value=2]").removeAttr("checked").attr("disabled", "disabled");
		}else{
			$report.removeAttr("disabled");
		}
	});
});
function doReport(){
	var $report = $("#report_app").find("input[name='reportype']");
	var type = "";
	$report.filter(":checked").each(function(){
		type += "," + $(this).val();
	});
	if(type.length > 0){
		type = type.substr(1);
	}else{
		return;
	}
	$.getJSON(
			g_action + "reportoperate_web",
			{
				"appid" : g_appid,
				"pkgid" : g_pkgid,
				"type" : type,
				"content" : "",
				"r" : Math.random()
			},
			function(json){
				if(json && json.result==0){
					$report.removeAttr("checked").removeAttr("disabled");
					UI.popwinWrap("#report_app", function(){
						UI.popwinToast("举报成功，感谢您为应用宝成长做出的贡献！");
					});
					UI.popwinMask(0);
				}else{
					var oid = "#message_info";
					var obj = $(oid);
					obj.find("h1").html("举报");
					obj.find("div.line1").html(json.msg && json.msg.length ? json.msg : "系统繁忙！");
					UI.popwinWrap("#report_app", function(){
						UI.popwinWrap(oid);
					});
				}
			}
	);//end JSON
}