//控制滚动
function verticalloop(i,left)
{
	  var lineH=117; //获取行高
      var line=i; //每次滚动的行数
      var speed=200; //卷动速度，数值越大，速度越慢（毫秒）
	  var upHeight=0-line*lineH;
	  var _this =$("#content").eq(0);
	  _this.animate({marginTop:upHeight },speed,function()
	  {
			for(i=0;i<line;i++)
			{
			   _this.find("ul:first").appendTo(_this);
			}
			_this.css({marginTop:0});
			Set(left);
	  });
}  
function Set(left)
{
	$("#ZheZhao").show();
	$("#sanjiao").show();
	document.getElementById("sanjiao").style.left=left+'px';
	$("#topImg").slideDown("fast");
}
function Reset()
{
	$("#topImg").slideUp("fast");
	$("#ZheZhao").hide();
	$("#sanjiao").hide();
}

var myArr=new Array();
myArr[0] = 'id1';
myArr[1] = 'id2';
myArr[2] = 'id3';

function Show(left,index,myclassid)
{
   var strcommon='<ul>';
    for(var i=0;i<arraycommon.length;i++)
	     { 
            var arraycommon_TR=new Array(); 
            arraycommon_TR=arraycommon[i];
            if(arraycommon_TR[0]==myclassid)
            {
             strcommon=strcommon+'<li><p class="topImgbj"><a href="'+arraycommon_TR[2]+'"><img src="/img/logo/'+arraycommon_TR[3]+'" /></a></p><p>'+arraycommon_TR[1]+'</p></li>';
             }
         }
         strcommon=strcommon+'</ul>';
 document.getElementById("topImg").innerHTML = strcommon;
	if(myArr[0]==index)//
	{	
		Set(left);
		 
	}
	if(myArr[1]==index)//
	{	
		myArr[1] = myArr[2];
		myArr[2] = myArr[0];
		myArr[0] = index;
		verticalloop(1,left);
		 
	}
	if(myArr[2]==index)//
	{	
		myArr[2] = myArr[1];
		myArr[1] = myArr[0];
		myArr[0] = index;
		verticalloop(2,left); 
	}
}
function CheckSearch()
{
	if(document.getElementById('q').value=="")
	{
		return false;
	}
	document.getElementById('searchform').action="/search/default.aspx?q="+document.getElementById('q').value;
	return true;
}
function FocusImg(bigDiv,smallDiv,titleDiv,imgW,imgH,imgList,sTime)
{
	var $=function (obj){return document.getElementById(obj);}
	this.bigDiv=bigDiv;this.smallDiv=smallDiv,this.imgW=imgW;this.imgH=imgH;
	this.imgList=[];
	this.sTime=sTime;
	this.titleDiv=titleDiv;
	var scrollDiv;
	var smallImgList=[];
	var imgHeight,_bigDiv;
	var timer,autoTimer;
	var ctitle;
	var t=this;
	this.curId=0;
	var smallPicArr=[];
	var mypic=document.createElement("img");
	var mypicLink=document.createElement("a");
	this.init=function()//初始化
	{						
		mypic.width=this.imgW;
		mypic.height=this.imgH;
		imgHeight=this.imgH;
		_bigDiv=this.bigDiv;
		_titleDiv=this.titleDiv;
		_imgList=this.imgList;
		scrollDiv=document.createElement("div");
		mypicLink.target="_self";
		mypicLink.appendChild(mypic);
		scrollDiv.appendChild(mypicLink);

		for ( var i = 0; i < this.imgList.length ; i++ )
		{
			//创建小图区域
			var slspan=document.createElement("div");
			slspan.className="small_div";
			//var slimglink=document.createElement("a");
			//slimglink.target="_self";
			//slimglink.href=this.imgList[i].url;
			var slimg=document.createElement("img");
			slimg.src=this.imgList[i].bigimg;
			//slimglink.appendChild(slimg);
			slspan.appendChild(slimg);
			smallPicArr.push(slspan);
			(function(){
				var itemid=i;				
				slspan.onclick=function()
				{
					t.doPic(itemid);
					t.curId=itemid;
					clearInterval(autoTimer);
					t.autoPlay();
				}

			})();
			$(this.smallDiv).appendChild(slspan);

		}
		$(this.bigDiv).style.width=this.imgW+"px";
		$(this.bigDiv).style.height=this.imgH+"px";
		$(this.bigDiv).style.overflow="hidden";
		$(this.bigDiv).appendChild(scrollDiv);
		this.doPic(0);

	};
	this.doPic=function(id)
	{		
		try{clearTimeout(timer)}catch(e){};
		$(this.titleDiv).innerHTML="<a href=\""+this.imgList[id].url+"\">"+this.imgList[id].title+"</a>";
		mypicLink.href=this.imgList[id].url;
		if (document.all)
		{
			mypic.filters.revealTrans.Transition=23;
			mypic.filters.revealTrans.apply();
			mypic.filters.revealTrans.play();
		}
		mypic.src=this.imgList[id].bigimg;
		//小图区域特效
		for (i = 0; i < smallPicArr.length ; i++ )
		{
			smallPicArr[i].className = smallPicArr[i].className.replace("selected" , "");
		}
		smallPicArr[id].className += " selected";
	}
	this.autoPlay=function()
	{
		autoTimer=setInterval(function(){
			t.curId++;
			if (t.curId >= t.imgList.length)
			  t.curId = 0 ;
			t.doPic(t.curId);
		},this.sTime);
	}
	function callback(v)
	{
		$(_bigDiv).scrollTop = v;
	}
	function animate(beginV,endV)
	{
		x = endV - beginV;
		beginV += (x/4);
		if (Math.abs(beginV-endV) <= 1)
		{
			beginV = endV ;
			callback(endV);
		}
		else
		{			
			callback(beginV);
			timer=setTimeout(function(){animate(beginV,endV)},10);
		}
	}
}
function CheckSearch2()
{
	if(document.getElementById('subject').value=="" || document.getElementById('subject').value=="没找到？再来一次")
	{
		alert('请输入搜索关键词!')
		return false;
	}
	document.getElementById('searchform2').action="/search/default.aspx?q="+document.getElementById('subject').value;
	return true;
}
function CheckInput()
{
 if(document.getElementById('subject').value=="没找到？再来一次")
 {
	document.getElementById('subject').value="";
 }
}
 function settabcontent(cataid,id)
 {
	document.getElementById("tabcontent"+cataid).style.backgroundImage= "url(/images/yingyong.so-00-88-0"+id+".gif)"; 
	document.getElementById("softmore"+cataid).href="/topapp-"+cataid+"-"+id+"/";
	for(var i=1;i<4;i++)
	{
		if(i!=id)
		{
			document.getElementById("softlist"+cataid+"_"+i).style.display="none";
		}else
		{
		    document.getElementById("softlist"+cataid+"_"+i).style.display="block";
		}
	}
}

