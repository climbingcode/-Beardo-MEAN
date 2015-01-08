app.controller("sessionCtrl", function($scope, $http, $timeout, $cookies, $routeParams, apiHandler) {
	
	$scope.logInError = false;
	
	$scope.signIn = function() {
		user = apiHandler.show("session", $scope.signInForm, function(user) {
			if (user.data) {
				$scope.inSession = true;	
				$scope.user = user.data;
				$scope.userBeard = user.beard;
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

	$scope.signUp = function() {
		user = apiHandler.create("user", $scope.signUpForm, function(data) {
			console.log(data);
			if (data) {
				$scope.inSession = true;	
				$scope.user = data;
				$scope.loginError = false;
			} else {
				$scope.inSession = false;
			}
		});
	}

	$scope.logOut = function() {
		apiHandler.destroy("session", $scope.user, function(data) {
			console.log("user has been logged out!");
		});
		$scope.inSession = false;
		$scope.user = null;
	}

});