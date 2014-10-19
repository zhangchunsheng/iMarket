<?php
/**
 * 应用专题发布
 *
 * @version        $Id: subject_add.php 1 16:09 2010年7月20日Z tianya $
 * @package        DedeCMS.Administrator
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
require_once(dirname(__FILE__) . "/config.php");
CheckPurview('a_New,a_AccNew');
require_once(DEDEINC . '/customfields.func.php');
require_once(DEDEADMIN . '/inc/inc_archives_functions.php');
if(empty($dopost))
	$dopost = '';

if($dopost != 'save') {
	require_once(DEDEINC . '/dedetag.class.php');
	require_once(DEDEADMIN . '/inc/inc_catalog_options.php');
	ClearMyAddon();
	$channelid = empty($channelid) ? 0 : intval($channelid);
	$cid       = empty($cid) ? 0 : intval($cid);
	
	//获得频道模型ID
	if ($cid > 0 && $channelid == 0) {
		$row       = $dsql -> GetOne("SELECT channeltype FROM `#@__arctype` WHERE id='$cid'; ");
		$channelid = $row['channeltype'];
	} else {
		if ($channelid == 0) {
			ShowMsg("无法识别模型信息，因此无法操作！","-1");
            exit();
		}
	}
	
	//获得频道模型信息
	$cInfos     = $dsql -> GetOne(" SELECT * FROM  `#@__channeltype` WHERE id='$channelid' ");
	$channelid  = $cInfos['id'];
	
	include DedeInclude("templets/subject_add.htm");
	exit();
} else if ($dopost == 'save') {
	/*--------------------------------
	function __save(){  }
	-------------------------------*/
	require_once(DEDEINC . '/image.func.php');
	require_once(DEDEINC . '/oxwindow.class.php');
	
	$flag    = isset($flags) ? join(',', $flags) : '';
	$notpost = isset($notpost) && $notpost == 1 ? 1 : 0;
	if (empty($click))
		$click = ($cfg_arc_click == '-1' ? mt_rand(50, 200) : $cfg_arc_click);
	
	if (!isset($typeid2))
		$typeid2 = 0;
	if (!isset($autokey))
		$autokey = 0;
	if (!isset($remote))
		$remote = 0;
	if (!isset($dellink))
		$dellink = 0;
	if (!isset($autolitpic))
		$autolitpic = 0;
		
	if(empty($pubDate))
		$pubDate = time();
		
	if(empty($date)) {
		$date = time();
	}
	
	if ($typeid == 0) {
		ShowMsg("请指定文档的栏目！", "-1");
		exit();
	}
	if (empty($channelid)) {
		ShowMsg("文档为非指定的类型，请检查你发布内容的表单是否合法！", "-1");
		exit();
	}
	if (!CheckChannel($typeid, $channelid)) {
		ShowMsg("你所选择的栏目与当前模型不相符，请选择白色的选项！", "-1");
		exit();
	}
	if (!TestPurview('a_New')) {
		CheckCatalog($typeid, "对不起，你没有操作栏目 {$typeid} 的权限！");
	}
	
	//对保存的内容进行处理
	if (empty($writer))
		$writer = $cuserLogin->getUserName();
	if (empty($source))
		$source = '未知';
	$pubdate  = GetMkTime($pubdate);
	$senddate = time();
	$sortrank = AddDay($pubdate, $sortup);
	
	if ($ishtml == 0)
		$ismake = -1;
	else
		$ismake = 0;
	
	if (empty($click))
		$click = ($cfg_arc_click == '-1' ? mt_rand(50, 200) : $cfg_arc_click);
	
	$subjectName       = preg_replace('#"#', '＂', $subjectName);
	$subjectName       = cn_substrR($subjectName, $cfg_title_maxlen);
	$color       = cn_substrR($color, 7);
	$writer      = cn_substrR($writer, 20);
	$source      = cn_substrR($source, 30);
	$description = cn_substrR($description, $cfg_auot_description);
	$keywords    = cn_substrR($keywords, 60);
	$filename    = trim(cn_substrR($filename, 40));
	$userip      = GetIP();
	$isremote    = (empty($isremote) ? 0 : $isremote);
	$serviterm   = empty($serviterm) ? "" : $serviterm;
	if (!TestPurview('a_Check,a_AccCheck,a_MyCheck')) {
		$arcrank = -1;
	}
	$adminid = $cuserLogin -> getUserID();
	
	//处理上传的缩略图
	if (empty($ddisremote))
		$ddisremote = 0;
	$litpic = GetDDImage('none', $picname, $ddisremote);
	$litpic = $picture;
	
	//生成文档ID
	$arcID = GetIndexKey($arcrank, $typeid, $sortrank, $channelid, $senddate, $adminid);
	if (empty($arcID)) {
		ShowMsg("无法获得主键，因此无法进行后续操作！", "-1");
		exit();
	}
	
	//处理introduction字段自动摘要、自动提取缩略图等
	$introduction = AnalyseHtmlBody($introduction, $description, $litpic, $keywords, 'htmltext');
	
	//分析处理附加表数据
	$inadd_f = '';
	$inadd_v = '';
	if (!empty($dede_addonfields)) {
		$addonfields = explode(';', $dede_addonfields);
		$inadd_f     = '';
		$inadd_v     = '';
		if (is_array($addonfields)) {
			foreach ($addonfields as $v) {
				if ($v == '') {
					continue;
				}
				$vs = explode(',', $v);
				if (!isset(${$vs[0]})) {
					${$vs[0]} = '';
				} else if ($vs[1] == 'htmltext' || $vs[1] == 'textdata') //HTML文本特殊处理
					{
					${$vs[0]} = AnalyseHtmlBody(${$vs[0]}, $description, $litpic, $keywords, $vs[1]);
				} else {
					if (!isset(${$vs[0]})) {
						${$vs[0]} = '';
					}
					${$vs[0]} = GetFieldValueA(${$vs[0]}, $vs[1], $arcID);
				}
				$inadd_f .= ',' . $vs[0];
				$inadd_v .= " ,'" . ${$vs[0]} . "' ";
			}
		}
	}
	
	//处理图片文档的自定义属性
	if($litpic != '' && !preg_match('#p#', $flag)) {
		$flag = ($flag == '' ? 'p' : $flag . ',p');
	}
	if($redirecturl != '' && !preg_match('#j#', $flag)) {
		$flag = ($flag == '' ? 'j' : $flag . ',j');
	}
	
	//跳转网址的文档强制为动态
	if (preg_match('#j#', $flag))
		$ismake = -1;
	//保存到主表
	$inQuery = "INSERT INTO `#@__archives`(id,typeid,typeid2,sortrank,flag,ismake,channel,arcrank,click,money,title,shorttitle,
				color,writer,source,litpic,pubdate,senddate,mid,notpost,description,keywords,filename,dutyadmin,weight)
				VALUES ('$arcID','$typeid','$typeid2','$sortrank','$flag','$ismake','$channelid','$arcrank','$click','$money','$subjectName','$shorttitle',
				'$color','$writer','$source','$litpic','$pubdate','$senddate','$adminid','$notpost','$description','$keywords','$filename','$adminid','$weight');";
	if (!$dsql -> ExecuteNoneQuery($inQuery)) {
		$gerr = $dsql -> GetError();
		$dsql -> ExecuteNoneQuery("DELETE FROM `#@__arctiny` WHERE id='$arcID'");
		ShowMsg("把数据保存到数据库主表 `#@__archives` 时出错，请把相关信息提交给DedeCms官方。" . str_replace('"', '', $gerr), "javascript:;");
		exit();
	}
	
	//保存到附加表
	$cts      = $dsql -> GetOne("SELECT addtable FROM `#@__channeltype` WHERE id='$channelid' ");
	$addtable = trim($cts['addtable']);
	if (empty($addtable)) {
		$dsql->ExecuteNoneQuery("DELETE FROM `#@__archives` WHERE id='$arcID'");
		$dsql->ExecuteNoneQuery("DELETE FROM `#@__arctiny` WHERE id='$arcID'");
		ShowMsg("没找到当前模型[{$channelid}]的主表信息，无法完成操作！。", "javascript:;");
		exit();
	}
	$daccess = isset($daccess) && is_numeric($daccess) ? $daccess : 0;
	$useip   = GetIP();
	$inQuery = "INSERT INTO `$addtable`(aid,typeid,typeid2,topTypeId,sortrank,flag,ismake,channel,arcrank,click,title,shorttitle,
				color,writer,source,litpic,publishdate,senddate,mid,notpost,description,keywords,filename,dutyadmin,weight,
				subjectName,picture,date,pubDate,apps,goodNum,badNum{$inadd_f})
				VALUES ('$arcID','$typeid','$typeid2','$topTypeId','$sortrank','$flag','$ismake','$channelid','$arcrank','$click','$subjectName','$shorttitle',
				'$color','$writer','$source','$litpic','$pubdate','$senddate','$adminid','$notpost','$description','$keywords','$filename','$adminid','$weight',
				'$subjectName','$picture','$date','$pubDate','$apps','$goodNum','$badNum'{$inadd_v});";
	if (!$dsql -> ExecuteNoneQuery($inQuery)) {
		$gerr = $dsql -> GetError();
		$dsql -> ExecuteNoneQuery("DELETE FROM `#@__archives` WHERE id='$arcID'");
		$dsql -> ExecuteNoneQuery("DELETE FROM `#@__arctiny` WHERE id='$arcID'");
		ShowMsg("把数据保存到数据库附加表 `{$addtable}` 时出错，请把相关信息提交给DedeCms官方。" . str_replace('"', '', $gerr), "javascript:;");
		exit();
	}
	
	//生成HTML
	InsertTags($tags, $arcID);
	if ($cfg_remote_site == 'Y' && $isremote == "1") {
		if ($serviterm != "") {
			list($servurl, $servuser, $servpwd) = explode(',', $serviterm);
			$config = array(
				'hostname' => $servurl,
				'username' => $servuser,
				'password' => $servpwd,
				'debug' => 'TRUE'
			);
		} else {
			$config = array();
		}
		if (!$ftp->connect($config))
			exit('Error:None FTP Connection!');
	}
	
	$arcUrl = MakeArt($arcID, TRUE, TRUE, $isremote);
	if($arcUrl == '') {
		$arcUrl = $cfg_phpurl . "/view.php?aid=$arcID";
	}
	ClearMyAddon($arcID, $title);
	//返回成功信息
	$msg = "
    　　请选择你的后续操作：
    <a href='subject_add.php?cid=$typeid'><u>继续发布应用专题</u></a>
    &nbsp;&nbsp;
    <a href='$arcUrl' target='_blank'><u>查看应用专题</u></a>
    &nbsp;&nbsp;
    <a href='archives_do.php?aid=" . $arcID . "&dopost=editArchives'><u>更改应用专题</u></a>
    &nbsp;&nbsp;
    <a href='catalog_do.php?cid=$typeid&dopost=listArchives'><u>已发布应用专题管理</u></a>
    &nbsp;&nbsp;
    <a href='catalog_main.php'><u>网站栏目管理</u></a>
   ";
	$msg = "<div style=\"line-height:36px;height:36px\">{$msg}</div>" . GetUpdateTest();
	
	$wintitle    = "成功发布一个应用专题！";
	$wecome_info = "文章管理::发布应用专题";
	$win         = new OxWindow();
	$win->AddTitle("成功发布应用专题：");
	$win->AddMsgItem($msg);
	$winform = $win->GetWindow("hand", "&nbsp;", FALSE);
	$win->Display();
}