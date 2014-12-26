var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	email: String,
	password: String,
	dateCreated: { type: Date, default: Date.now },
	beard: {type: Schema.ObjectId, ref: "BeardSchema"}
});

module.exports = mongoose.model('User', UserSchema);