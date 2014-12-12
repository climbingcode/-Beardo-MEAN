app.controller("formCtrl", function($scope, apiHandler, dataFactory) {
	
	//form
	$scope.beardtypes = [{image: "images/beard-1.png", name: "full beards"}, 
											{image: "", name: "partial beard"}, 
											{image: "", name: "goatie"}];

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