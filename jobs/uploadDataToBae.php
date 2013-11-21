<?php
	/**
	 * 上传数据到bae
	 * author: Zhang Chunsheng
	 * date: 2013-11-16
	 */
	error_reporting(E_ALL || ~E_NOTICE);
	include("init.php");
	
	require_once '../libs/Baidu-BCS_SDK-PHP-1.2.2/bcs.class.php';
	$host = 'bcs.duapp.com'; //online
	$ak = '';
	$sk = '';
	$bucket = 'imarket';
	$upload_dir = "../";
	$object = '/a.txt';
	$fileUpload = './a.txt';
	$fileWriteTo = './a.' . time () . '.txt';
	$baidu_bcs = new BaiduBCS($ak, $sk, $host);
	
	$app = new App();
	
	$apps = $app -> getNewApps();
	foreach($apps as $key => $value) {
		udpateIcon($value);
		updateScreenShot($value);
		updateDownloadUrl($value);
		updateBz($value);
	}
	
	$mysqlUtil -> close();
	$dsql -> Close();
	fclose($file);
	
	//aid,pkgid,myapp_appid,myapp_pkgid,myapp_icon,myapp_screenShot,myapp_downloadurl
	/**
	 */
	function udpateIcon($app) {
		global $baidu_bcs,$mysqlUtil;
		$url = $app["myapp_icon"];
		$type = "icon";
		$appid = $app["aid"];
		$pkgid = $app["pkgid"];
		$filename = "icon_72";
		$icon = createImage($baidu_bcs, $url, $type, $appid, $pkgid, $filename);
		$myapp_appid = $app["myapp_appid"];
		$sql = "update huohua_addonapp set icon='$icon' where myapp_appid='$myapp_appid'";
		$mysqlUtil -> query($sql);
	}
	
	function updateScreenShot($app) {
		global $baidu_bcs,$mysqlUtil;
		
		$myapp_screenShot = json_decode($app["myapp_screenShot"]);
		$screenShot = array();
		$type = "screenShot";
		$appid = $app["aid"];
		$pkgid = $app["pkgid"];
		for($i = 0 ; $i < count($myapp_screenShot) ; $i++) {
			$url = $myapp_screenShot[$i];
			$filename = $i + 1;
			$screenShotUrl = createImage($baidu_bcs, $url, $type, $appid, $pkgid, $filename);
			$screenShot[] = $screenShotUrl;
		}
		$myapp_appid = $app["myapp_appid"];
		$screenShot = json_encode($screenShot);
		$sql = "update huohua_addonapp set screenShot='$screenShot' where myapp_appid='$myapp_appid'";
		$mysqlUtil -> query($sql);
	}
	
	function updateDownloadUrl($app) {
		global $baidu_bcs,$mysqlUtil;
		$url = $app["myapp_downloadurl"];
		$appid = $app["aid"];
		$pkgid = $app["pkgid"];
		$filename = $app["pinyinOfAppName"];
		$downloadurl = createApk($baidu_bcs, $url, $appid, $pkgid, $filename);
		$myapp_appid = $app["myapp_appid"];
		$sql = "update huohua_addonapp set downloadurl='$downloadurl' where myapp_appid='$myapp_appid'";
		$mysqlUtil -> query($sql);
	}
	
	function updateBz($app) {
		global $mysqlUtil;
		$myapp_appid = $app["myapp_appid"];
		$sql = "update huohua_addonapp set updateBz=1 where myapp_appid='$myapp_appid'";
		$mysqlUtil -> query($sql);
	}
	
	function createImage($baidu_bcs, $url, $type, $appid, $pkgid, $filename) {
		global $host,$bucket;
		$suffix = "";
		$suffix = substr($url, strrpos($url, ".") + 1);
		if(empty($suffix)) {
			$suffix = "png";
		}
		
		$imageSrc = file_get_contents($url);
		
		//object name
		$filename = "$filename." . $suffix;//填入您要保存的名称
		$object = "/$type/android/$appid/$pkgid/" . $filename; //object必须以‘/’开头
		
		$opt = array();
		$opt['acl'] = BaiduBCS::BCS_SDK_ACL_TYPE_PUBLIC_WRITE;
		$opt[BaiduBCS::IMPORT_BCS_LOG_METHOD] = "bs_log";
		
		$opt['curlopts'] = array(
			CURLOPT_CONNECTTIMEOUT => 10,
			CURLOPT_TIMEOUT => 1800,
			CURLOPT_HTTPHEADER => array(
				"Content-Type:image/$suffix"
			));
		$response = $baidu_bcs -> create_object_by_content($bucket, $object, $imageSrc, $opt);
		
		if(!$response -> isOK()) {
			die('createImage object failed.');
		}
		return "http://$host/$bucket$object";
	}
	
	function createApk($baidu_bcs, $url, $appid, $pkgid, $filename) {
		global $host,$bucket;
		$suffix = "apk";
		
		$apkSrc = file_get_contents($url);
		
		//object name
		$filename = "$filename." . $suffix;//填入您要保存的名称
		$object = "/apk/$appid/$pkgid/" . $filename; //object必须以‘/’开头
		
		$opt = array();
		$opt['acl'] = BaiduBCS::BCS_SDK_ACL_TYPE_PUBLIC_WRITE;
		$opt[BaiduBCS::IMPORT_BCS_LOG_METHOD] = "bs_log";
		
		$opt['curlopts'] = array(
			CURLOPT_CONNECTTIMEOUT => 10,
			CURLOPT_TIMEOUT => 1800);
		$response = $baidu_bcs -> create_object_by_content($bucket, $object, $apkSrc, $opt);
		
		if(!$response -> isOK()) {
			die('createApk object failed.');
		}
		return "http://$host/$bucket$object";
	}
?>