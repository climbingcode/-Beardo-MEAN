app.controller("sessionCtrl", function($scope, $http, $timeout, $routeParams, apiHandler) {
	
	$scope.logInError = false;

	$scope.signIn = function() {
		user = apiHandler.show("signin", $scope.signInForm, function(data) {
			console.log(data);
			if (data.type === "found") {
				$scope.inSession = true;	
				$scope.user = data.user;
				$scope.logInError = false;
			} else {
				$scope.inSession = false;
				$scope.logInError = true;
				$timeout(function() {
					$scope.logInError = false;
				}, 3000);
			}
		});	
	}

	$scope.signUp =  function() {
		user = apiHandler.create("signup", $scope.signUpForm, function(data) {
			console.log(data);
			if (data) {
				$scope.inSession = true;	
				$scope.user = data;
				$scope.loginError = false;
			} else {
				$scope.inSession = null;
			}
		});
	}

	$scope.logOut = function() {
		$scope.inSession = null;
		$scope.user = null;
	}

});