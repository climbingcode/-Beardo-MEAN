app.service('apiHandler', ["$http", "$upload", function($http, $upload) {
	return {
		index: function(route, callback) {
			return $http.get("api/" + route).
			success(function(data, status) {
				console.log("success : ", status, data);
				callback(data);
			}).
			error(function(status) {
				console.log("failed : ", status)
			});
		},

		upload: function(data, file, callback) {
			$upload.upload({
				url: 'api/beards', 
        method: 'POST',
        headers: {'enctype': 'multipart/form-data'},
        data: data,
        file: file,
			}).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        console.log("uploaded");
        callback(data);
      }).error(function(status) {
      	console.log("error uploading");
      	callback("error uploading");
      });
		},

		create: function(route, data, callback) {
			$http.post(
				'api/' + route,
				JSON.stringify(data)	
			).success(function(data){
				console.log('submitted to api:', data);
				callback(data);
			}).error(function() {
				console.log('api did not except');
				callback(null)
			});	
		},

		show: function(route, data, callback) {
			$http.post(
				"api/" + route,
				JSON.stringify(data)

			).success(function(data, status) {
				console.log("success : ", data, status)
				callback(data);
			}).
			error(function(status) {
				console.log("failed : ", status)
				callback(null)
			});
		},

		update: function(route, data, callback) {
			$http.post(
				"api/" + route,
				JSON.stringify(data)
			).success(function(data, status) {
				console.log("success : ", data, status)
				callback(data);
			}).
			error(function(status) {
				console.log("failed : ", status)
				callback("not found")
			});
		},

		destroy: function(route, data, callback) {
			console.log(route);
			$http.delete(
				"api/" + route,
				data
		).success(function(data, status) {
				console.log("success : ", data, status)
				callback(data);
			}).
			error(function(status) {
				console.log("failed : ", status)
				callback("not found")
			});
		}
	}
}]);	




