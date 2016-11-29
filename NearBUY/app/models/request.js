// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

// define our users model
// module.exports allows us to pass this to other files when it is called
var RequestSchema = new Schema({
	_id: String,
	open: { type: Boolean, default: true},
	items: [],
	price: String,
	notes: String,
	buyer_id: String,
	seller_id: String,
	delivery_address: String,
	delivery_city: String,
	delivery_state: String,
	delivery_zip: String,
	business_id: String
});

module.exports = mongoose.model('Requests', RequestSchema, 'requests');
