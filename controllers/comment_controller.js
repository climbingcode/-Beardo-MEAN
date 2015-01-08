var express = require('express')
  , mongoose = require('mongoose')
  , router = express.Router()
  , passport = require("passport");

var Rating = mongoose.model('Rating');
var Beard = mongoose.model('Beard');
var Comment = mongoose.model('Comment');


router.post('/comments', passport.authenticate("local"), function(req, res) {

		var comment = new Comment();
		comment.userId = req.user._id;
		comment.comment = req.body.comment;
		
		Beard.findById(req.body.beard, function(err, beard) {
			beard.comments.push(comment);
			beard.save(function(err, doc) {
				if (err) {
					console.log(comment, "failed");
					res.send(err);
					res.json({status: "failed"});   
				} else {
					console.log(beard, "saved");
					res.json({ 
          	type: "success",
          	saved: comment
        	});
				}
			});
		});
});


module.exports = router;
