configuration
//.config(($routeProvider) => {
//	$routeProvider
//	.when('/bookrack',{
//		templateUrl:'sabPage/main.html',
//		controller:'bookrack'
//	})
//	.when('/community',{
//		templateUrl:'sabPage/community.html',
//		controller:'community'
//	})
//	.when('/discover',{
//		templateUrl:'sabPage/discover.html',
//		controller:'discover'
//	})
//	.when('/myself',{
//		templateUrl:'sabPage/myself.html',
//		controller:'myself'
//	})
//	.when('/search',{
//		templateUrl:'sabPage/search.html',
//		controller:'search'
//	})
//	.when('/login',{
//		templateUrl:'sabPage/login.html',
//		controller:'login'
//	})
//	.when('/sign',{
//		templateUrl:'sabPage/sign.html',
//		controller:'sign'
//	})
//	.when('/loginQueen',{
//		templateUrl:'sabPage/loginQueen.html',
//		controller:'loginQueen'
//	})
//	.when('/download',{
//		templateUrl:'sabPage/download.html',
//		controller:'download'
//	})
//	.otherwise({
//		redirectTo:'/bookrack'
//	})
//})



.config(($stateProvider, $urlRouterProvider) => {
	$urlRouterProvider.otherwise("/bookrack");
	$stateProvider
	.state('bookrack',{
		name:"bookrack",
		url:"/bookrack",
		templateUrl:'sabPage/main.html',
		controller:'bookrack'
	})
	.state('community',{
		name:"community",
		url:"/community",
		templateUrl:'sabPage/community.html',
		controller:'community'
	})
	.state('discover',{
		name:"discover",
		url:"/discover",
		templateUrl:'sabPage/discover.html',
		controller:'discover'
	})
	.state('myself',{
		name:"myself",
		url:"/myself",
		templateUrl:'sabPage/myself.html',
		controller:'myself'
	})
	.state('search',{
		name:"search",
		url:"/search",
		templateUrl:'sabPage/search.html',
		controller:'search'
	})
	.state('login',{
		name:"login",
		url:"/login",
		templateUrl:'sabPage/login.html',
		controller:'login'
	})
	.state('sign',{
		name:"sign",
		url:"/sign",
		templateUrl:'sabPage/sign.html',
		controller:'sign'
	})
	.state('loginQueen',{
		name:"loginQueen",
		url:"/loginQueen",
		templateUrl:'sabPage/loginQueen.html',
		controller:'loginQueen'
	})
	.state('download',{
		name:"download",
		url:"/download",
		templateUrl:'sabPage/download.html',
		controller:'download',
		params: {id:null}
	})
})