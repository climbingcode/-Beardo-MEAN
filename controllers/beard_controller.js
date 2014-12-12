var express = require('express')
  , mongoose = require('mongoose')
  , bodyParser = require('body-parser')
  , path = require('path')
  , router = express.Router()
  , multer = require('multer');

var Rating = mongoose.model('Rating');
var Beard = mongoose.model('Beard');

router.route('/beards')
  .get(function(req, res) {
  Beard.find().populate('rating').exec(function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});
  
router.route('/beards').post([ multer({ dest: './uploads/'}), function(req, res) {
    var beard = new Beard();
    beard.beardname = req.body.beardname;
    beard.beardtype = req.body.beardtype;
    photo = req.files.file.path
    fileName = photo.split('/').splice(-1).pop();
    file = "uploads/" + fileName;
    console.log(file);
    beard.picture = file;

    beard.save(function (err, doc) {
      if (err) {
        console.log(beard, "failed");
        res.send(err);
        res.json({ 
          type: "failed",
          saved: beard 
        });
      } else {
        console.log(beard, "saved");
        res.json({ 
          type: "success",
          beard: beard
        });
      }
    });
}]);

module.exports = router;
