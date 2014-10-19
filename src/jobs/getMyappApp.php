<?php
	include("init.php");
	
	$topTypeId = 2;
	$channelid = -17;
	$typeid = 0;
	
	$url = "http://android.myapp.com/android/qrycategoryranking_web?";
	$pageInfo = new stdClass;
	$pageInfo -> cid = -1;
	$pageInfo -> ranktype = 0;
	$pageInfo -> icfa = "15144050000000000000";
	$pageInfo -> pageNo = 1;
	$pageInfo -> pageIndex = -1;
	$pageInfo -> pageSize = 10;
	$pageInfo -> r = "0.5975102682132274";
	$pageInfo -> pageCount = 30;
	
	$app = new App();
	
	$app -> addApps();
	
	$mysqlUtil -> close();
	$dsql -> Close();
?>