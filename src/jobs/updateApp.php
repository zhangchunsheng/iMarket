<?php
	/**
	 * updateApp
	 * author: Zhang Chunsheng
	 * date: 2013-11-16
	 */
	error_reporting(E_ALL || ~E_NOTICE);
	include("init.php");
	
	$app = new App();
	
	$apps = $app -> getApps();
	foreach($apps as $key => $value) {
		$myapp_appid = $value["myapp_appid"];
		$appName = $value["appName"];
		$pinyinOfAppName = get_pinyin($appName);
		$sql = "update huohua_addonapp set pinyinOfAppName='$pinyinOfAppName' where myapp_appid='$myapp_appid'";
		$mysqlUtil -> query($sql);
	}
	
	$mysqlUtil -> close();
	$dsql -> Close();
	fclose($file);
?>