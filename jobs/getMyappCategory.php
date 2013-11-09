<?php
	/**
	 * 获得myapp分类
	 */
	/**
	 * file
	 * file_get_contents
	 * curl
	 */
	define("DEBUG", true);
	define("STARTTIME", microtime());
	$_SGLOBAL = array();
	include("MysqlUtil.class.php");
	include("functions.php");
	include("../libs/simplehtmldom_1_5/simple_html_dom.php");
	
	$db = new MysqlUtil();
	$db -> charset = "utf8";
	$db -> connect("localhost:3306", "root", "root", "huohuamarket");
	
	$sql = "truncate myapp_category";
	$db -> query($sql);
	
	addCategory("app");
	addCategory("game");
	
	$db -> close();
	
	function addCategory($type) {
		global $db;
		if($type == "app") {//应用分类
			$url = "http://android.myapp.com/android/qrycategorylist_web?r=0.4487279343884438";
		} else {
			$url = "http://android.myapp.com/android/qrygamecategory_web?r=0.6747699521947652";
		}
		$content = file_get_contents($url);
		$content = json_decode($content);
		
		$sql = "";
		$huohua_cid = "";
		$categorys = $content -> info -> value;
		$icfa = "";
		$icon = "";
		$categoryid = "";
		$categoryname = "";
		$type = "category_app";
		foreach($categorys as $key => $value) {
			$categoryname = $value -> categoryname;
			$sql = "SELECT id FROM huohua_arctype WHERE typename='$categoryname'";
			$query = $db -> query($sql);
			$huohua_cid = $db -> result($query, 0);
			//beautiful_echo($huohua_cid);
			
			$sql = getInsertSQL($value, $huohua_cid);
			beautiful_echo($sql);
			$db -> query($sql);
		}
		addGrapLog($type, 0, count($categorys), 0);
	}
	
	
	
	function getInsertSQL($category, $huohua_cid) {
		$cid = $category -> categoryid;
		$cname = $category -> categoryname;
		$icon = $category -> icon;
		$icfa = $category -> icfa;
		$sql = "INSERT INTO myapp_category(cid,cname,icon,huohua_cid,icfa) VALUES ('$cid','$cname','$icon','$huohua_cid','$icfa')";
		return $sql;
	}
?>