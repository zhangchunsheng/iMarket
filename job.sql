-- 2013-10-27
SELECT * FROM huohua_archives;

-- 2013-11-03
SELECT * FROM huohua_archives;
SELECT * FROM huohua_app;
SHOW CREATE TABLE huohua_app;
ALTER TABLE huohua_app RENAME huohua_addonapp;
SELECT * FROM huohua_addonapp;
SHOW CREATE TABLE huohua_addonapp;
SHOW CREATE TABLE huohua_archives;
ALTER TABLE huohua_addonapp CHANGE COLUMN `isTencentPMAuth` `isTencentPMAuth` INT(1) NOT NULL DEFAULT 1;
ALTER TABLE huohua_addonapp CHANGE COLUMN `screenShot` `screenShot` TEXT;

SELECT * FROM huohua_channeltype;

/**
 * icon varchar 图标
 × appName varchar 应用名称
 * cid int 分类
 * cname varchar 分类名称
 * filetype varchar 文件类型
 * starLevel int 星级
 * scoreNum int 评分人数
 * downloadNum int 下载次数
 * size int 大小
 × sizeInfo varchar 大小信息
 * price decimal 价格
 * priceInfo varchar 价格信息
 * language int 语言
 * languageInfo varchar 语言信息
 * version varchar 版本
 * pubDate date 发布日期
 * needOSVersion int 固件
 * needOSInfo varchar 固件信息
 * developer int 开发者
 * developerInfo varchar 开发者信息
 * isTencentPMAuth int 腾讯手机管家认证
 * isSafeMAuth int 安全管家认证
 * qrCode varchar 二维码
 * downloadLink varchar 下载地址
 * introduction text 应用介绍
 * screenShot text 软件截图
 * comments text 评价
 */
SHOW CREATE TABLE huohua_addonarticle;
SHOW CREATE TABLE huohua_addonsoft;
SHOW CREATE TABLE huohua_addonimages;

-- 2013-11-04
SELECT * FROM huohua_channeltype;
SELECT * FROM huohua_addonapp;
SELECT * FROM huohua_archives;

SHOW CREATE TABLE huohua_addonapp;
SHOW CREATE TABLE huohua_archives;
SHOW CREATE TABLE huohua_addonsoft;

ALTER TABLE huohua_addonapp ADD COLUMN `weight` INT(10) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonapp ADD COLUMN `typeid2` VARCHAR(90) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonapp ADD COLUMN `topTypeId` VARCHAR(90) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonapp ADD COLUMN `writer` CHAR(20) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `redirecturl` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `sortrank` INT(10) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonapp ADD COLUMN `ismake` SMALLINT(6) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonapp ADD COLUMN `shorttitle` CHAR(36) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `color` CHAR(7) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `source` CHAR(30) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `publishdate` INT(10) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonapp ADD COLUMN `notpost` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonapp ADD COLUMN `description` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `keywords` CHAR(30) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `filename` VARCHAR(40) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `dutyadmin` MEDIUMINT(8) UNSIGNED NOT NULL DEFAULT '0';

SELECT * FROM huohua_tagindex;
SELECT * FROM huohua_taglist;

SELECT * FROM huohua_softconfig;
SELECT * FROM huohua_soft_backup;
SELECT * FROM huohua_soft_belong;
SELECT * FROM huohua_soft_favorites;
SELECT * FROM huohua_soft_version;
SELECT * FROM huohua_software;
SELECT * FROM huohua_software_temp;

-- 2013-11-05
SELECT * FROM huohua_addonapp;
SELECT * FROM huohua_channeltype;
SELECT * FROM huohua_arctype;
SELECT * FROM huohua_arctype WHERE reid=0;

SELECT * FROM huohua_member;

SHOW CREATE TABLE huohua_member;

SHOW CREATE TABLE huohua_addonspec;
SHOW CREATE TABLE huohua_addonsubject;
SHOW CREATE TABLE huohua_addonapp;

/**
 * subjectName varchar 名称
 * picture varchar 图片
 * description varchar 简介
 * date int 日期
 * pubDate int 发布时间
 * apps text 应用信息
 * click int 浏览次数
 * goodNum int 赞
 * badNum int 踩
 */

-- 2013-11-06
SELECT * FROM huohua_addonapp;
SELECT * FROM huohua_addonsubject;

