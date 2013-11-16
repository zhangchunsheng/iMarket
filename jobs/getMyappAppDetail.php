<?php
	include("init.php");
	
	$url = "http://android.myapp.com/android/appdetail.jsp?";
	$argument = new stdClass;
	$argument -> appid = 50801;
	$argument -> icfa = "15144102050801001000";
	$argument -> lmid = 2017;
	
	$file = fopen("appDetail.txt", "a");
	
	$app = new App();
	$appDetail = new AppDetail();
	
	$apps = $app -> getApps();
	foreach($apps as $key => $value) {
		$argument -> appid = $value["myapp_appid"];
		$appDetail -> updateApp($value);
	}
	
	$mysqlUtil -> close();
	$dsql -> Close();
	fclose($file);
?>