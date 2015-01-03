var express = require('express')
  , mongoose = require('mongoose')
  , bodyParser = require('body-parser')
  , path = require('path')
  , router = express.Router()
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


var User = mongoose.model("User");

router.route('/signup').post(function(req, res) {
	var user = new User();
	user.username = req.body.username;
	user.email = req.body.email;
	user.password = req.body.password;

	user.save(function(err, user) {
		if(err) {
			res.send(err);
		} else {
			res.json({
				type: "created",
				user: user
			});
		}
	});
});

// signin functions
router.route('/signin').post(function(req, res) {
	username = req.body.username;
	password = req.body.password;

	User.findOne({username: username}, function(err, user) {
		if (err) {
			res.json({
				type: "no result"
			});
		}	else {
			if (user && (password === user.password)) {
				res.json({
					type: "found",
					data: user
				});
			} else {
				res.json({
					type: "password is not correct"
				});
			}
		}
	})
});

router.route('/signin').post(function(req, res) {
	 var user = new User();
	 user.username = req.body.username;
	 user.email = req.body.email;
	 user.password = req.body.password;

	 user.save(function (err, doc) {
	 	if (err) {
	 		res.send(err);
	 	} else {
	 		res.json({
	 			type: "success",
	 			data: user
	 		});
	 	}
	 });
});

module.exports = router;