var express = require('express')
  , mongoose = require('mongoose')
  , bodyParser = require('body-parser')
  , path = require('path')
  , router = express.Router()
  , passwordEncryption = require("../config/encryption.js")
  , passport = require('passport');

var Rating = mongoose.model('Rating');
var Beard = mongoose.model('Beard');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

router.post('/user', function(req, res) {
	passwordEncryption.cryptPassword(req.body.password, function(err, password) {
	 	var user = new User();
	 	user.username = req.body.username;
	 	user.email = req.body.email;
	 	user.password = password;
	 	user.save(function (err, doc) {
	 		if (err) {
	 			res.send(err);
	 		} else {
	 			req.login(user, function(err, user) {
    			if (err) {
    				res.status(500).send('error');
    			} else {
    				res.json({
	 						type: "success",
	 						data: req.user
	 					});
    			}   			
  			});
	 		}
	 	});
	});
});

router.delete("/user", function (req, res) {
  console.log("here");
});

module.exports = router;