var enumType = {
	pageType: {
		index: "index",
		app: "app",
		game: "game",
		subject: "subject",
		blog: "blog"
	}
}
function changeNavigation() {
	var navigation = $("ul[class='navigation'] > li");
	var href = window.location.href;
	var pageType = enumType.pageType.index;
	if(href.indexOf("/app") >= 0) {
		pageType = enumType.pageType.app;
	} else if(href.indexOf("/game") >= 0) {
		pageType = enumType.pageType.game;
	} else if(href.indexOf("/subject") >= 0) {
		pageType = enumType.pageType.subject;
	} else if(href.indexOf("/blog") >= 0) {
		pageType = enumType.pageType.blog;
	} else {
		pageType = enumType.pageType.index;
	}
	
	navigation.each(function() {
		if($(this).children("a").attr("data-nav") == pageType) {
			$(this).children("a").addClass("nownav");
		}
	});
}

changeNavigation();