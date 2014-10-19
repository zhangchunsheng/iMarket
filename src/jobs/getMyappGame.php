<?php
	include("init.php");
	
	$topTypeId = 3;
	$channelid = -17;
	$typeid = 0;
	
	$url = "http://android.myapp.com/android/qrycategoryranking_web?";
	$pageInfo = new stdClass;
	$pageInfo -> cid = 120;
	$pageInfo -> ranktype = 0;
	$pageInfo -> icfa = "15144206000120000000";
	$pageInfo -> pageNo = 1;
	$pageInfo -> pageIndex = -1;
	$pageInfo -> pageSize = 10;
	$pageInfo -> r = "0.16294923843815923";
	$pageInfo -> pageCount = 30;
	
	$app = new App();
	
	$app -> addApps();
	
	$mysqlUtil -> close();
	$dsql -> Close();
?>