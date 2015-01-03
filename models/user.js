var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	email: String,
	password: String,
	dateCreated: { type: Date, default: Date.now },
	beard: {type: Schema.ObjectId, ref: "BeardSchema"}
});

UserSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

module.exports = mongoose.model('User', UserSchema);