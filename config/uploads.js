var fs = require("fs");

uploads = {

	uploadLocationFile: function(req) {
		var photo = req.files.file.path;
  	var fileName = photo.split('/').splice(-1).pop();
  	var file = config.uploads + fileName;
  	return file;
	},

	deleteUpload: function(upload, callback) {
		var filePath = upload;
		fs.unlinkSync(filePath);
		console.log("deleted", filePath);
		callback();
	}

}

module.exports = uploads;
