app.controller("formCtrl", function($scope, apiHandler, dataFactory) {
	
	$scope.hasBeard = false;
	//form
	$scope.beardtypes = [{image: "images/beard-1.png", name: "full beards"}, 
											{image: "images/beard-1.png", name: "partial beard"}, 
											{image: "images/beard-1.png", name: "goatie"}];

	$scope.form = {};
	
	$scope.submitForm = function(form) {
		apiHandler.upload($scope.form, $scope.photo, function(data) {
			$scope.slidesLoaded;
			$scope.beards.push()
			$scope.beards = data.data;
			$scope.slidesLoaded = true;
			$scope.hasBeard = data.beard;
			$scope.clickBeard();
		});
	};

	$scope.delete = function(url, value) {
		apiHandler.destroy(url, value, function(data) {
			if (data.type = "user deleted") {
				$scope.inSession = false;
				console.log("deleted user", data.user);
			} else if (data.type = "beard removed") {
				$scope.hasBeard = false;
				console.log("deleted beard", data.beard);
			}
		});		
	}

});