var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bcrypt = require('bcrypt');

var BeardSchema = new Schema({
	beardname: String,
	beardtype: String,
	picture: String,
	dateCreated: Date,
  ratings: [ ],
  comments: [ ]
});

BeardSchema.methods.topBeards = function(amount) {
  console.log("here");
}

BeardSchema.methods.restrictComments = function(amount, callback)  {
  this.comments(function(err, comments) {
    if (err) {
      return callback(err);
    } else {
      console.log(comments, "working");
    }
  });
}

BeardSchema.statics.random = function(callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

module.exports = mongoose.model('Beard', BeardSchema);