app.controller("sliderCtrl", ["$scope", "apiHandler", "dataFactory", function($scope, apiHandler, dataFactory) {

	//slider 
	$scope.currentIndex = 0;
  $scope.sum = 0;

  $scope.getSum = function () {
    $scope.sum += 1
  }

  $scope.setCurrentSlideIndex = function (index) {
    $scope.currentIndex = index;
  };
	
	$scope.isCurrentSlideIndex = function (index) {
		if ($scope.beards.length > 0) {
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
    $scope.reloadSlides();
  }

  $scope.upVote = function() {
    data = { beard: $scope.beards[$scope.currentIndex]._id, vote: "up" };
    apiHandler.create("ratings", data, function(obj) {
      ratings = $scope.beards[$scope.currentIndex].ratings;
    });
    $scope.prevSlide();
    $scope.reloadSlides();
  }

  $scope.submitComment = function() {
    $scope.comment.beard = $scope.beards[$scope.currentIndex]._id
    console.log($scope.comment);
    apiHandler.create("comments", $scope.comment, function(obj){
      obj = $scope.comment;
      $scope.comment = {};
      $scope.comment_form.$setPristine();
      obj.created = "Just Now";
      $scope.beards[$scope.currentIndex].comments.push(obj);  
    });
  }
}]);