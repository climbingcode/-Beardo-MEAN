app.factory('dataFactory', function() {

	var factory = {};

	factory.getCorrectPath = function(data) {
		angular.forEach(data.data, function(value, index){
			if (value.picture) {
				file_name = value.picture.split('/').splice(-1).pop();
				value.picture = "uploads/" + file_name;
			}	
		});
		return data;
	}

	factory.getIndexs = function(data) {
		angular.forEach(data, function(value, index) {
			value.index = index;
		});
		return data;
	}

  factory.averageVote = function(beards, callback) {
  	for (var b = 0; b < beards.length; b++) {
  		beard = beards[b];
  		ratings = beard.ratings;
  		totalRatings = [];
  		totalUpVotes = [];
  		for (var r = 0; r < ratings.length; r++) {
  			rating = ratings[r];
  			totalRatings.push(totalRatings);
  			if (rating.vote === "up") {
  				totalUpVotes.push(totalUpVotes);
  			}
  		}
  		average = (100 / totalRatings.length) * totalUpVotes.length;
  		beard.average = Math.round(average);
  	}
  	callback(beards);
  };
	return factory;
});
 