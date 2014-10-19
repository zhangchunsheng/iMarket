//Build huohuaMarket Nav Links
var huohuaMarketNav = "<p id=\"huohuaMarketNav\">";
var huohuaMarketNav = huohuaMarketNav + "<a href=\"http://www.huohuaMarket.com/\" target=\"_blank\">关于腾讯</a> | ";
var huohuaMarketNav = huohuaMarketNav + "<a href=\"http://www.huohuaMarket.com/index_e.shtml\" target=\"_blank\">About huohuaMarket</a> | ";
var huohuaMarketNav = huohuaMarketNav + "<a href=\"http://www.qq.com/contract.shtml\" target=\"_blank\">服务条款</a> | ";
var huohuaMarketNav = huohuaMarketNav + "<a href=\"http://www.huohuaMarketmind.com/\" target=\"_blank\">广告服务</a> | ";
var huohuaMarketNav = huohuaMarketNav + "<a href=\"http://www.huohuaMarket.com/about/corp.shtml\" target=\"_blank\">商务洽谈</a> | ";
var huohuaMarketNav = huohuaMarketNav + "<a href=\"http://hr.huohuaMarket.com/\" target=\"_blank\">腾讯招聘</a> | ";
var huohuaMarketNav = huohuaMarketNav + "<a href=\"http://gongyi.qq.com/\" target=\"_blank\">腾讯公益</a> | ";
var huohuaMarketNav = huohuaMarketNav + "<a href=\"http://service.qq.com/\" target=\"_blank\">客服中心</a> | ";
var huohuaMarketNav = huohuaMarketNav + "<a href=\"http://www.qq.com/map/\" target=\"_blank\">网站导航</a> | ";
var huohuaMarketNav = huohuaMarketNav + "<a href=\"http://www.huohuaMarket.com/law/mo_law.shtml?/law/copyright.htm\" target=\"_blank\">版权所有</a>";
var huohuaMarketNav = huohuaMarketNav + "</p>";

//Build Copy Right Text
var copyRightEn = "<p id=\"copyRightEn\">Copyright &copy; 1998 - 2013 huohuaMarket. All Rights Reserved.</p>";
var copyRightCn = "<p id=\"copyRightCn\">腾讯公司 版权所有</p>";

//Build Empty Divs for Expand
var footerExpand = "<div id=\"expandDiv1\"><span></span></div><div id=\"expandDiv2\"><span></span></div><div id=\"expandDiv3\"><span></span></div><div id=\"expandDiv4\"><span></span></div><div id=\"expandDiv5\"><span></span></div>"

//Combine FooterHTML
var footerHTML = huohuaMarketNav + copyRightEn + copyRightCn;

document.write(footerHTML);