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
?>