SHOW CREATE TABLE huohua_addonsubject;

ALTER TABLE huohua_addonsubject ADD COLUMN `description` VARCHAR(255) NOT NULL DEFAULT '';

-- 2013-11-07
SELECT * FROM huohua_addonapp;
SELECT * FROM huohua_addonsubject;
SHOW CREATE TABLE huohua_addonsubject;

SELECT id,typename,ispart,channeltype FROM `huohua_arctype` WHERE ispart<>2 AND reid=0 ORDER BY sortrank ASC;
SELECT * FROM huohua_arctype;

ALTER TABLE huohua_addonsubject ADD COLUMN `weight` INT(10) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonsubject ADD COLUMN `typeid2` VARCHAR(90) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonsubject ADD COLUMN `topTypeId` VARCHAR(90) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonsubject ADD COLUMN `writer` CHAR(20) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `redirecturl` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `sortrank` INT(10) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonsubject ADD COLUMN `ismake` SMALLINT(6) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonsubject ADD COLUMN `shorttitle` CHAR(36) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `color` CHAR(7) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `source` CHAR(30) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `publishdate` INT(10) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonsubject ADD COLUMN `notpost` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonsubject ADD COLUMN `description` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `keywords` CHAR(30) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `filename` VARCHAR(40) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `dutyadmin` MEDIUMINT(8) UNSIGNED NOT NULL DEFAULT '0';

-- 2013-11-08
SELECT * FROM huohua_addonapp;
SHOW CREATE TABLE huohua_addonapp;
SELECT * FROM huohua_arctype;
SELECT * FROM huohua_setting;
SELECT * FROM huohua_sysconfig;

ALTER TABLE huohua_addonapp ADD COLUMN `myapp_icon` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_count` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_versionname` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_sdkver` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_score` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_appid` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_softname` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_cid` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_lang` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_softdesc` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_fee` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_icfa` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_filesize` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_cptype` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_publishtime` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_starnumber` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_cpname` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_pkgid` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_cname` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_downcount` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_description` TEXT NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_features` TEXT NOT NULL DEFAULT '';
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_screenshot` TEXT NOT NULL DEFAULT '';

SELECT * FROM huohua_addonapp;
SELECT * FROM grap_log;

ALTER TABLE huohua_addonsubject ADD COLUMN `myapp_topicid` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `myapp_smallpicurl` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `myapp_bigpicurl` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `myapp_time` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `myapp_description` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `myapp_viewcnt` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `myapp_picurl` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `myapp_disagree` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `myapp_topicname` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `myapp_agree` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonsubject ADD COLUMN `myapp_isad` VARCHAR(60) NOT NULL DEFAULT '';

SHOW CREATE TABLE huohua_addonapp;
SHOW CREATE TABLE huohua_dl_log;
CREATE TABLE myapp_category(
	id INT(10) NOT NULL AUTO_INCREMENT,
	cid VARCHAR(60) NOT NULL DEFAULT '',
	cname VARCHAR(60) NOT NULL DEFAULT '',
	PRIMARY KEY (id)
);
SELECT * FROM myapp_category;

-- 2013-11-09
SELECT * FROM huohua_addonapp;
SELECT * FROM huohua_addonsubject;
SELECT * FROM huohua_comment;

ALTER TABLE myapp_category ADD COLUMN `huohua_cid` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE myapp_category ADD COLUMN `icfa` VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE myapp_category ADD COLUMN `icon` VARCHAR(255) NOT NULL DEFAULT '';
SELECT * FROM myapp_category;
SELECT id FROM huohua_arctype WHERE typename='腾讯软件';
SELECT * FROM huohua_channeltype;
INSERT INTO myapp_category(cid,cname,icon,huohua_cid,icfa) VALUES ('$cid','$cname','$icon','$huohua_cid','$icfa');
INSERT INTO myapp_category(cid,cname,icon,huohua_cid,icfa) VALUES ('1','1','1','1','1');
TRUNCATE myapp_category;
CREATE TABLE grap_log(
	id INT(10) NOT NULL AUTO_INCREMENT,
	`type` VARCHAR(60) NOT NULL DEFAULT '',
	pageNo INT(10) NOT NULL DEFAULT 0 COMMENT '当前页',
	allpage INT(10) NOT NULL DEFAULT 0 COMMENT '总页数',
	perpage INT(10) NOT NULL DEFAULT 0 COMMENT '每页多少条',
	`date` INT(10) NOT NULL DEFAULT 0 COMMENT '日期',
	PRIMARY KEY(id)
);
SELECT * FROM grap_log;
INSERT INTO grap_log(`type`,pageNo,allpage,perpage,`date`) VALUES ('$type','$pageNo','$allpage','$perpage','$date');

