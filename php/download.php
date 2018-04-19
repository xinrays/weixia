<?php
	$link = mysql_connect('localhost','root','1996') or die('链接数据库失败'.mysql.error());
	header("content-type:text/html;charset=utf-8");//定义页面编码
	if($link){
		mysql_query("set names 'utf8'");//设置入库编码
		mysql_query("set character set 'utf8'");//设置读库编码  
		mysql_select_db('test');
		
		$postDate = file_get_contents('php://input',true);
		$obj = json_decode($postDate);
		
		$id = $obj -> id;
		$json ="";
		$data = array();
		class bookDetails {
			public $id;
			public $user;
			public $details;
			public $images;
		};
		$rel = "select * from bookdetails where id = '$id'";
		$a = mysql_query($rel);
		if($a){
			while($row = mysql_fetch_array($a)){
				$bookDetails = new bookDetails();
				$bookDetails -> id = $row['id'];
				$bookDetails -> user = $row['user'];
				$bookDetails -> details = $row['details'];
				$bookDetails -> images = $row['image'];
				$data[] = $bookDetails;
			}
			$json = json_encode($data);
			echo $json; 
		}else{
			echo '查询失败';
		}
	}
?>