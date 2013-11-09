<?php
	/**
	 * file
	 * file_get_contents
	 * curl
	 */
	define("DEBUG", true);
	define("STARTTIME", microtime());
	$_SGLOBAL = array();
	include("MysqlUtil.class.php");
	include("../libs/simplehtmldom_1_5/simple_html_dom.php");
	
	$db = new MysqlUtil();
	$db -> charset = "utf8";
	$db -> connect("localhost:3306", "root", "root", "huohuamarket");
	
	$url = "http://www.cnphp.info/php-simple-html-dom-parser-intro.html";
	
	// 新建一个Dom实例
	$html = new simple_html_dom();
	 
	// 从url中加载
	$html -> load_file($url);
	 
	// 从字符串中加载
	//$html -> load('<html><body>从字符串中加载html文档演示</body></html>');
	 
	//从文件中加载
	//$html -> load_file('path/file/test.html');
	
	//查找html文档中的超链接元素
	$a = $html -> find('a');
	 
	//查找文档中第(N)个超链接，如果没有找到则返回空数组.
	$a = $html -> find('a', 0);
	 
	// 查找id为main的div元素
	$main = $html -> find('div[id=main]', 0);
	 
	// 查找所有包含有id属性的div元素
	$divs = $html -> find('div[id]');
	 
	// 查找所有包含有id属性的元素
	$divs = $html -> find('[id]');
	
	// 查找id='#container'的元素
	$ret = $html -> find('#container');
	 
	// 找到所有class=foo的元素
	$ret = $html -> find('.foo');
	 
	// 查找多个html标签
	$ret = $html -> find('a, img');
	 
	// 还可以这样用
	$ret = $html -> find('a[title], img[title]');
	
	// 查找 ul列表中所有的li项
	$ret = $html -> find('ul li');
	 
	//查找 ul 列表指定class=selected的li项
	$ret = $html -> find('ul li.selected');
	
	$e = $html -> find('a', 0);
	// 返回父元素
	$e -> parent;
	 
	// 返回子元素数组
	$e -> children;
	 
	// 通过索引号返回指定子元素
	$e -> children(0);
	 
	// 返回第一个资源速
	$e -> first_child ();
	 
	// 返回最后一个子元素
	$e -> last_child();
	 
	// 返回上一个相邻元素
	$e -> prev_sibling ();
	 
	//返回下一个相邻元素
	$e -> next_sibling ();
	
	/**
	 * 使用简单的正则表达式来操作属性选择器。
	 * [attribute] – 选择包含某属性的html元素
	 * [attribute=value] – 选择所有指定值属性的html元素
	 * [attribute!=value]- 选择所有非指定值属性的html元素
	 * [attribute^=value] -选择所有指定值开头属性的html元素
	 * [attribute$=value] 选择所有指定值结尾属性的html元素
	 * [attribute*=value] -选择所有包含指定值属性的html元素
	 */
	 // 本例中将$a的锚链接值赋给$link变量
	$link = $a -> href;
	$link = $html -> find('a', 0) -> href;
	
	/**
	 * 每个对象都有4个基本对象属性:
	tag – 返回html标签名
	innertext – 返回innerHTML
	outertext – 返回outerHTML
	plaintext – 返回html标签中的文本
	 */
	 
	 //给$a的锚链接赋新值
	$a -> href = 'http://www.cnphp.info';
	 
	// 删除锚链接
	$a -> href = null;
	 
	// 检测是否存在锚链接
	if(isset($a -> href)) {
		//代码
	}
	
	// 封装元素
	$e -> outertext = '<div class="wrap">' . $e -> outertext . '<div>';
 
	// 删除元素
	$e -> outertext = '';
	 
	// 添加元素
	$e -> outertext = $e->outertext . '<div>foo<div>';
	 
	// 插入元素
	$e -> outertext = '<div>foo<div>' . $e->outertext;
	
	$html -> clear();
?>