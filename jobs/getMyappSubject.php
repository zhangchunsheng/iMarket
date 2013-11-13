<?php
	include("init.php");
	
	class Subject extends Entity {
		public $time = "";
		public $topicid = "";
		public $description = "";
		public $viewcnt = "";
		public $picurl = "";
		public $disagree = "";
		public $topicname = "";
		public $agree = "";
		public function __construct() {
			parent::__construct("huohua_addonsubject");
		}
	}
	
	$topTypeId = 4;
	$typeid = 42;
	$channelid = -16;
	
	$url = "http://android.myapp.com/android/qrytopiclist_web?";
	$pageInfo = new stdClass;
	$pageInfo -> pageNo = 1;
	$pageInfo -> pageIndex = -1;
	$pageInfo -> pageSize = 12;
	$pageInfo -> r = "0.5361363203264773";
	$pageInfo -> pageCount = 13;
	
	$subject = new Subject();
	
	addSubject();
	
	$mysqlUtil -> close();
	$dsql -> Close();
	
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
		$pageIndex = $pageInfo -> pageIndex;
		$pageSize = $pageInfo -> pageSize;
		$r = $pageInfo -> r;
		$pageCount = $pageInfo -> pageCount;
		$appurl = $url . "pageNo=$pageNo&pageIndex=$pageIndex&pageSize=$pageSize&r=$r";
		return $appurl;
	}
	
	function addSubject() {
		global $mysqlUtil,$pageInfo,$subject,$typeid,$channelid;
		getPageCount();
		
		$type = "subject";
		for($i = 0 ; $i < $pageInfo -> pageCount ; $i++) {
			$appurl = getUrl();
			$content = file_get_contents($appurl);
			$content = json_decode($content);
			
			$sql = "";
			$method = "";
			$subjects = $content -> info -> value;
			foreach($subjects as $key => $value) {
				$sql = getCountSQL($value -> topicid);
				$result = $mysqlUtil -> result($mysqlUtil -> query($sql), 0);
				$value -> description = str_replace("'", "\'", $value -> description);
				echo $result;
				if($result >= 1) {
					$method = "update";
					$sql = getUpdateSQL($value);
					beautiful_echo($sql);
					$mysqlUtil -> query($sql);
				} else {
					$method = "insert";
					$arcID = GetIndexKey(0, $typeid, 0, $channelid);
					$sql = getInsertSQL($value, $arcID);
					beautiful_echo($sql);
					$mysqlUtil -> query($sql);
				}
				addAppLog($type, $method, $sql);
			}
			addGrapLog($type, $pageInfo -> pageNo, $pageInfo -> pageCount, $pageInfo -> pageSize, $appurl);
			$pageInfo -> pageNo++;
		}
	}
	
	function getCountSQL($topicid) {
		$sql = "SELECT COUNT(1) count FROM huohua_addonsubject WHERE myapp_topicid='$topicid'";
		return $sql;
	}
	
	function getInsertSQL($json, $arcID) {
		global $subject,$typeid,$channelid;
		$keys = $subject -> getKeys($json);
		$values = $subject -> getValues($json);
		$insertKeys = "click,title,senddate,flag,litpic,userip,writer,sortrank,source,publishdate,dutyadmin,
					subjectName,picture,description,date,pubDate,goodNum,badNum";
		$pubDate = strtotime($json -> time);
		$insertValues = "'".$json->viewcnt."','".$json->topicname."','".time()."','p','".$json->picurl."','0.0.0.0','admin','$pubDate','myapp','$pubDate','1',
					'".$json->topicname."','".$json -> picurl."','".$json -> description."','".time()."','".$pubDate."','".$json -> agree."','".$json -> disagree."'";
		$sql = "INSERT INTO huohua_addonsubject(aid,typeid,channel,arcrank,mid,$insertKeys,$keys) VALUES ('$arcID','$typeid','$channelid',0,1,$insertValues,$values)";
		return $sql;
	}
	
	function getUpdateSQL($json) {
		global $subject,$typeid;
		$updateMyappSQL = $subject -> getUpdateMyappSQL($json);
		$pubDate = strtotime($json -> time);
		$updateSQL = "typeid='$typeid',click='".$json->viewcnt."',title='".$json->topicname."',litpic='".$json->picurl."',userip='0.0.0.0',writer='admin',sortrank='$pubDate',source='myapp',publishdate='$pubDate',dutyadmin='1',
					subjectName='".$json->topicname."',picture='".$json->picurl."',description='".$json->description."',
					pubDate='".$pubDate."',goodNum='".$json->agree."',badNum='".$json->disagree."'";
		$sql = "update huohua_addonsubject set $updateSQL,$updateMyappSQL where myapp_topicid=" . $json -> topicid;
		return $sql;
	}
?>