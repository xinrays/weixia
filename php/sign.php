<?php
	$link = mysql_connect('localhost','root','1996') or die('链接数据库失败'.mysql.error());
	header("content-type:text/html;charset=utf-8");
	mysql_query("set names 'utf8'");
	mysql_query("set character set 'utf8'");//读库  
	mysql_select_db('test');
	$DateTime = new DateTime();
	
	$postData = file_get_contents('php://input', true);//将接收的json数据转为表单数组的形式
	$obj=json_decode($postData);      
	$user = $obj-> user;
	$pass = md5($obj -> pass);
	$headPor = "image/17.jpg";
	$nickname = "";
	$gender = "未设置";
	$currency = "未设置";
	$LandingTime = "2017.09.14";
	
	$query1 = "select * from user where user='$user'";   //定义查询语句
	
	
//	$rel = "select * from user where user=$user";
	$a = mysql_query($query1) or die('sql语句执行失败，错误信息是：' . mysql_error());//执行查询语句
	
	$num = mysql_num_rows($a);//获取查询语句总共影响到几条数据
	
	if($num == '0'){//如果没有受到影响
		echo '1';//返回1
		$b = "insert into user(user, pass, headPor, nickname, gender, currency, LandingTime) values ('$user','$pass','$headPor','$nickname','$gender','$currency','$LandingTime')";//并将用户信息储存
		$a = mysql_query($b) or die('sql语句执行失败，错误信息是：' . mysql_error());//执行mysql语句
	}else{
		echo '0';//如果受到影响，返回0
	};
?>