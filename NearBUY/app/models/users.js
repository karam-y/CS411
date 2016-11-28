// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

// define our users model
// module.exports allows us to pass this to other files when it is called
var UsersSchema = new Schema({
	email: String,
	password: String
});

module.exports = mongoose.model('Users', UsersSchema);
