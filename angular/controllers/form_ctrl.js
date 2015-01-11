app.controller("formCtrl", ["$scope", "apiHandler", "dataFactory", function($scope, apiHandler, dataFactory) {
	
	//form
	$scope.beardtypes = [{image: "images/beard-1.png", name: "full beards"}, 
											{image: "images/beard-1.png", name: "partial beard"}, 
											{image: "images/beard-1.png", name: "goatie"}];

	$scope.form = {};
	
	$scope.submitForm = function(form) {
		apiHandler.upload($scope.form, $scope.photo, function(data) {
			$scope.slidesLoaded;
			$scope.beards = data.beards;
			$scope.slidesLoaded = true;
			dataFactory.averageVote([data.beard], function(beard) {
				$scope.beard = beard[0];
			}); 
			$scope.clickBeard();
		});
	};

	$scope.delete = function(url, value) {
		apiHandler.destroy(url, value, function(data) {
			if (data.type = "user deleted") {
				$scope.beard = false;
			}
		});		
	}

}]);