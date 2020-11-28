const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


var userSchema = new Schema({
	username: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	books: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Book'
	}]
});

userSchema.plugin(uniqueValidator, { message: 'Email already in use.'});
module.exports = mongoose.model('User', userSchema, 'users');