SELECT * FROM myapp_category;
CREATE TABLE myapp_banner(
	id INT(10) NOT NULL AUTO_INCREMENT,
	icfa VARCHAR(60) NOT NULL DEFAULT '',
	picsrc VARCHAR(255) NOT NULL DEFAULT '',
	appid VARCHAR(60) NOT NULL DEFAULT '',
	topicid VARCHAR(60) NOT NULL DEFAULT '',
	`type` VARCHAR(60) NOT NULL DEFAULT '',
	tgy VARCHAR(60) NOT NULL DEFAULT '',
	PRIMARY KEY(id)
);
SELECT * FROM myapp_banner;
SHOW CREATE TABLE huohua_addonapp;
SHOW CREATE TABLE huohua_addonsubject;
CREATE TABLE huohua_addonbanner(
	id INT(10) NOT NULL AUTO_INCREMENT,
	picsrc VARCHAR(255) NOT NULL DEFAULT '',
	appid INT(10) NOT NULL DEFAULT 0,
	`type` VARCHAR(60) NOT NULL DEFAULT '',
	topicid INT(10) NOT NULL DEFAULT 0,
	bannerName VARCHAR(60) NOT NULL DEFAULT '',
	`date` INT(10) NOT NULL DEFAULT 0,
	myapp_icfa VARCHAR(60) NOT NULL DEFAULT '',
	myapp_picsrc VARCHAR(255) NOT NULL DEFAULT '',
	myapp_appid VARCHAR(60) NOT NULL DEFAULT '',
	myapp_topicid VARCHAR(60) NOT NULL DEFAULT '',
	myapp_type VARCHAR(60) NOT NULL DEFAULT '',
	myapp_tgy VARCHAR(60) NOT NULL DEFAULT '',
	PRIMARY KEY(id)
);
SHOW CREATE TABLE huohua_addonbanner;

ALTER TABLE huohua_addonbanner ADD COLUMN myapp_icfa VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonbanner ADD COLUMN myapp_picsrc VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonbanner ADD COLUMN myapp_appid VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonbanner ADD COLUMN myapp_topicid VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonbanner ADD COLUMN myapp_type VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonbanner ADD COLUMN myapp_tgy VARCHAR(60) NOT NULL DEFAULT '';

ALTER TABLE huohua_addonbanner ADD COLUMN `weight` INT(10) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonbanner ADD COLUMN `typeid2` VARCHAR(90) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonbanner ADD COLUMN `topTypeId` VARCHAR(90) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonbanner ADD COLUMN `writer` CHAR(20) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonbanner ADD COLUMN `redirecturl` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonbanner ADD COLUMN `sortrank` INT(10) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonbanner ADD COLUMN `ismake` SMALLINT(6) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonbanner ADD COLUMN `shorttitle` CHAR(36) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonbanner ADD COLUMN `color` CHAR(7) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonbanner ADD COLUMN `source` CHAR(30) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonbanner ADD COLUMN `publishdate` INT(10) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonbanner ADD COLUMN `notpost` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonbanner ADD COLUMN `description` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonbanner ADD COLUMN `keywords` CHAR(30) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonbanner ADD COLUMN `filename` VARCHAR(40) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonbanner ADD COLUMN `dutyadmin` MEDIUMINT(8) UNSIGNED NOT NULL DEFAULT '0';

SHOW CREATE TABLE myapp_category;
CREATE TABLE huohua_addonappcategory(
	id INT(10) NOT NULL AUTO_INCREMENT,
	cid VARCHAR(60) NOT NULL DEFAULT '',
	cname VARCHAR(60) NOT NULL DEFAULT '',
	myapp_cid VARCHAR(60) NOT NULL DEFAULT '',
	myapp_cname VARCHAR(60) NOT NULL DEFAULT '',
	myapp_icfa VARCHAR(60) NOT NULL DEFAULT '',
	myapp_icon VARCHAR(60) NOT NULL DEFAULT '',
	PRIMARY KEY(id)
);
ALTER TABLE huohua_addonappcategory ADD COLUMN myapp_cid VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappcategory ADD COLUMN myapp_cname VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappcategory ADD COLUMN myapp_icfa VARCHAR(60) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappcategory ADD COLUMN myapp_icon VARCHAR(60) NOT NULL DEFAULT '';

