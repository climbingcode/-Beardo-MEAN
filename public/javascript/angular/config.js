app.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/login', {
		tempalateUrl: "api/signin.ejs",
		controller: "sessionCtrl"
	});
});