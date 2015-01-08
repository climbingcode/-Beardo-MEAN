// require middleware
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var sass = require('node-sass');
var logger = require('morgan');
var debug = require('debug');
var cookieParser = require('cookie-parser');
var expressLayouts = require('express-ejs-layouts');
var mongoose  = require('mongoose');
var multer = require('multer');
var favicon = require('serve-favicon');
var session = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');


//set app
var app = express();

//config environment
var Config = require('./environment.js');
config = new Config();
app.use(logger(config.env));

// config middleware
app.use(express.static(path.join(__dirname, "bower_components")));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));;
app.use(bodyParser.json());
app.use(expressLayouts);
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session({session: true}));

//require models
var Beard = require('./models/beard');
var Rating = require('./models/rating');
var Comment = require('./models/comment');
var User = require('./models/user');

//require config 
var passwordEncryption = require("./config/encryption.js");
var authenication = require("./config/authenication.js");

//require controllers
var users = require('./controllers/user_controller');
var session = require('./controllers/session_controller');
var site = require('./controllers/site_controller');
var beards = require('./controllers/beard_controller');
var rating = require('./controllers/rating_controller');
var message = require('./controllers/comment_controller');

//config views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set('layout', 'layout')

//define db
console.log(config.modulus);
mongoose.connect(config.modulus); 
console.log(mongoose.connection.readyState);

//define routes	
var router = express.Router();
app.get('/', site.index);
app.use(multer({ dest: config.uploads}));
app.use('/api', beards);
app.use('/api', rating);
app.use('/api', message);
app.use('/api', session);
app.use('/api', users);
// app.use('/api', admin);

//define errors
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (config.env === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} 

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// define server
var port = process.env.PORT || 3000; 
app.listen(port, function() {
    console.log("listening on port : " + port);
});