ALTER TABLE huohua_addonappcategory ADD COLUMN `weight` INT(10) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappcategory ADD COLUMN `typeid2` VARCHAR(90) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappcategory ADD COLUMN `topTypeId` VARCHAR(90) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappcategory ADD COLUMN `writer` CHAR(20) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappcategory ADD COLUMN `redirecturl` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappcategory ADD COLUMN `sortrank` INT(10) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappcategory ADD COLUMN `ismake` SMALLINT(6) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappcategory ADD COLUMN `shorttitle` CHAR(36) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappcategory ADD COLUMN `color` CHAR(7) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappcategory ADD COLUMN `source` CHAR(30) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappcategory ADD COLUMN `publishdate` INT(10) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappcategory ADD COLUMN `notpost` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappcategory ADD COLUMN `description` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappcategory ADD COLUMN `keywords` CHAR(30) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappcategory ADD COLUMN `filename` VARCHAR(40) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappcategory ADD COLUMN `dutyadmin` MEDIUMINT(8) UNSIGNED NOT NULL DEFAULT '0';

CREATE TABLE huohua_addonappchannel(
	id INT(10) NOT NULL AUTO_INCREMENT,
	channelId VARCHAR(60) NOT NULL DEFAULT '',
	channelName VARCHAR(60) NOT NULL DEFAULT '',
	apps TEXT,
	myapp_apps TEXT,
	PRIMARY KEY(id)
);
SHOW CREATE TABLE huohua_addonappchannel;
ALTER TABLE huohua_addonappchannel ADD COLUMN myapp_apps TEXT;

ALTER TABLE huohua_addonappchannel ADD COLUMN `weight` INT(10) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappchannel ADD COLUMN `typeid2` VARCHAR(90) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappchannel ADD COLUMN `topTypeId` VARCHAR(90) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappchannel ADD COLUMN `writer` CHAR(20) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchannel ADD COLUMN `redirecturl` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchannel ADD COLUMN `sortrank` INT(10) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappchannel ADD COLUMN `ismake` SMALLINT(6) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappchannel ADD COLUMN `shorttitle` CHAR(36) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchannel ADD COLUMN `color` CHAR(7) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchannel ADD COLUMN `source` CHAR(30) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchannel ADD COLUMN `publishdate` INT(10) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappchannel ADD COLUMN `notpost` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappchannel ADD COLUMN `description` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchannel ADD COLUMN `keywords` CHAR(30) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchannel ADD COLUMN `filename` VARCHAR(40) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchannel ADD COLUMN `dutyadmin` MEDIUMINT(8) UNSIGNED NOT NULL DEFAULT '0';

-- 精品推荐 装机必备
CREATE TABLE huohua_addonappchanneltype(
	id INT(10) NOT NULL AUTO_INCREMENT,
	channelName VARCHAR(60) NOT NULL DEFAULT '',
	channelShowName VARCHAR(60) NOT NULL DEFAULT '',
	PRIMARY KEY(id)
);
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `weight` INT(10) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `typeid2` VARCHAR(90) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `topTypeId` VARCHAR(90) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `writer` CHAR(20) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `redirecturl` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `sortrank` INT(10) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `ismake` SMALLINT(6) NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `shorttitle` CHAR(36) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `color` CHAR(7) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `source` CHAR(30) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `publishdate` INT(10) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `notpost` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `description` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `keywords` CHAR(30) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `filename` VARCHAR(40) NOT NULL DEFAULT '';
ALTER TABLE huohua_addonappchanneltype ADD COLUMN `dutyadmin` MEDIUMINT(8) UNSIGNED NOT NULL DEFAULT '0';

