<?php
	header("content-type:text/html;charset=utf8");
	$link = mysql_connect('localhost','root','1996') or die('连接mysql失败:'.mysql_error());//链接数据库
	if($link){
		mysql_select_db('test');//链接数据库
		$json = '';//创建一个叫$json
		$data = array();//创建一个叫￥data的数组
		class User {//创建一个User
			public $id;
			public $fname;
			public $lname;
			public $email;
		}
		// 创建连接
		$sql = "select * from bookDetails";//一条查询bookDetails表的全部数据
		$rel = mysql_query($sql);//执行上面的mysql语句
		if($rel){
			//echo "查询成功";
			while ($row = mysql_fetch_array($rel)){//循环查询到的数据
				$user = new User();
				$user->id = $row["id"];
				$user->fname = $row["user"];
				$user->lname = $row["details"];
				$user->email = $row["image"];
				$data[]=$user;
			}
			//echo '获取成功';
			$json = json_encode($data);//把数据转换为JSON数据.
			echo $json;//将查询到的json数据返回回view层
		}else{
			echo '查询失败';
		}
	}else{
		echo '链接数据库失败';
	}
?>