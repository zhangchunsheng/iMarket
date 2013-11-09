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
	
	function addGrapLog($type, $pageNo, $allpage, $perpage) {
		global $db;
		$date = time();
		$sql = "INSERT INTO grap_log(`type`,pageNo,allpage,perpage,`date`) VALUES ('$type','$pageNo','$allpage','$perpage','$date')";
		$db -> query($sql);
	}
?>