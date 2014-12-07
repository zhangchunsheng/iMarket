iMarket
=======

android&iOS app market

## about

<pre>
This project base on dedecms http://www.dedecms.com/

Fatal error: Call to undefined function imagettftext().

You need to compile PHP with more options.

--with-gd
--enable-gd-native-ttf
--with-png
--with-zlib-dir=/usr/local/lib/zlib-1.2.1
--with-ttf
--with-jpeg-dir=/usr/local/lib/jpeg-6b/
--with-freetype-dir=/usr/local/lib/freetype-2.1.9/
--with-xpm-dir=/usr/X11R6/
</pre>

## 修改hosts文件

### windows:

c:\windows\system32\drivers\etc\hosts

### linux:

/etc/hosts

### macox:

/etc/hosts

### 增加内容

<pre>
127.0.0.1 www.huohuamarket.com
</pre>

## php.ini

<pre>
request_order="CGP"
</pre>
