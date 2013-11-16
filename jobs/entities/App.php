<?php
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
		
		public function getPageCount() {
			global $url, $pageInfo;
			$appurl = $this -> getUrl();
			
			$content = file_get_contents($appurl);
			$content = json_decode($content);
			
			$pageCount = $content -> info -> pageCount;
			$pageInfo -> pageCount = $pageCount;
		}
		
		public function getUrl() {
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
		
		public function getApps() {
			global $mysqlUtil;
			$query = $mysqlUtil -> query("SELECT aid,myapp_appid,myapp_pkgid FROM huohua_addonapp");
			$apps = array();
			while($row = $mysqlUtil -> fetch_array($query)) {
				$apps[] = $row;
			}
			return $apps;
		}
		
		public function addApps() {
			global $mysqlUtil,$pageInfo,$topTypeId,$channelid;
			$this -> getPageCount();
		
			$type = "app";
			for($i = 0 ; $i < $pageInfo -> pageCount ; $i++) {
				$appurl = $this -> getUrl();
				$content = file_get_contents($appurl);
				$content = json_decode($content);
				
				$sql = "";
				$method = "";
				$apps = $content -> info -> value;
				foreach($apps as $key => $value) {
					$sql = $this -> getCountSQL($value -> appid);
					$value -> softdesc = str_replace("'", "\'", $value -> softdesc);
					$result = $mysqlUtil -> result($mysqlUtil -> query($sql), 0);
					
					$categoryInfo = $this -> getCategoryInfo($value);
					$typeid = $categoryInfo["cid"];
					$cname = $categoryInfo["cname"];
					
					if($result >= 1) {
						$method = "update";
						$sql = $this -> getUpdateSQL($value, $typeid, $cname);
						beautiful_echo($sql);
						$mysqlUtil -> query($sql);
					} else {
						$method = "insert";
						$arcID = GetIndexKey(0, $typeid, 0, $channelid);
						$sql = $this -> getInsertSQL($value, $arcID, $topTypeId, $typeid, $cname);
						beautiful_echo($sql);
						$mysqlUtil -> query($sql);
					}
					addAppLog($type, $method, $sql);
				}
				addGrapLog($type, $pageInfo -> pageNo, $pageInfo -> pageCount, $pageInfo -> pageSize, $appurl);
				$pageInfo -> pageNo++;
			}
		}
		
		public function updateTencentApp() {
			global $mysqlUtil,$pageInfo,$topTypeId,$channelid;
			$this -> getPageCount();
		
			$type = "app";
			for($i = 0 ; $i < $pageInfo -> pageCount ; $i++) {
				$appurl = $this -> getUrl();
				$content = file_get_contents($appurl);
				$content = json_decode($content);
				
				$sql = "";
				$method = "";
				$apps = $content -> info -> value;
				foreach($apps as $key => $value) {
					$sql = "update huohua_addonapp set isTencent=1 WHERE myapp_appid=" . $value -> appid;
					
					$method = "update";
					$mysqlUtil -> query($sql);
					addAppLog($type, $method, $sql);
				}
				addGrapLog($type, $pageInfo -> pageNo, $pageInfo -> pageCount, $pageInfo -> pageSize, $appurl);
				$pageInfo -> pageNo++;
			}
		}
		
		public function getCategoryInfo($value) {
			global $mysqlUtil;
			$query = $mysqlUtil -> query("SELECT cid,cname FROM huohua_appcategory WHERE myapp_cid=" . $value -> cid);
			while($row = $mysqlUtil -> fetch_array($query)) {
				$categoryInfo = $row;
			}
			return $categoryInfo;
		}
		
		public function addApp($json) {
			global $mysqlUtil,$channelid;
			$type = "app";
			$json -> softdesc = str_replace("'", "\'", $json -> softdesc);
			$categoryInfo = $this -> getCategoryInfo($json);
			if(empty($categoryInfo)) {
				$typeid = 48;
				$cname = "其它";
			} else {
				$typeid = $categoryInfo["cid"];
				$cname = $categoryInfo["cname"];
			}
			
			$topTypeId = $this -> getTopTypeId($typeid);
			
			$method = "insert";
			$arcID = GetIndexKey(0, $typeid, 0, $channelid);
			$sql = $this -> getInsertSQL($json, $arcID, $topTypeId, $typeid, $cname);
			//beautiful_echo($sql);
			$this -> logFile($sql);
			$mysqlUtil -> query($sql);
			addAppLog($type, $method, $sql);
			
			return $arcID;
		}
		
		public function logFile($info) {
			global $file;
			$date = date("Y-m-d H24:i:s", time());
			fwrite($file, $date . " " . $info . "\n");
		}
		
		public function getTopTypeId($typeid) {
			$topTypeId = 0;
			if(($typeid >= 5 && $typeid <= 26) || $typeid == 48) {
				$topTypeId = 2;
			} else {
				$topTypeId = 3;
			}
			return $topTypeId;
		}
		
		public function getCountSQL($appid) {
			$sql = "SELECT COUNT(1) count FROM huohua_addonapp WHERE myapp_appid='$appid'";
			return $sql;
		}
		
		public function getInsertSQL($json, $arcID, $topTypeId, $typeid, $cname) {
			global $channelid;
			$keys = $this -> getKeys($json);
			$values = $this -> getValues($json);
			$insertKeys = "click,title,senddate,flag,litpic,userip,topTypeId,writer,sortrank,source,publishdate,dutyadmin,cid,cname,
						icon,appName,filetype,starLevel,count,downcount,sizeInfo,
						priceInfo,languageInfo,version,pubDate,needOSInfo,developerInfo,
						isTencentPMAuth,isSafeMAuth,introduction";
			$pubDate = strtotime($json -> publishtime);
			$insertValues = "'".$json->count."','".$json->softname."','".time()."','p','".$json->icon."','0.0.0.0','$topTypeId','admin','$pubDate','myapp','$pubDate','1','$typeid','$cname',
						'".$json->icon."','".$json -> softname."','.apk','".$json -> score."','".$json -> count."','".$json -> downcount."','".$json -> filesize."',
						'".$json -> fee."','".$json -> lang."','".$json -> versionname."','".$pubDate."','".$json -> sdkver."','".$json -> cpname."',
						'1','1','".$json -> softdesc."'";
			$sql = "INSERT INTO huohua_addonapp(aid,typeid,channel,arcrank,mid,$insertKeys,$keys) VALUES ('$arcID','$typeid','$channelid',0,1,$insertValues,$values)";
			return $sql;
		}
		
		public function getUpdateSQL($json, $typeid, $cname) {
			global $topTypeId;
			$updateMyappSQL = $this -> getUpdateMyappSQL($json);
			$pubDate = strtotime($json -> publishtime);
			$updateSQL = "typeid='$typeid',click='".$json->count."',title='".$json->softname."',litpic='".$json->icon."',userip='0.0.0.0',topTypeId='$topTypeId',writer='admin',sortrank='$pubDate',source='myapp',publishdate='$pubDate',dutyadmin='1',cid='$typeid',cname='$cname',
						icon='".$json->icon."',appName='".$json->softname."',starLevel='".$json->score."',count='".$json->count."',downcount='".$json->downcount."',sizeInfo='".$json->filesize."',
						priceInfo='".$json->fee."',languageInfo='".$json->lang."',version='".$json->versionname."',pubDate='$pubDate',needOSInfo='".$json->sdkver."',developerInfo='".$json->cpname."',
						isTencentPMAuth='1',isSafeMAuth='1',introduction='".$json->softdesc."'";
			$sql = "update huohua_addonapp set $updateSQL,$updateMyappSQL where myapp_appid=" . $json -> appid;
			return $sql;
		}
	}
?>