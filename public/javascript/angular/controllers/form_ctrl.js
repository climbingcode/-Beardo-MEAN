app.controller("formCtrl", function($scope, apiHandler, dataFactory) {
	
	//form
	$scope.beardtypes = [{image: "images/beard-1.png", name: "full beards"}, 
											{image: "images/beard-1.png", name: "partial beard"}, 
											{image: "images/beard-1.png", name: "goatie"}];

	$scope.onDrop = function($event, $data) {
		console.log($event, $data);	
	}

	$scope.form = {};
	
	$scope.submitForm = function(form) {
		apiHandler.upload($scope.form, $scope.photo);
		$scope.slidesLoaded;
		$scope.getData("/beards", function(data) {	
			$scope.getData(data.data);
			$scope.beards = data.data;
			$scope.slidesLoaded = true;
			$scope.clickBeard();
		});	
	};

	$scope.delete = function(url, value) {
		apiHandler.destroy(url, value, function(data) {
			if (data.value = "user deleted") {
				$scope.inSession = false;
				console.log("deleted user", data.user);
			} else if (data.value = "beard deleted") {
				$scope.userBeard = false;
				console.log("deleted beard", data.beard);
			}
		});		
	}

});