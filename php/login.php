<?php
	$link = mysql_connect('localhost','root','1996') or die('链接数据库失败'.mysql.error());
	header("content-type:text/html;charset=utf-8");//定义页面编码
	mysql_query("set names 'utf8'");//设置入库编码
	mysql_query("set character set 'utf8'");//设置读库编码  
	mysql_select_db('test');
	
	$postData = file_get_contents('php://input', true);  //将传过来的json数据以表单数组的形式读取
	$obj=json_decode($postData);    
	
	$user = $obj -> user;
	$pass = md5($obj -> pass);
	
	$id = "";
	$json = '';//创建一个叫$json
	$data = array();//创建一个叫$data的数组
	class User {//创建一个User
		public $id;
		public $username;
		public $passname;
		public $headPor;
		public $nickname;
		public $gender;
		public $currency;
		public $LandingTime;
	}
	
	$rel = "select * from user where user='$user' and pass='$pass'";//查询传过来的数据是否与查询到的数据相同
	
	$a = mysql_query($rel) or die('sql语句执行失败，错误信息是：' . mysql_error());//执行这条mysql语句，如果错误则返回=
	$num = mysql_num_rows($a);//执行这条
	
	
	
	if($num = 1){
		
		while($arr = mysql_fetch_array($a)){
			$id = $arr['id'];
		}
		
		$nowUserinfo = "select * from user where id='$id'";
		$row = mysql_query($nowUserinfo);
		
		if($row){
			while ($rel = mysql_fetch_array($row)){//循环查询到的数据
				$user = new User();
				$user->id = $rel["id"];
				$user->username = $rel["user"];
				$user->passname = $rel["pass"];
				$user->headPor = $rel["headPor"];
				$user->nickname = $rel['nickname'];
				$user->gender = $rel['gender'];
				$user->currency = $rel['currency'];
				$user->LandingTime = $rel['LandingTime'];
				$data[]=$user;
			}
			//echo '获取成功';
			$json = json_encode($data);//把数据转换为JSON数据.
			echo $json;//将查询到的json数据返回回view层
		}
	}else{
		echo "";
	}
?>