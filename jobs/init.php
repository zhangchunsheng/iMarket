<?php
	//error_reporting(E_ALL || ~E_NOTICE);
	define("DEBUG", true);
	define("STARTTIME", microtime());
	$_SGLOBAL = array();
	include("MysqlUtil.class.php");
	include("functions.php");
	include("../libs/simplehtmldom_1_5/simple_html_dom.php");
	
	$mysqlUtil = new MysqlUtil();
	$mysqlUtil -> charset = "utf8";
	$mysqlUtil -> connect("localhost:3306", "root", "root", "huohuamarket");
	
	define('DEDEINC', str_replace("\\", '/', dirname(dirname(__FILE__))) . "\include");
	define('DEDEROOT', str_replace("\\", '/', substr(DEDEINC, 0, -8)));
	define('DEDEDATA', DEDEROOT . '/data');
	define('DEDEMEMBER', DEDEROOT . '/member');
	define('DEDETEMPLATE', DEDEROOT . '/templets');
	
	define('DEDEMODEL', DEDEROOT . '/include/model');
	define('DEDECONTROL', DEDEROOT . '/include/control');
	define('DEDEAPPTPL', DEDEROOT . '/include/templates');

	define('DEBUG_LEVEL', FALSE);


	//系统配置参数
	require_once(DEDEDATA . "/config.cache.inc.php");

	//数据库配置文件
	require_once(DEDEDATA . '/common.inc.php');

	//引入数据库类
	if ($GLOBALS['cfg_mysql_type'] == 'mysqli' && function_exists("mysqli_init")) {
		require_once(DEDEINC . '/dedesqli.class.php');
	} else {
		require_once(DEDEINC . '/dedesql.class.php');
	}

	//全局常用函数
	require_once(DEDEINC . '/common.func.php');
	
	//载入小助手配置,并对其进行默认初始化
	if (file_exists(DEDEDATA . '/helper.inc.php')) {
		require_once(DEDEDATA . '/helper.inc.php');
		// 若没有载入配置,则初始化一个默认小助手配置
		if (!isset($cfg_helper_autoload)) {
			$cfg_helper_autoload = array(
				'util',
				'charset',
				'string',
				'time',
				'cookie'
			);
		}
		// 初始化小助手
		helper($cfg_helper_autoload);
	}
?>