function GetModelInfo(modelid)
{
         var CompanyID;
         var OtherNames;
         var OtherNames2;
         var DeviceImg;
         for(var i=0;i<arraymodel.length;i++)
	     { 
            var arraymodel_TR=new Array(); 
            arraymodel_TR=arraymodel[i];
            if(arraymodel_TR[1]==modelid)
            {
               CompanyID=arraymodel_TR[0];
               OtherNames=arraymodel_TR[3];
               OtherNames2=arraymodel_TR[4];
               DeviceImg=arraymodel_TR[5];
               break;
             }
         }
								var phonecontent="";
								phonecontent+="<table border=\"0\" cellSpacing=\"0\" cellPadding=\"0\" width=\"100%\" height=\"172\">";
								phonecontent+="<tbody>";
								phonecontent+="<tr>";
								phonecontent+="<td height=\"10\"><img src=\"/images/spacer.gif\" width=\"1\" height=\"10\"></td>";
								phonecontent+=" </tr>";
								phonecontent+=" <tr>";
								phonecontent+="<tr>";
								phonecontent+=" <td rowspan=\"2\" vAlign=\"top\">";
								phonecontent+="<table width=\"120\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">";
								phonecontent+="                    <tr>";
								phonecontent+="                      <td colspan=\"2\" align=\"center\"><img src=\"/images\/logo/"+CompanyID+".gif\" width=\"116\" height=\"49\"><\/td>";
								phonecontent+="                    <\/tr>";
								phonecontent+="                    <tr>";
								phonecontent+="                      <td height=\"40\" colspan=\"2\"><span class=\"f14\">"+OtherNames+"<\/span><br>";
								if(OtherNames2!="")
								{
									phonecontent+="                        <span class=\"f14_black\">（"+OtherNames2+"）<\/span>";
								}
								phonecontent+="                        <\/td>";
								phonecontent+="                    <\/tr>";
                                

								 if($.cookie("ChangeMyApp")!=null)//需要过滤
								 {
									phonecontent+=" <tr>";
									phonecontent+="<td height=\"30\" colspan=\"2\" align=\"center\" valign=\"middle\"><a style=\"color:#000000;text-decoration:none;font-family: 微软雅黑; FONT-SIZE:12px;\" href=\"/blog/0/42/\">仅显示本机可用应用</a></td>";
									phonecontent+=" </tr>";
									phonecontent+=" <tr>";
									phonecontent+="<td width=\"75\" align=\"right\"><a style=\"color:#1F2B5B; font-size:14px;\" onclick=\"javascript:SetChange()\" href=\"javascript:;\" target=\"_self\"><img id=\"changemyapppic\" src=\"/images/000-099-775.png\" width=\"60\" height=\"21\" /></a></td>";
									phonecontent+=" <td width=\"45\" align=\"center\" style=\"font-family: 微软雅黑; FONT-SIZE:14px;\" id=\"changemyapptip\">开启</td>";
									phonecontent+=" </tr>";
								 }else
								 {
									phonecontent+=" <tr>";
									phonecontent+="<td height=\"30\" colspan=\"2\" align=\"center\" valign=\"middle\"><a style=\"color:#000000;text-decoration:none;font-family: 微软雅黑; FONT-SIZE:12px;\" href=\"/blog/0/42/\">仅显示本机可用应用</a></td>";
									phonecontent+=" </tr>";
									phonecontent+=" <tr>";
									phonecontent+="<td width=\"75\" align=\"right\"><a style=\"color:#1F2B5B; font-size:14px;\" onclick=\"javascript:SetChange()\" href=\"javascript:;\" target=\"_self\"><img id=\"changemyapppic\" src=\"/images/000-099-776.png\" width=\"60\" height=\"21\" /></a></td>";
									phonecontent+=" <td width=\"45\" align=\"center\" style=\"font-family: 微软雅黑; FONT-SIZE:14px;\" id=\"changemyapptip\">关闭</td>";
									phonecontent+=" </tr>";
								}
		
								 phonecontent+="                <\/tbody> <\/table>";	

								 phonecontent+="</td>";
								 phonecontent+=" <td align=\"center\" width=\"100\"><img src=\""+"/img/jixing/"+DeviceImg+"\" width=\"90\" height=\"120\"></td>";
								 phonecontent+="</tr>";
								
								 phonecontent+=" <tr>";
								 phonecontent+="<td height=\"30\" align=\"center\" valign=\"middle\"><a style=\"color:#1F2B5B; font-size:14px;\" onclick=\"javascript:DelCookie()\" href=\"javascript:;\" target=\"_self\">重选机型</a></td>";
								 phonecontent+=" </tr>";
								 phonecontent+="</tbody>";
								 phonecontent+=" </table>";
								
								 document.getElementById("myphonehtml").innerHTML=phonecontent;
                            
}

