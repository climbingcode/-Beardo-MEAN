var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	 created:  {type: Date, default: Date.now},	
	 comment: String 
});

module.exports = mongoose.model("Comment", CommentSchema);