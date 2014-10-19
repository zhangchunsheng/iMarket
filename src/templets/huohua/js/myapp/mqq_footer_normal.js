//Build Huohuamarket Nav Links
var huohuaMarket = "<p id=\"huohuaMarket\">";
var huohuaMarket = huohuaMarket + "<a href=\"http://www.studyandthinkhtml5.com/\" target=\"_blank\">关于火花市场</a> | ";
var huohuaMarket = huohuaMarket + "<a href=\"http://www.studyandthinkhtml5.com/\" target=\"_blank\">版权所有</a>";
var huohuaMarket = huohuaMarket + "</p>";

//Build Copy Right Text
var copyRightEn = "<p id=\"copyRightEn\">Copyright &copy; 1998 - 2013 Huohuamarket. All Rights Reserved.</p>";
var copyRightCn = "<p id=\"copyRightCn\">火花市场 版权所有</p>";

//Build Empty Divs for Expand
var footerExpand = "<div id=\"expandDiv1\"><span></span></div><div id=\"expandDiv2\"><span></span></div><div id=\"expandDiv3\"><span></span></div><div id=\"expandDiv4\"><span></span></div><div id=\"expandDiv5\"><span></span></div>"

//Combine FooterHTML
var footerHTML = huohuaMarket + copyRightEn + copyRightCn;

document.write(footerHTML);