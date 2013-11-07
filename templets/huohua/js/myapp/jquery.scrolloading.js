// JavaScript Document
/*
 * jquery.scrolloading.js
 * by yvesyu
 * 2011-11-04 v1.0
*/
(function($) {
	$.fn.scrolloading = function(options){
		var defaults = {
			"attr" : "data-url"
		};
		var params = $.extend({}, defaults, options || {});
		params.cache = [];
		$(this).each(function(){
			var node = this.nodeName.toLowerCase(), arg = $(this).attr(params["attr"]);
			if (!arg) { return; }
			//节点数据元
			var data = {
				"obj" : $(this),
				"tag" : node,
				"arg" : arg
			};
			params.cache.push(data);
		});
		
		//动态加载数据
		var loading = function(){
			var st = $(document).scrollTop();
			var sth = st + $(window).height();
			$.each(params.cache, function(i, data){
				var o = data.obj;
				if(o){
					var post = 0, posb = 0;
					try{
						post = o.offset().top;
						posb = post + o.height();
					}catch(ex){}
					//if((post > st && post < sth) || (posb > st && posb < sth)){
					if(post < sth){
						var tag = data.tag, arg = data.arg;
						//在浏览器可见区域内
						if(tag === "img"){
							o.attr("src", $.trim(arg));
						}else{
							//o.load(arg);
							eval(arg + "()");
						}
						data.obj = null;
					}
				}
			});
			return false;
		};
		
		//加载完毕即执行
		loading();
		//滚动执行
		$(window).bind("scroll", loading);
	};
})(jQuery);