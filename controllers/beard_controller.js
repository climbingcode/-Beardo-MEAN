var express = require('express')
  , mongoose = require('mongoose')
  , bodyParser = require('body-parser')
  , path = require('path')
  , router = express.Router()
  , multer = require('multer')
  , passport = require('passport');

var Rating = mongoose.model('Rating');
var Beard = mongoose.model('Beard');
var User = mongoose.model('User');

var options = { skip: 0, limit: 10, count: 5 };

router.get('/beards', function(req, res) {
  Beard.find().exec(function(err, data) {
    console.log(req.user);
    if (err) {
      res.send(err);
    } else if (req.user) {
      Beard.findOne({_id: req.user.beard}, function(err, beard) {
        if (err) {
          res.json({
            type: "found",
            data: data,
            user: req.user
          });
        } else {
          res.json({
            type: "found",
            data: data,
            user: req.user,
            beard: beard
          });
        }  
      });  
    } else {
      res.json({
        type: "found",
        data: data,
        user: req.user
      });
    }
  });
});
  
router.route('/beards').post([multer({ dest: config.uploads}), function(req, res) {
  var beard = new Beard();
  beard.beardname = req.body.beardname;
  beard.beardtype = req.body.beardtype;
  var photo = req.files.file.path;
  var fileName = photo.split('/').splice(-1).pop();
  var file = "uploads/" + fileName;
  beard.picture = file;

  User.findOne({_id: req.user._id}, function(err, user) {
    if (err) {
      res.json({
        type: "No Session"
      })
    } else {
      beard.save(function (err, doc) {
        if (err) {
          console.log(beard, "failed");
          res.send(err);
        } else if (user) {
          user.beard = beard;
          console.log(user)
          user.save(function (err, doc) {
            if (err) {
              res.json({
                type: "error"
              })
            } else  {
              console.log(beard, "saved");
              res.json({ 
                type: "success",
                beard: beard
              });
            }
          }); 
        } else {
          console.log("user not found");
        }
      });
    }
  });
}]);

router.delete("/beards", passport.authenticate("local"), function (req, res) {
  Beard.findOne({_id: req.user.beard}, function(err, beard) {
    if (err) {
      res.json({ data: err })
    } else if (beard) {
      console.log(beard);
    } else {
      res.json({ type: "user not found" })
    } 
  });
});

module.exports = router;