function DelCookie()
{
        var modelname=$.cookie("ModelName");
        var modelid=$.cookie("ModelID");
        var companyname=$.cookie("CompanyName");
	    $.cookie("ModelName", null,{ path: '/',domain:'yingyong.so', expires: 10 }); 
	    $.cookie("ModelID", null,{ path: '/',domain:'yingyong.so', expires: 10 }); 
	    $.cookie("CompanyName", null,{ path: '/',domain:'yingyong.so', expires: 10 }); 
	    if(docurl.indexOf('/blog/')>0 || docurl.indexOf('/app/')>0  || docurl.indexOf('/user/')>0)
	    {
	        SetStartSelect();
	    }else
	    {
	        window.location.href = top.location.href.replace(companyname+'-'+modelname+'-'+modelid+'/','');
	    }
}
function SetChange()
{
    if($.cookie("ChangeMyApp")!=null)//需要过滤
	{
	    $.cookie("ChangeMyApp",null, { path: '/',domain:'yingyong.so', expires: 10 });
		$("#searchtitle").html("关闭");
		document.getElementById('changemyapppic').src="/images/000-099-776.png";
		if(docurl.indexOf('/blog/')>0 || docurl.indexOf('/app/')>0  || docurl.indexOf('/user/')>0)
	    {
 updateUrl();
	    }else
		{
		window.location.href = top.location.href.replace($.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID")+'/','');
		}
		
		
	}else
	{
	    $.cookie("ChangeMyApp",1, { path: '/',domain:'yingyong.so', expires: 10 });
		$("#changemyapptip").html("开启");
		document.getElementById('changemyapppic').src="/images/000-099-775.png";
		if(docurl.indexOf('/blog/')>0 || docurl.indexOf('/app/')>0  || docurl.indexOf('/user/')>0)
	    {
  updateUrl();
	    }else
	    {
	    window.location.href = top.location.href+$.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID")+'/';
	    }
	   
		
	}

}
$().ready(function() {
	if(document.getElementById('dialog')!=null)
	{
	$('#dialog').jqm();
	}
	});
function SetMyModel(modelid)
{

	   //开始写cookie
        var comapnyename='';
        var modelname='';
         for(var i=0;i<arraymodel.length;i++)
	     { 
            var arraymodel_TR=new Array(); 
            arraymodel_TR=arraymodel[i];
            if(arraymodel_TR[1]==modelid)
            {
              comapnyename=arraymodel_TR[6];
              modelname=arraymodel_TR[2];
              break;
             }
         }
        $.cookie("CompanyName",comapnyename.toLowerCase(), { path: '/',domain:'yingyong.so',expires: 10 });
		$.cookie("ModelName",modelname.toLowerCase(), { path: '/',domain:'yingyong.so',expires: 10 });
	    $.cookie("ModelID",modelid, { path: '/',domain:'yingyong.so',expires: 10 });	
		$.cookie("ChangeMyApp",1, { path: '/',domain:'yingyong.so', expires: 10 });
		if(docurl.indexOf('/blog/')>0 || docurl.indexOf('/app/')>0  || docurl.indexOf('/user/')>0)
		{
		    GetModelInfo(modelid);
		}else
		{
			window.location.href = top.location.href+$.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID")+'/';
		}
	    updateUrl();
}
 function submitsearch()
 {
	 if(document.getElementById("keyvalue").value=="")
	 {
		 return;
		 }
	 //获取搜索结果数据
	 $.ajax({  
   url:"/GetModelListByKey.aspx",  
   data:{
       keyvalue:escape(document.getElementById("keyvalue").value)
   },  
    cache:false,  
    dataType:"json",  
    success:function(msg){  
	    var data=msg.ds; 
		var jixingdata="";
                   $.each(data,function(i,n)
                               { 
							  	 var arrsoftname=n.OtherNames.split(',');
								 jixingdata+="    <li onmousemove=\"$(this).addClass('libg001')\" onmouseout=\"$(this).removeClass('libg001')\">";
								 jixingdata+="      <p><a onclick=\"SetMyModel("+n.ID+")\" href=\"javascript:;\" target=\"_self\"><img src=\"/img\/jixing\/"+n.DeviceImg+"\"><\/a><\/p>";
								 jixingdata+="      <p class=\"searchtxt\"><a onclick=\"SetMyModel("+n.ID+")\" href=\"javascript:;\" target=\"_self\">"+n.CompanyName+" "+arrsoftname[0]+"<\/a><\/p>";
								 jixingdata+="    <\/li>";
                              } 
							
                 );
				   if(jixingdata=="")
				   {$("#searchtitle").html("没有找到相关机型，请重新搜索。");
				   $("#searchbottom").html("");
				    $("#selectjixing").html(jixingdata);
					   }else
					   {
						   				 $("#selectjixing").html(jixingdata);
										 $("#searchtitle").html("您的机型是否是：");
				   						 $("#searchbottom").html("没有您的机型？请尝试更精确关键字搜索。");
					   }


    }
	}  
);				 
	 
	$('#dialog').jqmShow();
	document.getElementById("dialog").focus();
	return false;
 }
 function SetStartSelect()
 {
            var phonecontent="";
			phonecontent+="<form action=\"#\" style=\"margin:0px;\" onsubmit=\"return submitsearch();\" target=\"_self\"><table border=\"0\" cellSpacing=\"0\" cellPadding=\"0\" width=\"100%\" height=\"172\">";
            phonecontent+="<tbody>";
            phonecontent+=" <tr>";
            phonecontent+="<td height=\"10\"><img src=\"/images/spacer.gif\" width=\"1\" height=\"10\"></td>";
            phonecontent+="</tr>";
            phonecontent+="<tr>";
            phonecontent+="<td vAlign=\"top\">";
			phonecontent+="<table border=\"0\" cellSpacing=\"0\" cellPadding=\"0\" width=\"100%\">";
			phonecontent+="  <tbody>";
			phonecontent+="<tr>";
            phonecontent+=" <td height=\"20\" vAlign=\"middle\" style=\"color:#3063B4; font-size:12px;\" align=\"center\"><a style=\"color:#3063B4;text-decoration:none;\" href=\"/blog/0/42/\">选择机型开启应用过滤</a></td>";
            phonecontent+=" </tr>";
			phonecontent+="    <tr>";
			phonecontent+="      <td align=\"center\" height=\"45\" valign=\"middle\"><select style=\"width: 111px; height: 28px;\" id=\"selectbrand\" name=\"select\">";
			phonecontent+="          <option value=\"0\">品牌选择<\/option>";
			phonecontent+="          <option value=\"62\">HTC<\/option>";
			phonecontent+="          <option value=\"63\">摩托罗拉<\/option>";
			phonecontent+="          <option value=\"64\">三星<\/option>";
			phonecontent+="          <option value=\"65\">索尼爱立信<\/option>";
			phonecontent+="          <option value=\"66\">LG<\/option>";
           	phonecontent+="          <option value=\"89\">小米<\/option>";
			phonecontent+="          <option value=\"67\">魅族<\/option>";
			phonecontent+="          <option value=\"68\">联想<\/option>";
			phonecontent+="          <option value=\"69\">华硕<\/option>";
			phonecontent+="          <option value=\"70\">宏碁<\/option>";
			phonecontent+="          <option value=\"71\">技嘉<\/option>";
			phonecontent+="          <option value=\"72\">戴尔<\/option>";
			phonecontent+="          <option value=\"73\">飞利浦<\/option>";
			phonecontent+="          <option value=\"74\">华为<\/option>";
			phonecontent+="          <option value=\"75\">中兴<\/option>";
			phonecontent+="          <option value=\"76\">阿尔卡特<\/option>";
			phonecontent+="          <option value=\"77\">夏普<\/option>";
			phonecontent+="          <option value=\"83\">酷派<\/option>";
			phonecontent+="          <option value=\"84\">TCL<\/option>";
			phonecontent+="          <option value=\"85\">天语<\/option>";
			
			phonecontent+="          <option value=\"102\">明基<\/option>";
			phonecontent+="          <option value=\"103\">爱国者<\/option>";
			phonecontent+="          <option value=\"101\">海信<\/option>";
			phonecontent+="          <option value=\"104\">创维<\/option>";
			phonecontent+="          <option value=\"105\">昂达<\/option>";
			phonecontent+="          <option value=\"106\">优派<\/option>";
			phonecontent+="          <option value=\"107\">纽曼<\/option>";
			phonecontent+="          <option value=\"108\">蓝魔<\/option>";
			phonecontent+="          <option value=\"109\">台电<\/option>";
			phonecontent+="          <option value=\"110\">万利达<\/option>";
			phonecontent+="          <option value=\"111\">金立<\/option>";
			phonecontent+="          <option value=\"112\">智器<\/option>";

			phonecontent+="          <option value=\"87\">谷果<\/option>";
        	phonecontent+="          <option value=\"100\">首派<\/option>";
			phonecontent+="          <option value=\"113\">欧盛<\/option>";
			phonecontent+="          <option value=\"114\">艾诺<\/option>";
			phonecontent+="        <\/select><\/td>";
			phonecontent+="    <\/tr>";
			phonecontent+="    <tr>";
			phonecontent+="      <td align=\"center\" height=\"45\" valign=\"middle\"><select style=\"width: 111px; height: 28px;\" id=\"selectmodel\" name=\"select\">";
			phonecontent+="          <option value=\"0\">机型选择<\/option>";
			phonecontent+="        <\/select><\/td>";
			phonecontent+="    <\/tr>";
			phonecontent+="  <\/tbody>";
			phonecontent+="<\/table>";
			phonecontent+="</td>";
            phonecontent+=" <td width=\"100\"><img src=\"/images/90-120-001.gif\" width=\"90\" height=\"120\"></td>";
            phonecontent+=" </tr>";
            phonecontent+=" <tr height=\"40\">";
            phonecontent+="<td vAlign=\"middle\" align=\"right\"><input style=\"border: 1px solid rgb(152, 181, 213); width: 123px; height: 20px; color: rgb(204, 204, 204);\" id=\"keyvalue\"onclick=\"javascript:document.getElementById('keyvalue').value='';document.getElementById('keyvalue').focus();\" value=\"渴望HD\" type=\"text\" /></td>";
            phonecontent+=" <td align=\"center\"><img onclick=\"javascript:submitsearch();\" src=\"/images/000-099-790.gif\" width=\"69\" height=\"22\" /></td>";
            phonecontent+=" </tr>";
			phonecontent+=" </tbody>";
			phonecontent+=" </table><\/form>";
			phonecontent+="<div class=\"jqmWindow\" id=\"dialog\"><div style=\"width:20px; float:right;\"><a href=\"#\" class=\"jqmClose\">X<\/a><\/div><br />";
			phonecontent+="  <hr>";
			phonecontent+="  <span id=\"searchtitle\">您的机型是否是：<\/span>";
			phonecontent+="  <ul id=\"selectjixing\">";
			phonecontent+="  <\/ul>";
			phonecontent+="<span id=\"searchbottom\">没有您的机型？请尝试更精确关键字搜索。</span>";
			phonecontent+="<\/div>";
		    document.getElementById("myphonehtml").innerHTML=phonecontent;
		    
		    $("#selectbrand").change(function()
    {
        if($("#selectbrand").val()=="0")
        {
          return;
        }
        $("#selectmodel").empty();
        $("#selectmodel").append("<option value='0'>机型选择</option>");
        
         for(var i=0;i<arraymodel.length;i++)
	     { 
            var arraymodel_TR=new Array(); 
            arraymodel_TR=arraymodel[i];
            if(arraymodel_TR[0]==$("#selectbrand").val())
            {
               $("#selectmodel").append("<option value='"+arraymodel_TR[1]+"'>"+arraymodel_TR[2]+"</option>");
             }
             
         }
    }); 
    
        $("#selectmodel").change(function()
        {
                  if($("#selectmodel").val()=="0")
                    {
                                return;
                    }
        //开始写cookie
        var comapnyename='';
         for(var i=0;i<arraycompany.length;i++)
	     { 
            var arraycompany_TR=new Array(); 
            arraycompany_TR=arraycompany[i];
            if(arraycompany_TR[0]==$("#selectbrand").val())
            {
              comapnyename=arraycompany_TR[2]
              break;
             }
         }
        
        $.cookie("CompanyName",comapnyename.toLowerCase(), { path: '/',domain:'yingyong.so',expires: 10 });
		$.cookie("ModelName",$("#selectmodel").find("option:selected").text().toLowerCase(), { path: '/',domain:'yingyong.so',expires: 10 });
	    $.cookie("ModelID",$("#selectmodel").val(), { path: '/',domain:'yingyong.so',expires: 10 });	
		$.cookie("ChangeMyApp",1, { path: '/',domain:'yingyong.so', expires: 10 });
		if(docurl.indexOf('/blog/')>0 || docurl.indexOf('/app/')>0  || docurl.indexOf('/user/')>0)
		{
		    GetModelInfo($.cookie("ModelID"));
		}else
		{
			window.location.href = top.location.href+$.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID")+'/';
		}
	        updateUrl();
		
        }); 
 }
 //更新blog和应用详细页面
 var updateUrl = function(){  

    $('a[name="updateurl"]').each(function(){
    //存在cookie  过滤  不过滤 $.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID")
    if($.cookie("ModelID")!=null && $.cookie("CompanyName")!=null && $.cookie("ModelName")!=null)
    {
       if($(this).attr("href").indexOf($.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID"))>0)
       {
            if($.cookie("ChangeMyApp")==null)//不需要过滤
            {
                this.href =  $(this).attr("href").replace($.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID")+'/','');   
            }
       }else
       {
            if($.cookie("ChangeMyApp")!=null)//需要过滤
            {
                this.href =  $(this).attr("href")+$.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID")+'/';   
            }
       }
    }else//不存在cookie
        {
            if($(this).attr("href").indexOf($.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID"))>0)
            {
             this.href =  $(this).attr("href").replace($.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID")+'/','');   
            }
        }
   });  
}

function StartJS()
{
        var urlParames = docurl.split("/");
        var len = urlParames.length;
		if(docurl.indexOf('appcatalog')>0 ||docurl.indexOf('topapp')>0||docurl.indexOf('allapp')>0||docurl.indexOf('myapp')>0||docurl.indexOf('allmyfavapp')>0 ||docurl.indexOf('allmydownapp')>0 ||docurl.indexOf('myfavapp')>0 ||docurl.indexOf('apprecomm')>0 )
		{
			    if(len>5)//筛选
			    {
					//判断是否有cookie 没有cookie的话写cookie
					if($.cookie("ModelID")==null || $.cookie("CompanyName")==null || $.cookie("ModelName")==null)
					 {
					    //写cookie
					    var urlpar=urlParames[4].split('-');
					    $.cookie("CompanyName",urlpar[0], { path: '/',domain:'yingyong.so',expires: 10 });
		                $.cookie("ModelName",urlpar[1], { path: '/',domain:'yingyong.so',expires: 10 });
		                $.cookie("ModelID",urlpar[2], { path: '/',domain:'yingyong.so',expires: 10 });
		                $.cookie("ChangeMyApp",1, { path: '/',domain:'yingyong.so', expires: 10 });
					 }else//判断cookie 是否和url记录一样
					 {
					   if(urlParames[4]!=$.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID"))
					     {
					         if($.cookie("ChangeMyApp")!=null)
					         {
    					        window.location.href = top.location.href.replace(urlParames[4],$.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID"));
					         }else
					         {
    					        window.location.href = top.location.href.replace(urlParames[4]+'/','');
					         }  
					     }else
					     {
					        if($.cookie("ChangeMyApp")==null)
					        {
					            window.location.href = top.location.href.replace(urlParames[4]+'/','');
					        }
					     }
					 
					 }
				}else//全部
				{
					//假如有cookie需要跳转
					if($.cookie("ModelID")!=null && $.cookie("CompanyName")!=null && $.cookie("ModelName")!=null && $.cookie("ChangeMyApp")!=null)
					{
					  window.location.href = top.location.href+$.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID")+'/';
					}
					
				}
		}else if(docurl.indexOf('/blog/')>0 || docurl.indexOf('/app/')>0 || docurl.indexOf('/user/')>0)
		{
		  
		}
		else if(len>4)//筛选
		{
			        //判断是否有cookie 没有cookie的话写cookie
			        if($.cookie("ModelID")==null || $.cookie("CompanyName")==null || $.cookie("ModelName")==null)
					 {
					    //写cookie
					    var urlpar=urlParames[3].split('-');
					    $.cookie("CompanyName",urlpar[0], { path: '/',domain:'yingyong.so',expires: 10 });
		                $.cookie("ModelName",urlpar[1], { path: '/',domain:'yingyong.so',expires: 10 });
		                $.cookie("ModelID",urlpar[2], { path: '/',domain:'yingyong.so',expires: 10 });
		                $.cookie("ChangeMyApp",1, { path: '/',domain:'yingyong.so', expires: 10 });
					 }else
					 {
					     if(urlParames[3]!=$.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID"))
					     {
					          if($.cookie("ChangeMyApp")!=null)
					             {
    					            window.location.href = top.location.href.replace(urlParames[3],$.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID"));
					             }else
					             {
    					            window.location.href = top.location.href.replace(urlParames[3]+'/','');
					             }  
					     }else
					     {
					        if($.cookie("ChangeMyApp")==null)
					        {
					            window.location.href = top.location.href.replace(urlParames[3]+'/','');
					        }
					     }
					 }
		}else
		{
		            //假如有cookie需要跳转
					if($.cookie("ModelID")!=null && $.cookie("CompanyName")!=null && $.cookie("ModelName")!=null && $.cookie("ChangeMyApp")!=null)
					{
					  window.location.href = top.location.href+$.cookie("CompanyName")+'-'+$.cookie("ModelName")+'-'+$.cookie("ModelID")+'/';
					}
		
		}
}


function AddMyFav(appid)
{
 $.post("/user/GetMyFav.aspx",{appid:appid,actiontype:1},function(data)
{if(data!='')
	 {
         if(data=='0')	
 {
alert('请先登录!');
}else if(data=='1')
{
alert('收藏成功,请至“我的应用”查看!');
}else if(data=='2')
{
alert('您已经收藏过本应用了!');
}else if(data=='3')
{
alert('服务器超时!');
}else if(data=='5')
{
alert('您的收藏夹已达容量上限!');
}
else
{
alert('操作有误!');
}

	} });

}

 