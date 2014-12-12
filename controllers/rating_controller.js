var express = require('express')
  , mongoose = require('mongoose')
  , bodyParser = require('body-parser')
  , path = require('path')
  , router = express.Router();

var Beard = mongoose.model('Beard');
var Rating = mongoose.model('Rating');

router.route('/ratings').post(function(req, res) {

	var rating = new Rating();
  rating.vote = req.body.vote;
	rating.beard = req.body.beard;
  
  Beard.findById(req.body.beard, function(err, beard) {
    beard.ratings.push(rating);
    beard.save(function(err, doc){
      if(err) {
        console.log(rating, "failed");
        res.send(err);
        res.json({status: "failed"});    
      } else {
        console.log(rating, "saved");
        res.json({ 
          type: "vote",
          saved: rating 
        });
      }
    });
  });
});

module.exports = router;

