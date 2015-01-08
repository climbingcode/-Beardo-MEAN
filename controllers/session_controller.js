var express = require('express')
  , mongoose = require('mongoose')
  , bodyParser = require('body-parser')
  , path = require('path')
  , router = express.Router()
  , passwordEncryption = require("../config/encryption.js")
  , passport = require('passport');

var User = mongoose.model("User");
var Beard = mongoose.model("Beard"); 

//signup functions

router.delete("/session", function(req, res) {
	req.session.destroy(function() {
		console.log("session ended");
	});
});

router.post('/session', passport.authenticate("local"), function(req, res) {
	console.log(req.user)
	Beard.findOne({_id: req.user.beard}, function(err, beard) {
		if (err) {
			res.json({
				type: "beard not found",
				data: req.user
			});
		} else {
			res.json({
				type: "found",
				data: req.user,
				beard: beard
			});
		}
	});
});


module.exports = router;