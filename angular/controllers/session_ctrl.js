app.controller("sessionCtrl", ["$scope", "$http", "$timeout", "$routeParams", "$cookies", "apiHandler", "dataFactory", function($scope, $http, $timeout, $cookies, $routeParams, apiHandler, dataFactory) {
	
	$scope.logInError = false;
	
	$scope.signIn = function() {
		apiHandler.show("session", $scope.signInForm, function(data) {
			dataSetter(data);
			console.log(data);
			dataFactory.averageVote([data.beard], function(beard) {
				$scope.beard = beard[0];
			});
		});	
	}

	$scope.signUp = function() {
		apiHandler.create("user", $scope.signUpForm, function(data) {
			dataSetter(data);
		});
	}

	$scope.logOut = function() {
		apiHandler.destroy("session", $scope.user, function(data) {
			console.log("user has been logged out!");
		});
		$scope.inSession = false;
		$scope.beard = false;
		$scope.user = null;
	}

	var dataSetter = function(user) {
			if (user) {
				$scope.inSession = true;	
				$scope.user = user.data;
				if (user.beard) { $scope.beard = user.beard; }
				$scope.logInError = false;
				$scope.clickBeard();
			} else {
				console.log("error reached");
				$scope.inSession = false;
				$scope.logInError = true;
				$scope.beard = false;
				$timeout(function() {
					$scope.logInError = false;
				}, 3000);
			}
			console.log($scope.hasBeard);
	}

}]);