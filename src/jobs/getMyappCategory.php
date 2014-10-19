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
	
	$sql = "truncate huohua_appcategory";
	$mysqlUtil -> query($sql);
	
	$typeid = 44;
	$channelid = -3;
	
	addCategory("app");
	addCategory("game");
	//addMyAppCategory("app");
	//addMyAppCategory("game");
	
	$mysqlUtil -> close();
	$dsql -> Close();
	
	function addCategory($type) {
		global $mysqlUtil,$typeid,$channelid;
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
			$query = $mysqlUtil -> query($sql);
			$huohua_cid = $mysqlUtil -> result($query, 0);
			//beautiful_echo($huohua_cid);
			
			//$arcID = GetIndexKey(0, $typeid, 0, $channelid);
			//$sql = getAddonInsertSQL($value, $arcID, $huohua_cid);
			$sql = getInsertSQL($value, $huohua_cid);
			beautiful_echo($sql);
			$mysqlUtil -> query($sql);
		}
		addGrapLog($type, 0, count($categorys), 0);
	}
	
	function addMyAppCategory($type) {
		global $mysqlUtil,$typeid,$channelid;
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
		$type = "category_myapp";
		foreach($categorys as $key => $value) {
			$categoryname = $value -> categoryname;
			$sql = "SELECT id FROM huohua_arctype WHERE typename='$categoryname'";
			$query = $mysqlUtil -> query($sql);
			$huohua_cid = $mysqlUtil -> result($query, 0);
			//beautiful_echo($huohua_cid);
			
			$sql = getMyAppInsertSQL($value, $huohua_cid);
			beautiful_echo($sql);
			$mysqlUtil -> query($sql);
		}
		addGrapLog($type, 0, count($categorys), 0);
	}
	
	function getInsertSQL($category, $huohua_cid) {
		$cid = $category -> categoryid;
		$cname = $category -> categoryname;
		$icfa = $category -> icfa;
		$icon = $category -> icon;
		$sql = "INSERT INTO huohua_appcategory(cid,cname,myapp_cid,myapp_cname,myapp_icfa,myapp_icon) VALUES ('$huohua_cid','$cname','$cid','$cname','$icfa','$icon')";
		return $sql;
	}
	
	function getAddonInsertSQL($category, $arcID, $huohua_cid) {
		global $typeid,$channelid;
		$cid = $category -> categoryid;
		$cname = $category -> categoryname;
		$icfa = $category -> icfa;
		$icon = $category -> icon;
		$sql = "INSERT INTO huohua_addonappcategory(aid,typeid,channel,arcrank,mid,cid,cname,myapp_cid,myapp_cname,myapp_icfa,myapp_icon) VALUES ('$arcID','$typeid','$channelid',0,1,'$huohua_cid','$cname','$cid','$cname','$icfa','$icon')";
		return $sql;
	}
	
	function getMyAppInsertSQL($category, $huohua_cid) {
		$cid = $category -> categoryid;
		$cname = $category -> categoryname;
		$icon = $category -> icon;
		$icfa = $category -> icfa;
		$sql = "INSERT INTO myapp_category(cid,cname,icon,huohua_cid,icfa) VALUES ('$cid','$cname','$icon','$huohua_cid','$icfa')";
		return $sql;
	}
?>