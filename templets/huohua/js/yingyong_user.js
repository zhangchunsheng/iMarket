document.domain = 'localhost' 
var my_return_url=document.location.href.replace(/\-/g, "%23" ).replace(/\//g, "%2F" ).replace(/\:/g, "%3A" );
    function get_cookie(varname)
{
	var tmp_ary = new Array();
	if (varname)
	{
		var a = document.cookie.indexOf(varname+"=");
		if (a != -1)
		{
			var b = document.cookie.substring((a+varname.length+1),document.cookie.length);
			var c = b.split(";");
			var d = c[0];
			return d;
		}
	}
}
	var my_cookie_temp;
	var m_temp = get_cookie("yingyongso_user");
	if (m_temp==''||typeof(m_temp)=='undefined')
	{	
		document.writeln("<table width=\"693\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\"470\" height=\"30\" align=\"right\" valign=\"middle\"><\/td><td width=\"50\" height=\"30\" align=\"center\" valign=\"middle\"><a href=\"\/user\/reg.htm\" target=\"_self\"><img border=\"0\" src=\".\/templets\/huohua\/images\/90-09-09-11.gif\" width=\"38\" height=\"20\" \/><\/a><\/td><td width=\"50\" height=\"30\" align=\"center\" valign=\"middle\"><a href=\"\/user\/login.aspx?returnurl="+my_return_url+"\" target=\"_self\"><img border=\"0\" src=\".\/templets\/huohua\/images\/90-09-09-12.gif\" width=\"38\" height=\"20\" \/><\/a><\/td><td width=\"19\" height=\"30\" align=\"center\" valign=\"middle\"><a title=\"ÐÂÀËÎ¢²©ÕËºÅµÇÂ¼\" href=\"\/user\/newweibologin.aspx?type=sina&action=login\" target=\"_self\"><img alt=\"ÐÂÀËÎ¢²©ÕËºÅµÇÂ¼\" border=\"0\" src=\".\/templets\/huohua\/images\/sina_login16.png\" width=\"16\" height=\"16\" \/><\/a><\/td><td width=\"19\" height=\"30\" align=\"center\" valign=\"middle\"><a title=\"ÌÚÑ¶Î¢²©ÕËºÅµÇÂ¼\" href=\"\/user\/newweibologin.aspx?type=qq&action=login\" target=\"_self\"><img alt=\"ÌÚÑ¶Î¢²©ÕËºÅµÇÂ¼\" border=\"0\" src=\".\/templets\/huohua\/images\/qq_login16.png\" width=\"16\" height=\"16\" \/><\/a><\/td><td height=\"30\" vAlign=\"middle\" width=\"63\" align=\"center\"><a href=\"http:\/\/m.yingyong.so\" target=\"_self\"><img border=\"0\" src=\".\/templets\/huohua\/images\/shoujiban.gif\" width=\"51\" height=\"20\"><\/a><\/td><\/tr><\/table>");
	}
	else
	{
    m_temp = decodeURI(m_temp);
    var arr_m_temp=m_temp.split("|");
	document.writeln(" <table width=\"693\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\"530\" height=\"30\" align=\"right\" valign=\"middle\" class=\"f12_white\">»¶Ó­Äú£¬"+arr_m_temp[0]+"<\/td><td width=\"50\" height=\"30\" align=\"center\" valign=\"middle\"><a href=\"\/user\/userindex.aspx?returnurl=" + my_return_url+ "\" target=\"_self\"><img border=\"0\" src=\".\/templets\/huohua\/images\/90-09-09-13.gif\" width=\"38\" height=\"20\" \/><\/a><\/td><td width=\"50\" height=\"30\" align=\"center\" valign=\"middle\"><a href=\"\/user\/logout.aspx?returnurl=" + my_return_url+ "\" target=\"_self\"><img border=\"0\" src=\".\/templets\/huohua\/images\/90-09-09-14.gif\" width=\"38\" height=\"20\" \/><\/a><\/td><td height=\"30\" vAlign=\"middle\" width=\"63\" align=\"center\"><a href=\"http:\/\/m.huohua.com\" target=\"_self\"><img border=\"0\" src=\".\/templets\/huohua\/images\/shoujiban.gif\" width=\"51\" height=\"20\"><\/a><\/td><\/tr><\/table>");		
	}


