<?php
	/**
	 * 获得myapp分类
	 */
	/**
	 * file
	 * file_get_contents
	 * curl
	 */
	include("init.php");
	
	$sql = "truncate huohua_appchannel";
	$mysqlUtil -> query($sql);
	
	$typeid = 45;
	$channelid = -4;
	
	addNecessary();
	
	$mysqlUtil -> close();
	$dsql -> Close();
	
	function addNecessary() {
		global $mysqlUtil,$banner;
		$url = "http://android.myapp.com/android/qrynesseary_web?type=0&r=0.6568537969142199";
		$content = file_get_contents($url);
		$content = json_decode($content);
		
		$sql = "";
		$necessarys = $content -> info -> value;
		$type = "appchannel";
		foreach($necessarys as $key => $value) {
			$sql = getInsertSQL($value);
			beautiful_echo($sql);
			$mysqlUtil -> query($sql);
		}
		addGrapLog($type, 0, count($necessarys), 0);
	}
	
	function getInsertSQL($json) {
		$insertKeys = "type,name,myapp_appid";
		$insertValues = "'1','装机必备','".$json -> appid."'";
		$sql = "INSERT INTO huohua_appchannel($insertKeys) VALUES ($insertValues)";
		return $sql;
	}
?>