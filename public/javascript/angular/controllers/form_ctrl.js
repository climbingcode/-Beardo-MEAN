app.controller("formCtrl", function($scope, apiHandler, dataFactory) {
	
	//form
	$scope.beardtypes = [{image: "images/beard-1.png", name: "full beards"}, 
											{image: "images/beard-1.png", name: "partial beard"}, 
											{image: "images/beard-1.png", name: "goatie"}];

	$scope.handleDrop = function() {
		console.log('box dropped');	
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

});