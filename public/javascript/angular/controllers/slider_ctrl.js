app.controller("sliderCtrl", function($scope, apiHandler, dataFactory) {

	//call function to get beards
	$scope.getData("beards", function(data){
    dataFactory.averageVote(data, function(data) {
      $scope.beards = data;
      $scope.slidesLoaded = true;  
    });
	});	

	//slider 
	$scope.currentIndex = 0;

  $scope.setCurrentSlideIndex = function (index) {
    $scope.currentIndex = index;
  };
	
	$scope.isCurrentSlideIndex = function (index) {
		if ($scope.beards.length > 1) {
    	return $scope.currentIndex === index;
    } 
  };

  $scope.prevSlide = function () {
   	$scope.currentIndex = ($scope.currentIndex < $scope.beards.length - 1) ? ++$scope.currentIndex : 0;
  };

  $scope.nextSlide = function () {
    $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.beards.length - 1;  
  };

  $scope.downVote = function () {
    data = { beard: $scope.beards[$scope.currentIndex]._id, vote: "down" };
    apiHandler.create("ratings", data, function(obj) {
      ratings = $scope.beards[$scope.currentIndex].ratings;
    });
    $scope.prevSlide();
  }

  $scope.upVote = function() {
    data = { beard: $scope.beards[$scope.currentIndex]._id, vote: "up" };
    apiHandler.create("ratings", data, function(obj) {
      ratings = $scope.beards[$scope.currentIndex].ratings;
    });
    $scope.prevSlide();
  }

  $scope.submitComment = function() {
    $scope.comment.beard = $scope.beards[$scope.currentIndex]._id
    apiHandler.create("comments", $scope.comment, function(obj){
      console.log(obj);
      $scope.comment = {};
      $scope.comment_form.$setPristine();
      obj.created = "Just Now";
      $scope.beards[$scope.currentIndex].comments.push(obj);  
    });
  }
});