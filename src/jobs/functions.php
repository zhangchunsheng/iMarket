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
	
	function logFile($info) {
		global $file;
		$date = date("Y-m-d H24:i:s", time());
		fwrite($file, $date . " " . $info . "\n");
	}
	
	function get_pinyin($string) {
		global $pinyin_table;
		$flow = array();
		for ($i = 0; $i < strlen($string); $i++) {
			if (ord($string[$i]) >= 0x81 and ord($string[$i]) <= 0xfe) {
				$h = ord($string[$i]);
				if (isset($string[$i + 1])) {
					$i++;
					$l = ord($string[$i]);
					if (isset($pinyin_table[$h][$l])) {
						array_push($flow, $pinyin_table[$h][$l]);
					} else {
						array_push($flow, $h);
						array_push($flow, $l);
					}
				} else {
					array_push($flow, ord($string[$i]));
				}
			} else {
				array_push($flow, ord($string[$i]));
			}
		}
		
		$pinyin    = array();
		$pinyin[0] = '';
		for ($i = 0; $i < sizeof($flow); $i++) {
			if (is_array($flow[$i])) {
				if (sizeof($flow[$i]) == 1) {
					foreach ($pinyin as $key => $value) {
						$pinyin[$key] .= $flow[$i][0];
					}
				}
				if (sizeof($flow[$i]) > 1) {
					foreach ($pinyin as $key => $value) {
						$pinyin[$key] .= $flow[$i][0];
					}
				}
			} else {
				foreach ($pinyin as $key => $value) {
					$pinyin[$key] .= chr($flow[$i]);
				}
			}
		}
		return $pinyin[0];
	}
	
	function getApk($url) {
		/*//初始化
	　　$ch = curl_init();
	　　//设置选项，包括URL
	　　curl_setopt($ch, CURLOPT_URL, $url);
	　　curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	　　curl_setopt($ch, CURLOPT_HEADER, 0);
	　　//执行并获取HTML文档内容
	　　$output = curl_exec($ch);
	　　//释放curl句柄
	　　curl_close($ch);
	　　//打印获得的数据
	　　print_r($output);*/
	}
?>