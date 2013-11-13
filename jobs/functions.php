<?php
	function beautiful_echo($content) {
		if(DEBUG)
			echo $content . "\r\n";
	}
	
	function file_get_contents_utf8($fn) {
		 $content = file_get_contents($fn);
		  return mb_convert_encoding($content, 'UTF-8',
			  mb_detect_encoding($content, 'UTF-8, ISO-8859-1', true));
	}
	
	function addGrapLog($type, $pageNo, $allpage, $perpage, $url) {
		global $mysqlUtil;
		$date = time();
		$sql = "INSERT INTO grap_log(`type`,pageNo,allpage,perpage,`date`,url) VALUES ('$type','$pageNo','$allpage','$perpage','$date','$url')";
		$mysqlUtil -> query($sql);
	}
	
	function addAppLog($type, $method, $sqlInfo) {
		global $mysqlUtil;
		$date = time();
		$sqlInfo = urlencode($sqlInfo);
		//$sqlInfo = str_replace("'", "\'", $sqlInfo);
		$sql = "INSERT INTO app_log(`type`,method,`sql`,`date`) VALUES ('$type','$method','$sqlInfo','$date')";
		$mysqlUtil -> query($sql);
	}
?>