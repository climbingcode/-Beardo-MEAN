var express = require('express')
  , mongoose = require('mongoose')
  , router = express.Router()
  , passport = require("passport")
  , passwordEncryption = require("../config/encryption.js")

var Rating = mongoose.model('Rating');
var Beard = mongoose.model('Beard');
var Comment = mongoose.model('Comment');

router.post('/user', function(req, res) {
	passwordEncryption.cryptPassword(req.body.password, function(err, password) {
		console.log("here");
	 	var user = new User();
	 	user.username = req.body.username;
	 	user.email = req.body.email;
	 	user.password = password;
	 	user.save(function (err, doc) {
	 		if (err) {
	 			res.send(err);
	 		} else {
	 			req.login(user, function(err) {
    			if (err) return res.status(500).send('error');
    			return done(null,user, function() {
    				res.json({
	 						type: "success",
	 						data: user
	 					});
    			}); 
  			});
	 		}
	 	});
	});
});

router.delete("/user", passport.authenticate("local"), function (req, res) {
  console.log("here");
});

module.exports = router;