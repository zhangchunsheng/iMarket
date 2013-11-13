<?php
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
		
		function getUpdateMyappSQL($json) {
			$sql = "";
			$reflect = new ReflectionObject($json);
			foreach($this as $key => $value) {
				if($key == "tableName")
					continue;
				if($reflect -> hasProperty($key)) {
					$sql .= "myapp_$key='" . $json -> $key . "',";
				} else {
					$sql .= "myapp_$key='',";
				}
			}
			$sql = substr($sql, 0, strlen($sql) - 1);
			return $sql;
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