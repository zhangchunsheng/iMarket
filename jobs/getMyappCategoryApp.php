<?php
	include("init.php");
	
	$topTypeId = 2;//3
	$channelid = -17;
	$typeid = 0;
	
	$categorys = getCategorys();
	$url = "http://android.myapp.com/android/qryinersoftrank_web?";
	$pageInfo = new stdClass;
	$pageInfo -> cid = 10013;
	$pageInfo -> ranktype = 0;
	$pageInfo -> icfa = "15144064010013001000";
	$pageInfo -> pageNo = 1;
	$pageInfo -> pageIndex = -1;
	$pageInfo -> pageSize = 10;
	$pageInfo -> r = "0.10797672905027866";
	$pageInfo -> pageCount = 30;
	
	$app = new App();
	
	foreach($categorys as $key => $value) {
		$cid = $value["cid"];
		$cname = $value["cname"];
		$myapp_cid = $value["myapp_cid"];
		$myapp_cname = $value["myapp_cname"];
		
		$typeid = $cid;
		$topTypeId = $app -> getTopTypeId($typeid);
		
		$pageInfo -> cid = $cid;
		$pageInfo -> pageNo = 1;
		
		$app -> addApps();
	}
	
	$mysqlUtil -> close();
	$dsql -> Close();
	
	function getCategorys() {
		global $mysqlUtil;
		$sql = "SELECT cid,cname,myapp_cid,myapp_cname FROM huohua_appcategory";
		$query = $mysqlUtil -> query($sql);
		$categorys = array();
		while($row = $mysqlUtil -> fetch_array($query)) {
			$categorys[] = $row;
		}
		return $categorys;
	}
?>