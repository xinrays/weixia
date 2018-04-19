<?php
	$link = mysql_connect('localhost','root','1996') or die('链接数据库失败'.mysql.error());
	header("content-type:text/html;charset=utf-8");
	mysql_query("set names 'utf8'");
	mysql_query("set character set 'utf8'");//读库  
	mysql_select_db('test');
	
	$postData = file_get_contents('php://input', true);//将接收的json数据转为表单数组的形式
	$obj=json_decode($postData);  
	
	$id = $obj-> id;
	if($obj->nickname){
		$nickname = $obj-> nickname;
		$xg = "update user set nickname=\"{$nickname}\" where id=$id";
		$res = mysql_query($xg) or die('sql语句执行失败，错误信息是：' . mysql_error());
		if($res){echo '1';}
		else{echo '0';}
	}
	if($obj->username){
		$username = $obj -> username;
		$xg = "update user set user=\"{$username}\" where id=$id";
		$res = mysql_query($xg) or die('sql语句执行失败，错误信息是：' . mysql_error());
		if($res){echo '1';}
		else{echo '0';}
	}
	if($obj->gender){
		$gender = $obj->gender;
		$xg = "update user set gender=\"{$gender}\" where id=$id";
		$res = mysql_query($xg) or die('sql语句执行失败,错误信息是:'. mysql_error());
		if($res){echo '1';}
		else{echo '0';}
	}
	
?>