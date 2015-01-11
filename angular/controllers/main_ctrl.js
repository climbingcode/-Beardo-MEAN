app.controller("mainCtrl", ["$scope", "$cookies", "apiHandler", "dataFactory", function($scope, $cookies, apiHandler, dataFactory) {

	//data
	$scope.beards = [];
	$scope.ratings = [];
	$scope.slidesLoaded = false;
	$scope.inSession = false;
	$scope.beard = false;

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

	$scope.deleteBeard = function () {
		$scope.beard = false;
		console.log("beard +", $scope.beard)
	}

	$scope.getBeards = function() {
	 apiHandler.index("/beards", function(data){
	 		if (data.user) {
	 			$scope.user = data.user;
	 			if (data.beard) {
	 				dataFactory.averageVote([data.beard], function(beard) {
	 					$scope.beard = beard[0];
	 				});
	 			}
	 			$scope.inSession = true;  
	 		}
	 		if (data.data.length > 0) {
      	dataFactory.averageVote(data.data, function(beards) {
      		console.log("beards here", beards)
      		$scope.topBeards = dataFactory.getTopBeards(data.data);
        	$scope.beards = beards;
        	$scope.slidesLoaded = true;  
      	});
    	}
  	});
  };
  $scope.getBeards();
}]);
