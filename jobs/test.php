<?php
	$str = '{"test":"test"}';
	$obj = new StdClass;
	$obj -> p1 = "";
	class Foo {
		public $p1;
		protected $p2;
		private $p3;
	}
	$json = json_decode($str);
	$reflect = new ReflectionObject($obj);
	echo $reflect -> hasProperty("test");
	
	include("functions.php");
	include("entities\Entity.php");
	class TestEntity extends Entity {
		public function __construct() {
			parent::__construct("test");
		}
		
		function iterateVisible() {
			echo "Entity::iterateVisible:\n";
			foreach($this as $key => $value) {
				print "$key => $value\n";
			}
		}
	}
	$testEntity = new TestEntity();
	$reflect = new ReflectionObject($testEntity);
	
	foreach($testEntity as $key => $value) {
		print "$key => $value\n";
	}
	echo "\n";
	
	$testEntity -> iterateVisible();
	
	$str = "Don't be shy";
	echo str_replace("'", "\'", $str);
	
	
	
	//取得指定位址的內容，並儲存至text
	$text = file_get_contents('http://andy.diimii.com/');
	//取得所有img標籤，並儲存至二維陣列match
	preg_match_all('#<img[^>]*>#i', $text, $match);
	//印出match
	print_r($match);
	
	//取得指定位址的內容，並儲存至text
	$text = file_get_contents('http://andy.diimii.com/');
	//取得第一個img標籤，並儲存至陣列match（regex語法與上述同義）
	preg_match('/<img[^>]*>/Ui', $text, $match);
	//印出match
	print_r($match);
	
	//取得指定位址的內容，並儲存至text
	$text = file_get_contents('http://andy.diimii.com/2009/01/seo化的關鍵字廣告連結/');
	//去除換行及空白字元（序列化內容才需使用）
	//$text=str_replace(array("\r","\n","\t","\s"), '', $text);
	//取出div標籤且id為PostContent的內容，並儲存至陣列match
	preg_match('/<div[^>]*id="PostContent"[^>]*>(.*?) <\/div>/si', $text, $match);
	//印出match[0]
	print($match[0]);
	
	//取得指定位址的內容，並儲存至text
	$text = file_get_contents('http://andy.diimii.com/2009/01/seo化的關鍵字廣告連結/');
	//取出div標籤且id為PostContent的內容，並儲存至陣列match
	preg_match('/<div[^>]*id="PostContent"[^>]*>(.*?) <\/div>/si',$text,$match);
	//取得第一個img標籤，並儲存至陣列match2
	preg_match('/<img[^>]*>/Ui', $match[0], $match2);
	//印出match2[0]
	print_r($match2[0]);
	
	function() {
		// 说明：浏览该PHP文件将直接看到图片
		$image = "";
		header("Content-type: image/gif");
		exit(base64_decode($image));
	}
?>