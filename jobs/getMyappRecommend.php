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
	
	$typeid = 45;
	$channelid = -4;
	
	addRecommend();
	
	$mysqlUtil -> close();
	$dsql -> Close();
	
	function addRecommend() {
		global $mysqlUtil,$banner;
		$url = "http://android.myapp.com/android/dayrecommend_web?pageNo=1&pageSize=15&r=0.5633281266782433";
		$content = file_get_contents($url);
		$content = json_decode($content);
		
		$sql = "";
		$necessarys = $content -> info -> todayList;
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
		$insertValues = "'2','精品推荐','".$json -> appid."'";
		$sql = "INSERT INTO huohua_appchannel($insertKeys) VALUES ($insertValues)";
		return $sql;
	}
?>