<?php
	class AppDetail extends Entity {
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
		public $qrCode = "";
		public $features = "";
		public $downloadurl = "";
		public function __construct() {
			parent::__construct("huohua_addonapp");
		}
		
		public function getUrl() {
			global $url, $argument;
			$appid = $argument -> appid;
			$icfa = $argument -> icfa;
			$lmid = $argument -> lmid;
			$appurl = $url . "appid=$appid&icfa=$icfa&lmid=$lmid";
			return $appurl;
		}
		
		public function updateApp($app) {
			global $mysqlUtil, $argument;
			
			$url = $this -> getUrl();
			$lines_array = file($url);
			/*for($i = 0 ; $i < count($lines_array) ; $i++) {
				
			}*/
			$lines_string = implode('', $lines_array);
			eregi('<article class="mod-box detailpage"(.*)</article>', $lines_string, $detailpage);
			
			$detailpage = $detailpage[0];
			
			eregi('<section>(.*)</section>', $detailpage, $sections);
			
			$sections = explode("section", $sections[0]);
			
			$features = "";
			$screenshots = array();
			$div_picInner = "";
			$images = array();
			for($i = 0 ; $i < count($sections) ; $i++) {
				if(stripos($sections[$i], "新版特性") > 0) {
					eregi('<li>(.*)</li>', $sections[$i], $features);
					$features = $features[0];
					$tag = "li";
					$features = $this -> substr($tag, $features);
					$features = str_replace("<br/>", "\n", $features);
				} else if(stripos($sections[$i], "软件截图") > 0) {
					eregi('<div class="pic-inner"(.*)</div>', $sections[$i], $div_picInner);
					$start = stripos($div_picInner[0], ">") + 1;
					$end = stripos($div_picInner[0], "</div>");
					$div_picInner = substr($div_picInner[0], $start, $end - $start);
					$images = $this -> getImages($div_picInner);
				}
			}
			$myapp_appid = $app["myapp_appid"];
			$myapp_pkgid = $app["myapp_pkgid"];
			$screenShot = json_encode($images);
			$myapp_downloadurl = "http://android.myapp.com/android/down.jsp?appid=$myapp_appid&pkgid=$myapp_pkgid&icfa=15144102050801001000&lmid=2017&g_f=0&actiondetail=0&downtype=1&transactionid=&topicid=-1&softname=";
			$updateSQL = "features='$features',screenShot='$screenShot',myapp_features='$features',myapp_screenshot='$screenShot',myapp_downloadurl='$myapp_downloadurl'";
			$sql = "update huohua_addonapp set $updateSQL where myapp_appid='$myapp_appid'";
			$type = "app";
			$method = "update";
			addAppLog($type, $method, $sql);
			addGrapLog($type, 0, 1, 1, $url);
			$mysqlUtil -> query($sql);
		}
		
		public function substr($tag, $str) {
			$result = "";
			$start = strlen("<$tag>");
			$end = stripos($str, "</$tag>");
			$result = substr($str, $start, $end - $start);
			return $result;
		}
		
		public function getImages($div_picInner) {
			$images = array();
			$array = explode("<img", $div_picInner);
			foreach($array as $key => $value) {
				if(stripos($value, "src") > 0) {
					$images[] = $this -> getImagesrc($value);
				}
			}
			return $images;
		}
		
		public function getImageSrc($img) {
			$attr = 'data-url="';
			$endAttr = '" width';
			$start = stripos($img, "$attr") + strlen($attr);
			$end = stripos($img, "$endAttr");
			$imageSrc = substr($img, $start, $end - $start);
			return $imageSrc;
		}
	}
?>