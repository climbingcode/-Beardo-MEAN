var session = require('express-session'); 
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    mongoose = require("mongoose");
    User = mongoose.model("User");
    
 
// The strategy used when authenticating a user
passport.use(new LocalStrategy.Strategy(function(username, password, done) {
  User.findOne({username: username}, function(err, user) {
    if(err) {
      done(null, null);
      console.log("system error");
    }
    if (!user) {
      done(null, null);
      console.log("user was not found!");
    }
    if (user) {
      passwordEncyption.comparePassword(password, user.password, function(err, isPasswordMatch) {
        if (isPasswordMatch) {
          done(null, user);
        } else {
          done(null, null);
          console.log("password does not match");
        }
      })
    }
  });
}));

// Creates the data necessary to store in the session cookie
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
// Reads the session cookie to determine the user from a user ID
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

