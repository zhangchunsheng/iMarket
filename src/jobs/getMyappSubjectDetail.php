<?php
	include("init.php");
	
	$channelid = -17;
	$file = fopen("app.txt", "a");
	
	$url = "http://android.myapp.com/android/qrytopicdetail_web?";
	$pageInfo = new stdClass;
	$pageInfo -> pageNo = 1;
	$pageInfo -> pageSize = 50;
	$pageInfo -> topicid = 20241;
	$pageInfo -> r = "0.2269687505904585";
	$pageInfo -> pageCount = 1;
	
	$sql = "truncate huohua_appsubject_app";
	$mysqlUtil -> query($sql);
	
	$app = new App();
	
	updateSubject();
	
	$mysqlUtil -> close();
	$dsql -> Close();
	fclose($file);
	
	function getPageCount() {
		global $url, $pageInfo;
		$appurl = getUrl();
		
		$content = file_get_contents($appurl);
		$content = json_decode($content);
		
		$pageCount = $content -> info -> pageCount;
		$pageInfo -> pageCount = $pageCount;
	}
	
	function getUrl() {
		global $url, $pageInfo;
		$pageNo = $pageInfo -> pageNo;
		$pageSize = $pageInfo -> pageSize;
		$topicid = $pageInfo -> topicid;
		$r = $pageInfo -> r;
		$pageCount = $pageInfo -> pageCount;
		$appurl = $url . "pageNo=$pageNo&pageSize=$pageSize&topicid=$topicid&r=$r";
		return $appurl;
	}
	
	function updateSubject() {
		global $mysqlUtil,$app,$pageInfo;
		//getPageCount();
		
		$type = "subject_update";
		$subjects = getSubjects();
		foreach($subjects as $key => $value) {
			$aid = $value["aid"];
			$topicid = $value["myapp_topicid"];
			$pageInfo -> topicid = $topicid;
			
			$appurl = getUrl();
			$content = file_get_contents($appurl);
			$content = json_decode($content);
			
			$method = "";
			$apps = $content -> info -> value;
			$appsInfo = array();
			foreach($apps as $key => $value) {
				$appid = getAppid($value -> appid);
				if(empty($appid)) {
					$appid = $app -> addApp($value);
				}
				$appsInfo[]["appid"] = $appid;
			
				saveInsertSubjectApp($topicid, $appid, $value -> appid, $value -> cid);
			}
			
			$method = "update";
			$appsInfo = json_encode($appsInfo);
			$sql = getUpdateSQL($appsInfo, $aid);
			beautiful_echo($sql);
			$mysqlUtil -> query($sql);
			addAppLog($type, $method, $sql);
			addGrapLog($type, $pageInfo -> pageNo, $pageInfo -> pageCount, $pageInfo -> pageSize, $appurl);
		}
	}
	
	function getSubjects() {
		global $mysqlUtil;
		$sql = "SELECT aid,myapp_topicid FROM huohua_addonsubject";
		$subjects = array();
		$query = $mysqlUtil -> query($sql);
		while($row = $mysqlUtil -> fetch_array($query)) {
			$subjects[] = $row;
		}
		return $subjects;
	}
	
	function getAppid($myapp_appid) {
		global $mysqlUtil;
		$sql = "SELECT aid FROM huohua_addonapp WHERE myapp_appid='$myapp_appid'";
		$query = $mysqlUtil -> query($sql);
		$appid = $mysqlUtil -> result($query, 0);
		return $appid;
	}
	
	function getUpdateSQL($apps, $aid) {
		$sql = "update huohua_addonsubject set apps='$apps' where aid='$aid'";
		return $sql;
	}
	
	function saveInsertSubjectApp($subjectId, $appid, $myapp_appid, $myapp_topicid) {
		global $mysqlUtil;
		$sql = getInsertSubjectApp($subjectId, $appid, $myapp_appid, $myapp_topicid);
		$query = $mysqlUtil -> query($sql);
	}
	
	function getInsertSubjectApp($subjectId, $appid, $myapp_appid, $myapp_topicid) {
		$keys = "subjectId,appid,date,myapp_appid,myapp_topicid";
		$date = time();
		$values = "'$subjectId','$appid','$date','$myapp_appid','$myapp_topicid'";
		$sql = "insert huohua_appsubject_app($keys) values ($values)";
		return $sql;
	}
?>