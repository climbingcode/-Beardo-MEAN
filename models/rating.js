var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RatingSchema = new Schema({
	created:  {type: Date, default: Date.now},
	vote: String,
	dataCreated: Date
});	

module.exports = mongoose.model('Rating', RatingSchema);