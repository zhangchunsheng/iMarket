<?php
	include("init.php");
	
	class App extends Entity {
		public $icon = "";
		public $count = "";
		public $versionname = "";
		public $sdkver = "";
		public $score = "";
		public $appid = "";
		public $softname = "";
		public $cid = "";
		public $lang = "";
		public $softdesc = "";
		public $fee = "";
		public $icfa = "";
		public $filesize = "";
		public $cptype = "";
		public $publishtime = "";
		public $starnumber = "";
		public $cpname = "";
		public $pkgid = "";
		public $cname = "";
		public $downcount = "";
		public function __construct() {
			parent::__construct("huohua_addonapp");
		}
	}
	
	$typeid = 3;
	$channelid = -17;
	
	$url = "http://android.myapp.com/android/qrycategoryranking_web?";
	$pageInfo = new stdClass;
	$pageInfo -> cid = 120;
	$pageInfo -> ranktype = 0;
	$pageInfo -> icfa = "15144206000120000000";
	$pageInfo -> pageNo = 1;
	$pageInfo -> pageIndex = -1;
	$pageInfo -> pageSize = 10;
	$pageInfo -> r = "0.16294923843815923";
	$pageInfo -> pageCount = 30;
	
	$app = new App();
	
	addApp();
	
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
		$cid = $pageInfo -> cid;
		$ranktype = $pageInfo -> ranktype;
		$icfa = $pageInfo -> icfa;
		$pageNo = $pageInfo -> pageNo;
		$pageIndex = $pageInfo -> pageIndex;
		$pageSize = $pageInfo -> pageSize;
		$r = $pageInfo -> r;
		$pageCount = $pageInfo -> pageCount;
		$appurl = $url . "cid=$cid&ranktype=$ranktype&icfa=$icfa&pageNo=$pageNo&pageIndex=$pageIndex&pageSize=$pageSize&r=$r";
		return $appurl;
	}
	
	function addApp() {
		global $mysqlUtil,$pageInfo,$app,$typeid,$channelid;
		getPageCount();
		
		$type = "game";
		for($i = 0 ; $i < $pageInfo -> pageCount ; $i++) {
			$appurl = getUrl();
			$content = file_get_contents($appurl);
			$content = json_decode($content);
			
			$sql = "";
			$method = "";
			$apps = $content -> info -> value;
			foreach($apps as $key => $value) {
				$sql = getCountSQL($value -> appid);
				$result = $mysqlUtil -> result($mysqlUtil -> query($sql), 0);
				$value -> softdesc = str_replace("'", "\'", $value -> softdesc);
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
	
	function getCountSQL($appid) {
		$sql = "SELECT COUNT(1) count FROM huohua_addonapp WHERE myapp_appid='$appid'";
		return $sql;
	}
	
	function getInsertSQL($json, $arcID) {
		global $app,$typeid,$channelid;
		$keys = $app -> getKeys($json);
		$values = $app -> getValues($json);
		$insertKeys = "click,title,senddate,flag,litpic,userip,icon,appName,filetype,starLevel,count,downcount,sizeInfo,
					priceInfo,languageInfo,version,pubDate,needOSInfo,developerInfo,
					isTencentPMAuth,isSafeMAuth,introduction";
		$pubDate = strtotime($json -> publishtime);
		$insertValues = "'".$json->count."','".$json->softname."','".time()."','p','".$json->icon."','0.0.0.0','".$json->icon."','".$json -> softname."','.apk','".$json -> score."','".$json -> count."','".$json -> downcount."','".$json -> filesize."',
					'".$json -> fee."','".$json -> lang."','".$json -> versionname."','".$pubDate."','".$json -> sdkver."','".$json -> cpname."',
					'1','1','".$json -> softdesc."'";
		$sql = "INSERT INTO huohua_addonapp(aid,typeid,channel,arcrank,mid,$insertKeys,$keys) VALUES ('$arcID','$typeid','$channelid',0,1,$insertValues,$values)";
		return $sql;
	}
	
	function getUpdateSQL($json) {
		global $app,$typeid;
		$updateMyappSQL = $app -> getUpdateMyappSQL($json);
		$pubDate = strtotime($json -> publishtime);
		$updateSQL = "typeid='$typeid',click='".$json->count."',title='".$json->softname."',litpic='".$json->icon."',userip='0.0.0.0',icon='".$json->icon."',appName='".$json->softname."',starLevel='".$json->score."',count='".$json->count."',downcount='".$json->downcount."',sizeInfo='".$json->filesize."',
					priceInfo='".$json->fee."',languageInfo='".$json->lang."',version='".$json->versionname."',pubDate='$pubDate',needOSInfo='".$json->sdkver."',developerInfo='".$json->cpname."',
					isTencentPMAuth='1',isSafeMAuth='1',introduction='".$json->softdesc."'";
		$sql = "update huohua_addonapp set $updateSQL,$updateMyappSQL where myapp_appid=" . $json -> appid;
		return $sql;
	}
?>