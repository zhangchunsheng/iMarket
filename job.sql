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
SELECT * FROM huohua_channeltype;
SELECT * FROM huohua_arctype;
SELECT * FROM huohua_arctype WHERE reid=0;

SELECT * FROM huohua_member;

SHOW CREATE TABLE huohua_member;

SHOW CREATE TABLE huohua_addonspec;