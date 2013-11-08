/*
 * json数据缓存配置，更新版本号可手动刷新缓存
 */
var MANIFEST = {};
//缓存开关(true|缓存, false不缓存)
MANIFEST.swit = false;
//缓存频率
MANIFEST.day = function(){
	var d = new Date();
	return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
}
MANIFEST.hour = function(){
	var d = new Date();
	return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":00";
}
//缓存回收
MANIFEST.reclaim = ["search_hot_word"];
//搜索热词
MANIFEST.search_hot_word = {"key":"search_hot_word","freq":""+MANIFEST.hour()+"","ver":"v1.0.0"};
//首页cms广告
MANIFEST.index_cms_advs = {"key":"index_cms_advs","freq":""+MANIFEST.hour()+"","ver":"v1.0.0"};
//首页装机必备
MANIFEST.index_app_nesseary = {"key":"index_app_nesseary","freq":""+MANIFEST.day()+"","ver":"v1.0.0"};
//首页男生必备
MANIFEST.index_man_nesseary = {"key":"index_man_nesseary","freq":""+MANIFEST.day()+"","ver":"v1.0.0"};
//首页女生必备
MANIFEST.index_woman_nesseary = {"key":"index_woman_nesseary","freq":""+MANIFEST.day()+"","ver":"v1.0.0"};
//首页每日精选
MANIFEST.index_daily_chosen = {"key":"index_daily_chosen","freq":""+MANIFEST.hour()+"","ver":"v1.0.0"};
//首页应用排行
MANIFEST.index_app_rank = {"key":"index_app_rank","freq":""+MANIFEST.day()+"","ver":"v1.0.0"};
//首页游戏排行
MANIFEST.index_game_rank = {"key":"index_game_rank","freq":""+MANIFEST.day()+"","ver":"v1.0.0"};
//首页热门分类
MANIFEST.index_hot_category = {"key":"index_hot_category","freq":""+MANIFEST.day()+"","ver":"v1.0.0"};
//应用分类
MANIFEST.app_type_sort = {"key":"app_type_sort","freq":""+MANIFEST.day()+"","ver":"v1.0.0"};
//游戏分类
MANIFEST.game_type_sort = {"key":"game_type_sort","freq":""+MANIFEST.day()+"","ver":"v1.0.0"};
//热门火花市场应用
MANIFEST.huohuaMarket_app_hot = {"key":"huohuaMarket_app_hot","freq":""+MANIFEST.day()+"","ver":"v1.0.0"};
//最新火花市场应用
MANIFEST.huohuaMarket_app_new = {"key":"huohuaMarket_app_new","freq":""+MANIFEST.day()+"","ver":"v1.0.0"};
//专题cms广告
MANIFEST.topic_cms_advs = {"key":"topic_cms_advs","freq":""+MANIFEST.hour()+"","ver":"v1.0.0"};
//热门专题
MANIFEST.topic_list_hot = {"key":"topic_list_hot","freq":""+MANIFEST.day()+"","ver":"v1.0.0"};
//装机必备
MANIFEST.necessary_app_install = {"key":"necessary_app_install","freq":""+MANIFEST.day()+"","ver":"v1.0.0"};

