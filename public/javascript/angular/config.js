app.config(function($routeProvider, $locationProvider, $httpProvider){
	
	$routeProvider
	.when('/login', {
		tempalateUrl: "api/signin.ejs",
		controller: "sessionCtrl"
	});
	
});