CREATE TABLE huohua_appcategory(
	id INT(10) NOT NULL AUTO_INCREMENT,
	cid VARCHAR(60) NOT NULL DEFAULT '',
	cname VARCHAR(60) NOT NULL DEFAULT '',
	myapp_cid VARCHAR(60) NOT NULL DEFAULT '',
	myapp_cname VARCHAR(60) NOT NULL DEFAULT '',
	myapp_icfa VARCHAR(60) NOT NULL DEFAULT '',
	myapp_icon VARCHAR(60) NOT NULL DEFAULT '',
	PRIMARY KEY(id)
);
SELECT * FROM huohua_appcategory;
ALTER TABLE huohua_appcategory CHANGE COLUMN `myapp_icon` `myapp_icon` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'myapp_icon';
ALTER TABLE huohua_appcategory ADD COLUMN `icon` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'icon';
ALTER TABLE huohua_appcategory ADD COLUMN `weight` INT(10) NOT NULL DEFAULT 0 COMMENT 'weight';
CREATE TABLE huohua_appbanner(
	id INT(10) NOT NULL AUTO_INCREMENT,
	picsrc VARCHAR(255) NOT NULL DEFAULT '',
	appid INT(10) NOT NULL DEFAULT 0,
	`type` VARCHAR(60) NOT NULL DEFAULT '',
	topicid INT(10) NOT NULL DEFAULT 0,
	bannerName VARCHAR(60) NOT NULL DEFAULT '',
	`date` INT(10) NOT NULL DEFAULT 0,
	myapp_icfa VARCHAR(60) NOT NULL DEFAULT '',
	myapp_picsrc VARCHAR(255) NOT NULL DEFAULT '',
	myapp_appid VARCHAR(60) NOT NULL DEFAULT '',
	myapp_topicid VARCHAR(60) NOT NULL DEFAULT '',
	myapp_type VARCHAR(60) NOT NULL DEFAULT '',
	myapp_tgy VARCHAR(60) NOT NULL DEFAULT '',
	PRIMARY KEY(id)
);
SELECT * FROM huohua_appbanner;
CREATE TABLE huohua_appchanneltype(
	id INT(10) NOT NULL AUTO_INCREMENT,
	channelName VARCHAR(60) NOT NULL DEFAULT '',
	channelShowName VARCHAR(60) NOT NULL DEFAULT '',
	PRIMARY KEY(id)
);
ALTER TABLE huohua_appchanneltype ADD COLUMN `date` INT(10) NOT NULL DEFAULT 0;
SELECT * FROM huohua_appchanneltype;
CREATE TABLE huohua_appchannel(
	id INT(10) NOT NULL AUTO_INCREMENT,
	channelId INT(10) NOT NULL DEFAULT 0 COMMENT 'channelId',
	channelName VARCHAR(60) NOT NULL DEFAULT '',
	`type` INT(10) NOT NULL DEFAULT 0 COMMENT '1 - 装机必备 2 - 精品推荐',
	`name` VARCHAR(60) NOT NULL DEFAULT '',
	appid INT(10) NOT NULL DEFAULT 0,
	myapp_appid VARCHAR(60) NOT NULL DEFAULT '',
	PRIMARY KEY(id)
);
SELECT * FROM huohua_appchannel;
CREATE TABLE huohua_appsubject(
	id INT(10) NOT NULL AUTO_INCREMENT,
	subjectName VARCHAR(60) NOT NULL DEFAULT '',
	picture VARCHAR(255) NOT NULL DEFAULT '',
	description VARCHAR(255) NOT NULL DEFAULT '',
	`date` INT(10) NOT NULL DEFAULT 0 COMMENT 'date',
	pubDate INT(10) NOT NULL DEFAULT 0 COMMENT 'pubDate',
	click INT(10) NOT NULL DEFAULT 0 COMMENT 'click',
	goodNum INT(10) NOT NULL DEFAULT 0 COMMENT 'goodNum',
	badNum INT(10) NOT NULL DEFAULT 0 COMMENT 'badNum',
	PRIMARY KEY(id)
);
CREATE TABLE huohua_appsubject_app(
	id INT(10) NOT NULL AUTO_INCREMENT,
	subjectId INT(10) NOT NULL DEFAULT 0 COMMENT 'badNum',
	appid INT(10) NOT NULL DEFAULT 0 COMMENT 'badNum',
	myapp_appid VARCHAR(60) NOT NULL DEFAULT '' COMMENT 'myapp_appid',
	`date` INT(10) NOT NULL DEFAULT 0 COMMENT 'date',
	PRIMARY KEY(id)
);

