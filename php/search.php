<?php
	header("content-type:text/html;charset=utf8");
	$link = mysql_connect('localhost','root','1996') or die('连接mysql失败:'.mysql.error());
	if($link){
		mysql_select_db('test');
		$json = '';
		$data = array();
		class User {
			public $id;
			public $fname;
			public $lname;
			public $email;
		}
		// 创建连接
		$sql = "select * from bookDetails where user = $_GET['user']";
		$rel = mysql_query($sql);
		if($rel){
			//echo "查询成功";
			while ($row = mysql_fetch_array($rel)){
				$user = new User();
				$user->id = $row["id"];
				$user->fname = $row["user"];
				$user->lname = $row["details"];
				$user->email = $row["image"];
				$data[]=$user;
			}
			//echo '获取成功';
			$json = json_encode($data);//把数据转换为JSON数据.
			echo $json;
		}else{
			echo '查询失败';
		}
	}else{
		echo '链接数据库失败';
	}
?>