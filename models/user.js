var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
	username: String,
	email: String,
	password: String,
	dateCreated: { type: Date, default: Date.now },
	beard: {type: Schema.ObjectId, ref: "BeardSchema"},
	beard: []
});

module.exports = mongoose.model('User', UserSchema);