SELECT * FROM huohua_addonapp;
SELECT * FROM huohua_addonappcategory;
SELECT * FROM huohua_addonappchannel;
SELECT * FROM huohua_addonappchanneltype;
SELECT * FROM huohua_addonbanner;
SELECT * FROM huohua_addonsubject;

SELECT * FROM huohua_arctiny;
DELETE FROM huohua_arctiny WHERE id > 11;
ALTER TABLE huohua_arctiny AUTO_INCREMENT = 12;
UPDATE huohua_arctiny SET channel=-3 WHERE typeid=44;
SELECT * FROM huohua_channeltype;
SELECT * FROM huohua_arctype;

SHOW CREATE TABLE huohua_addonappcategory;
TRUNCATE TABLE huohua_addonappcategory;
INSERT INTO huohua_addonappcategory(cid,cname,myapp_cid,myapp_cname,myapp_icfa,myapp_icon) VALUES ('6','1','106','1','15144196000106001000','http://appimg1.3g.qq.com/msoft/icon/IP/m10w2/fenleilogo/kongjian.png');

SHOW CREATE TABLE huohua_addonapp;
SELECT * FROM huohua_addonapp;
ALTER TABLE huohua_addonapp ADD COLUMN `myapp_downloadurl` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'myapp_downloadurl';

SELECT * FROM grap_log;
ALTER TABLE grap_log ADD COLUMN `url` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'url';
SELECT COUNT(1) `count` FROM huohua_addonapp WHERE myapp_appid="";

SHOW CREATE TABLE grap_log;
CREATE TABLE app_log(
	id INT(10) NOT NULL AUTO_INCREMENT,
	`type` VARCHAR(60) NOT NULL DEFAULT '' COMMENT 'type',
	url VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'url',
	`date` INT(10) NOT NULL DEFAULT 0 COMMENT 'date',
	PRIMARY KEY(id)
);
ALTER TABLE app_log ADD COLUMN `method` VARCHAR(60) NOT NULL DEFAULT '' COMMENT 'method';
ALTER TABLE app_log ADD COLUMN `sql` TEXT;
SELECT * FROM app_log;
SELECT * FROM huohua_addonapp;
UPDATE huohua_addonapp SET arcrank=0,`mid`=1 WHERE myapp_appid='50801';
ALTER TABLE huohua_addonapp ADD COLUMN `count` INT(10) NOT NULL DEFAULT 0 COMMENT 'count';
ALTER TABLE huohua_addonapp ADD COLUMN `downcount` VARCHAR(60) NOT NULL DEFAULT '' COMMENT 'downcount';
SELECT COUNT(1) COUNT FROM huohua_addonapp WHERE myapp_appid='45592';

INSERT INTO app_log(`type`,method,`sql`,`date`) VALUES ('app','insert','','1384104017');
INSERT INTO app_log(`type`,method,`sql`,`date`) VALUES ('app','insert','','1384104017');

SELECT * FROM huohua_addonapp;
SELECT * FROM app_log;

-- 2013-11-11
SELECT * FROM huohua_addonapp;
SELECT * FROM huohua_addonapp WHERE myapp_appid='730577';
SELECT * FROM app_log;
SELECT * FROM grap_log;

SELECT * FROM huohua_addonsubject;
SELECT * FROM huohua_appsubject;
SELECT * FROM huohua_appsubject_app;
SELECT * FROM huohua_appbanner;
SELECT * FROM huohua_addonsubject;
SHOW CREATE TABLE huohua_addonsubject;
ALTER TABLE huohua_addonsubject ADD COLUMN `type` VARCHAR(60) NOT NULL DEFAULT '' COMMENT 'type:common topadvs';
ALTER TABLE huohua_addonsubject ADD COLUMN `smallpicurl` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'smallpicurl';
ALTER TABLE huohua_addonsubject ADD COLUMN `bigpicurl` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'bigpicurl';
ALTER TABLE huohua_addonsubject ADD COLUMN `myapp_type` VARCHAR(60) NOT NULL DEFAULT '' COMMENT 'myapp_type:common topadvs';
ALTER TABLE huohua_addonsubject ADD COLUMN `myapp_smallpicurl` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'myapp_smallpicurl';
ALTER TABLE huohua_addonsubject ADD COLUMN `myapp_bigpicurl` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'myapp_bigpicurl';
SELECT * FROM huohua_addonsubject;