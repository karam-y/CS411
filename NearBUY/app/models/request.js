// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our users model
// module.exports allows us to pass this to other files when it is called
var RequestSchema = new Schema({
	buyer_id: String, //someone who requests the items
	seller_id: String, //someone who is getting the items
	price: String, //price of the items
	time: String, //time of request
});

module.exports = mongoose.model('Users', RequestSchema);