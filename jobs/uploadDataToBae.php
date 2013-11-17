<?php
	/**
	 * 上传数据到bae
	 * author: Zhang Chunsheng
	 * date: 2013-11-16
	 */
	error_reporting(E_ALL || ~E_NOTICE);
	require_once '../libs/Baidu-BCS_SDK-PHP-1.2.2/bcs.class.php';
	$host = 'bcs.duapp.com'; //online
	$ak = '';
	$sk = '';
	$bucket = 'imarket';
	$upload_dir = "../";
	$object = '/a.txt';
	$fileUpload = './a.txt';
	$fileWriteTo = './a.' . time () . '.txt';
	$baidu_bcs = new BaiduBCS ( $ak, $sk, $host );
?>