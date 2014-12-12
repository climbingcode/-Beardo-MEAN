app.controller("mainCtrl", function($scope, apiHandler, dataFactory) {

	//data
	$scope.beards = [];
	$scope.ratings = [];
	$scope.slidesLoaded = false;

	//states
	$scope.showBeards = true; 
	$scope.showForm = false;

	$scope.clickBeard = function() {
		$scope.showBeards = true;
		$scope.showForm = false; 
	} 
	$scope.clickForm = function() {
		$scope.showForm = true;
		$scope.showBeards = false;
	}

	//reloads data when new beard is added
	$scope.dataChanged = false;

	$scope.getData = function(route, callback) {
		apiHandler.index(route).then(function(data){
			newData = dataFactory.getIndexs(data.data);
			console.log(newData);
			callback(newData);
    });
	}

});
