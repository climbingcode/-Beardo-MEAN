app.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/login', {
		tempalateUrl: "api/login",
		controller: "sessionCtrl"
	});
});