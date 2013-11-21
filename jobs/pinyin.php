<?php
require_once('pinyin_table.php');

function get_pinyin_array($string) {
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

$text = <<< EOT
朱镕基看看多音字的情况，比如：还、乐。
EOT;

$flow = get_pinyin_array($text);
print_r($flow);
?>