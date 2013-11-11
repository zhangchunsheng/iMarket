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
	
	class Banner extends Entity {
		public $icfa = "";
		public $picsrc = "";
		public $appid = "";
		public $topicid = "";
		public $type = "";
		public $tgy = "";
		public function __construct() {
			parent::__construct("myapp_banner");
		}
	}
	$sql = "truncate huohua_appbanner";
	$mysqlUtil -> query($sql);
	
	$typeid = 47;
	$channelid = -2;
	
	$banner = new Banner();
	addBanner();
	
	$mysqlUtil -> close();
	$dsql -> Close();
	
	function addBanner() {
		global $mysqlUtil,$banner,$typeid,$channelid;
		$url = "http://android.myapp.com/android/qrytopicbycms_web?r=0.7721985075622797";
		$content = file_get_contents($url);
		$content = json_decode($content);
		
		$sql = "";
		$banners = $content -> info -> value;
		$type = "banner";
		foreach($banners as $key => $value) {
			//$arcID = GetIndexKey(0, $typeid, 0, $channelid);
			//$sql = getAddonInsertSQL($value, $arcID);
			$sql = getInsertSQL($value);
			beautiful_echo($sql);
			$mysqlUtil -> query($sql);
		}
		addGrapLog($type, 0, count($banners), 0);
	}
	
	function addMyAppBanner() {
		global $mysqlUtil,$banner,$typeid,$channelid;
		$url = "http://android.myapp.com/android/qrytopicbycms_web?r=0.7721985075622797";
		$content = file_get_contents($url);
		$content = json_decode($content);
		
		$sql = "";
		$banners = $content -> info -> value;
		$type = "banner";
		foreach($banners as $key => $value) {
			$sql = $banner -> getInsertSQL($value);
			beautiful_echo($sql);
			$mysqlUtil -> query($sql);
		}
		addGrapLog($type, 0, count($banners), 0);
	}
	
	function getInsertSQL($json) {
		global $banner;
		$keys = $banner -> getKeys($json);
		$values = $banner -> getValues($json);
		$insertKeys = "picsrc,appid,type,topicid,bannerName,date";
		if($json -> type == "soft") {
			$insertValues = "'".$json -> picsrc."','".$json -> appid."','".
						$json -> type."','','".
						$json -> tgy."','".time()."'";
		} else {
			$insertValues = "'".$json -> picsrc."','','".
						$json -> type."','".$json -> topicid."','".
						$json -> tgy."','".time()."'";
		}
		$sql = "INSERT INTO huohua_appbanner($insertKeys,$keys) VALUES ($insertValues,$values)";
		return $sql;
	}
	
	function getAddonInsertSQL($json, $arcID) {
		global $banner,$typeid,$channelid;
		$keys = $banner -> getKeys($json);
		$values = $banner -> getValues($json);
		$insertKeys = "picsrc,appid,type,topicid,bannerName,date";
		if($json -> type == "soft") {
			$insertValues = "'".$json -> picsrc."','".$json -> appid."','".
						$json -> type."','','".
						$json -> tgy."','".time()."'";
		} else {
			$insertValues = "'".$json -> picsrc."','','".
						$json -> type."','".$json -> topicid."','".
						$json -> tgy."','".time()."'";
		}
		$sql = "INSERT INTO huohua_addonbanner(aid,typeid,channel,arcrank,mid,$insertKeys,$keys) VALUES ('$arcID','$typeid','$channelid',0,1,$insertValues,$values)";
		return $sql;
	}
?>