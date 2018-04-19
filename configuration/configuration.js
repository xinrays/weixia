const configuration = angular.module('myApp',["ngRoute","ui.router"]);//定义angular的监管范围,对路由进行依赖

configuration
.controller('myCler',($scope, $route, $http, $location, $rootScope) => {
	$scope.$route = $route;
	$scope.main = '1';
})
//主页
.controller('bookrack',($scope, $route, $http, $routeParams, $state, $location) => {
	$scope.$route = $route;
	$scope.name = [];
//	$scope.details = (ids) => {
//		$stateProvider.state('item', {
//			url:"item/:id/",
//			templateUrl:"sabPage/download.html",
//			controller:"download"
//		})
//		$state.go('item',{id:ids});
//		(()=>{$location.path("/download")})();
////		$http.post('sabPage/download.html',{})
//	}
	$scope.details = (ids) => {
		$state.go('download',{id:ids});
	}
	$http({
		method: 'GET',
		url: 'php/gain.php'
	}).then(function successCallback(response) {
		$scope.name = response.data;
	},function errorCallback(response) {
		console.log(response);
	})
})
//
.controller('community',($scope, $route) => {
	$scope.$route = $route;
})
//
.controller('discover',($scope, $route) => {
	$scope.$route = $route;
})
//个人页面
.controller('myself',($scope, $route, $location, $rootScope) => {
	$scope.$route = $route;
	
	$scope.username = angular.fromJson(localStorage.getItem('username'));
	$scope.nickname = angular.fromJson(localStorage.getItem('nickname'));
	$scope.headPor = angular.fromJson(localStorage.getItem('headPor'));
	if($scope.username!=null){
		if($scope.nickname == ""){ $scope.username = $scope.username;}
		else{ $scope.username = $scope.nickname;};
		
		$scope.headPor = $scope.headPor;
		$scope.loginPath = '#/loginQueen';
	}else{
		$scope.username="点击登陆";
		$scope.headPor = "image/2.jpg";
		$scope.loginPath = '#/login';
	}
})
//
.controller('search',($scope, $route) => {
	$scope.$route = $route;
})
//登录
.controller('login',($scope, $route, $http, $location, $rootScope) => {
	$scope.$route = $route;
	$scope.login = () => {
		if($scope.user!=null||$scope.pass!=null){
			$http.post('php/login.php',{user: $scope.user,pass: $scope.pass})
			.success(function (response) {
				if(response != ""){
					localStorage.setItem('id',angular.toJson(response[0].id));
					localStorage.setItem('username',angular.toJson(response[0].username));
					localStorage.setItem('passname',angular.toJson(hex_md5(response[0].passname)));
					localStorage.setItem('nickname',angular.toJson(response[0].nickname));
					localStorage.setItem('headPor',angular.toJson(response[0].headPor));
					localStorage.setItem('gender',angular.toJson(response[0].gender));
					localStorage.setItem('currency',angular.toJson(response[0].currency));
					localStorage.setItem('LandingTime',angular.toJson(response[0].LandingTime));
					layer.msg('登录成功，跳转到我的信息页面');
					(()=>{$location.path("/myself")})();
				}else{
					layer.msg('登录失败，用户名或密码错误!');
				}
			})
			.error(function (response) { alert(response); });
		}else{ layer.msg('请填写正确的格式'); }
	};
})
//注册
.controller('sign',($scope, $route, $http, $location, $state) => {
	$scope.$route = $route;
	$scope.sign = () => {
		if($scope.user == null){layer.msg('用户名不能为空');}
		else if($scope.pass == null){layer.msg('密码不能为空');}
		else{
			$http.post("php/sign.php",{user: $scope.user,pass: $scope.pass})
			.success(function (response) {
				console.log(response);
				if(response == 1){
					layer.msg('注册成功，跳转到登录页面');
//					(()=>{$location.path("/login")})();
					$state.go("login",{});
				}else{
					layer.msg('注册失败，此用户名以被注册');
				}
			})
			.error(function (response) {
				layer.msg(response);
			})
		}
	}
})
//登录完成后页面
.controller('loginQueen',($scope, $route, $rootScope, $location, $http) => {
	$scope.$route = $route;
	//将保存在localStorage里面的数据取出来，放到定义好的参数里面去
	$scope.id = angular.fromJson(localStorage.getItem('id'));
	$scope.username = angular.fromJson(localStorage.getItem('username'));
	$scope.nickname = angular.fromJson(localStorage.getItem('nickname'));
	$scope.headPor = angular.fromJson(localStorage.getItem('headPor'));
	$scope.gender = angular.fromJson(localStorage.getItem('gender'));
	$scope.currency = angular.fromJson(localStorage.getItem('currency'));
	$scope.LandingTime = angular.fromJson(localStorage.getItem('LandingTime'));
	//定义logint点击事件，点击清除登录时保存的信息
	$scope.logint = () => {
		localStorage.removeItem("id");
		localStorage.removeItem("username");
		localStorage.removeItem('passname');
		localStorage.removeItem("nickname");
		localStorage.removeItem("headPor");
		localStorage.removeItem("gender");
		localStorage.removeItem("currency");
		localStorage.removeItem("LandingTime");
		layer.msg('注销成功，请重新登陆');
		(()=>{$location.path("/myself")})();
	};
	//定义retrun_myself点击事件，点击返回myself页面
	$scope.return_myself = () => { (()=>{$location.path("/myself")})(); };
	
	if( $scope.nickname == "" ){ $scope.nickname = "未设置"; }
	else{ $scope.nickname = $scope.nickname; }
	
	$scope.loginQueenHeadPor = () => {
		
	}
	$scope.loginQueenNickname = () => {
		layer.prompt({
			title:'修改昵称为:'
		},function(val, index){
//			layer.msg('得到了'+val);
			layer.close(index);
			$http.post("php/userDataChange.php",
			{id:$scope.id,nickname:val})
			.success(function (response) {
				if(response){
					localStorage.setItem('nickname',angular.toJson(val));
					$scope.nickname = angular.fromJson(localStorage.getItem('nickname'));
					layer.msg('修改成功');
				}else{
					layer.msg('修改失败，发生错误');
				}
			})
			.error(function (response) {
				
			})
		});
	}
	$scope.loginQueenUsername = () => {
		layer.prompt({
			title:'修改手机号码为:'
		},(val, index)=>{
//			layer.msg('得到了'+val);
			
			layer.close(index);
			$http.post("php/userDataChange.php",
			{id:$scope.id,username:val})
			.success( (response)=>{
				if(response){
					localStorage.setItem('username',angular.toJson(val));
					$scope.username = angular.fromJson(localStorage.getItem('username'));
					layer.msg('修改成功');
				}else{
					layer.msg('修改失败，发生错误');
				}
			})
			.error((response)=>{
				
			})
		});
	};
	$scope.loginQueenSex = () => {
		console.log('111');
		layer.confirm('请确定要把性别修改为？', {
			btn: ['男','女'] //按钮
		}, function(){
			$http.post('php/userDataChange.php',{id:$scope.id,gender: '男'})
			.success(function (response) {
				if(response){
					localStorage.setItem('gender',angular.toJson('男'));
					$scope.gender = angular.fromJson(localStorage.getItem('gender'));
					layer.msg('性别修改成功');
				}else{
					layer.msg('修改失败');
				}
			})
			.error(function () {
				
			})
		}, function(){
			$http.post('php/userDataChange.php',{id:$scope.id,gender:'女'})
			.success(function (response) {
				if(response){
					localStorage.setItem('gender',angular.toJson('女'));
					$scope.gender = angular.fromJson(localStorage.getItem('gender'));
					layer.msg('性别修改成功');
				}else{
					layer.msg('修改失败');
				}
			})
			.error(function () {
				
			})
		});
	}
})
//主页跳转页面
.controller('download', ($scope, $http, $location, $rootScope, $stateParams) => {
//	 $stateProvider
//	.state('bookrack', {
//      url: "/bookrack.html",
//      templateUrl: "sabPage/bookrack.html",
//      data: {pageTitle: '登陆'},
//      params: {'id': null},
//      controller: "bookrack"
//      
//  })
	$scope.name = $stateParams.id;
	console.log($scope.name);
	$http.post('php/download.php',{id:$stateParams.id})
	.success(function (respose) {
		$scope.id = respose[0].id;
		$scope.user = respose[0].user;
		$scope.details = respose[0].details;
		$scope.images = respose[0].images;
	})
	
})
//.filter("myFilter",() => {
//	return function (value) {
//		console.log(toString(value))
//		console.log(value);
//		return value = value.split('"').join('');
//	}
//})


