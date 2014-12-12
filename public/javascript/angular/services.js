app.service('apiHandler', function($http, $upload) {
	return {
		index: function(route) 
		{
			return $http.get("api/" + route).
			success(function(data, status) {
				console.log("success : ", status)
			}).
			error(function(status) {
				console.log("failed : ", status)
			});
		},



		upload: function(data, file) {
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
      }).error(function(status) {
      	console.log("error uploading");
      });
		},

		create: function(route, data, callback) {
			obj = data;
			$http.post(
				'api/' + route,
				JSON.stringify(data)	
			).success(function(data){
				console.log('submitted to api:', data);
			}).error(function() {
				console.log('api did not except');
			});
			callback(obj);
			}
		}
});	




