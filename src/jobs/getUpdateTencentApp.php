<?php
	include("init.php");
	
	$topTypeId = 2;
	$channelid = -17;
	$typeid = 5;
	
	$url = "http://android.myapp.com/android/qryinersoftrank_web?";
	$pageInfo = new stdClass;
	$pageInfo -> cid = 10013;
	$pageInfo -> ranktype = 0;
	$pageInfo -> icfa = "15144050000000000000";
	$pageInfo -> pageNo = 1;
	$pageInfo -> pageIndex = -1;
	$pageInfo -> pageSize = 10;
	$pageInfo -> r = "0.5975102682132274";
	$pageInfo -> pageCount = 12;
	
	$app = new App();
	
	$app -> updateTencentApp();
	
	$mysqlUtil -> close();
	$dsql -> Close();
?>