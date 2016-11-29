// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose       = require('mongoose');
var Yelp = require('yelp');
var unirest = require('unirest'); //for square api
var base_url = "https://connect.squareup.com/v2";

var keys = require("../config.json"); //this file stores all api keys


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
var Request = require('./app/models/request');

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

//add the yelp api route
router.route('/search_results/:address/:keywords')

	//get the results of the query
	.get(function(req, res) {
		var yelp = new Yelp({
			  consumer_key: keys.yelp_consumer_key,
			  consumer_secret: keys.yelp_consumer_secret,
			  token: keys.token,
			  token_secret: keys.token_secret
		})

		yelp.search({ term: req.params.keywords, location: req.params.address, limit: 3, sort: 1})
			.then(function (data) {
		  		res.json(data);
		  		console.log("Yelp succeeded");
			})
			.catch(function (err) {
		  		console.error(err);
		  		console.log("Yelp failed");
			}
		);
	})

//find available requests in the database by city and state
router.route('/find_results/:city/:state')
	.get(function(req, res){
		Request.find({ delivery_city: req.params.city, delivery_state: req.params.state}).limit(20).exec( function(err, data) {
			if (err) {
				return err;
			} else {
				res.json(data);
				console.log(data);
			}
		});
	})

//find available requests in the database by zipcode
router.route('/find_results/:zipcode')
	.get(function(req, res){

		console.log(req.params.zipcode);
		Request.find({ delivery_zip: req.params.zipcode}).limit(20).exec( function(err, data) {
			if (err) {
				return err;
			} else {
				res.json(data);
				console.log(data);
			}
		});
	})

//add a request to the database
router.route('/request')
	.post(function(req, res){
		var request = new Request(); //create new instance of User module
		request._id = req.body.id; 
		request.items = req.body.list;
		request.price = req.body.price; 
		request.notes = req.body.notes;
		request.buyer_id = req.body.buyer_id;
		request.delivery_address = req.body.delivery_address;
		request.delivery_city = req.body.delivery_city;
		request.delivery_state = req.body.delivery_state;
		request.delivery_zip = req.body.delivery_zip;

		request.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'Request created!'})
		});
	})

//add the square api route
router.route('/payment')

	//send payment information and save payment
	.post(function(req, res){
		var location;
		var request_params = req.body;
		var accessToken = keys.square_token; //sandbox api

		unirest.get(base_url + '/locations')
		.headers({
			'Authorization': 'Bearer ' + accessToken,
			'Accept': 'application/json'
		})
		.end(function(response) {
			for (var i = response.body.locations.length - 1; i >= 0; i--) {
				if (response.body.locations[i].capabilities.indexOf("CREDIT_CARD_PROCESSING") > -1) {
					location = response.body.locations[i];
					break;
				}
				if (i == 0) {
					return res.json({status: 400, error: [{"detail": "No locations have credit card processing available."}]})
				}
			}

			var token = require('crypto').randomBytes(64).toString('hex');
			//var transaction_id = require('crypto').randomBytes(64).toString('hex');

			// check if price is valid
			if (request_params.price < 0) {
				return res.json({status: 400, error: [{"detail": "Invalid Price Range"}] })
			}
			
			request_body = {
				'idempotency_key': token,
				'card_nonce': request_params.nonce,
				'amount_money' : {
					amount: parseInt(request_params.price),
					currency: "USD"
				},
				reference_id: request_params.transaction_id,
				buyer_email_address: request_params.user_email,
				delay_capture: true //used to delay the transaction
			}

			console.log(request_body);

			unirest.post(base_url + '/locations/' + location.id + '/transactions')
			.headers({
				'Authorization': 'Bearer ' + accessToken,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			})
			.send(request_body)
			.end(function(response){
				if (response.body.errors) {
					console.log('here');
					res.json({status:400, errors: response.body.errors})
				} else {
					res.json({status:200})
				}
			})

		})
		
	})





// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use(express.static(__dirname + "/public"));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
