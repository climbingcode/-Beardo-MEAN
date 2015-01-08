app.controller("mainCtrl", function($scope, $cookies, apiHandler, dataFactory) {

	//data
	$scope.beards = [];
	$scope.ratings = [];
	$scope.slidesLoaded = false;
	$scope.inSession = false;
	$scope.hasBeard = false;

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

	$scope.getBeards = function() {
	 apiHandler.index("/beards", function(data){
	 		if (data.user) {
	 			$scope.user = data.user;
	 			$scope.hasBeard = data.beard;
	 			$scope.inSession = true;
	 			console.log($scope.user.beard);       
	 		}
      dataFactory.averageVote(data.data, function(beards) {
        $scope.beards = beards;
        $scope.slidesLoaded = true;  
      });
  	});	
  };

  $scope.getBeards();

});
