// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose       = require('mongoose');

//Setting up the database
// config files
var db = require('./config/db');

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url); 

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

//define the database files
var Users = require('./app/models/users');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
router.route('/users')

	// create a new user
	.post(function(req, res) {

		var user = new Users(); //create new instance of User module
		user.email = req.body.email; //set email of user
		user.password = req.body.password; //set password of the user

		user.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'User created!'})
		});

	})

	// get all users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
        Users.find(function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });


    //get a single user
    router.route('/users/:email')

	// get the user with that id
	.get(function(req, res) {
		Users.findById(req.params.email, function(err, user) {
			if (err)
				res.send(err);
			res.json(user);
		});
	})



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use(express.static(__dirname + "/public"));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
