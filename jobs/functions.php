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
		global $mysqlUtil;
		$date = time();
		$sql = "INSERT INTO grap_log(`type`,pageNo,allpage,perpage,`date`) VALUES ('$type','$pageNo','$allpage','$perpage','$date')";
		$mysqlUtil -> query($sql);
	}
	
	class Entity {
		public $tableName = "";
		
		public function __construct($tableName) {
			$this -> tableName = $tableName;
		}
		
		function getInsertSQL($json) {
			$sql = "insert into " . $this -> tableName . "(";
			foreach($this as $key => $value) {
				if($key == "tableName")
					continue;
				$sql .= "$key,";
			}
			$sql = substr($sql, 0, strlen($sql) - 1);
			$sql .= ") values (";
			$reflect = new ReflectionObject($json);
			foreach($this as $key => $value) {
				if($key == "tableName")
					continue;
				if($reflect -> hasProperty($key)) {
					$sql .= "'" . $json -> $key . "',";
				} else {
					$sql .= "'',";
				}
			}
			$sql = substr($sql, 0, strlen($sql) - 1);
			$sql .= ")";
			return $sql;
		}
		
		function getKeys($json) {
			$keys = "";
			foreach($this as $key => $value) {
				if($key == "tableName")
					continue;
				$keys .= "myapp_$key,";
			}
			$keys = substr($keys, 0, strlen($keys) - 1);
			return $keys;
		}
		
		function getValues($json) {
			$values = "";
			$reflect = new ReflectionObject($json);
			foreach($this as $key => $value) {
				if($key == "tableName")
					continue;
				if($reflect -> hasProperty($key)) {
					$values .= "'" . $json -> $key . "',";
				} else {
					$values .= "'',";
				}
			}
			$values = substr($values, 0, strlen($values) - 1);
			return $values;
		}
		
		function getInsertValues($json, $array) {
			$values = "";
			$reflect = new ReflectionObject($json);
			foreach($array as $key => $value) {
				if($value == "tableName")
					continue;
				if($reflect -> hasProperty($value)) {
					$values .= "'" . $json -> $value . "',";
				} else {
					$values .= "'',";
				}
			}
			$values = substr($values, 0, strlen($values) - 1);
			return $values;
		}
	}
?>