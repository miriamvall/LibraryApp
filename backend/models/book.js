const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


var bookSchema = new Schema({
	title: {type: String, required: true},
	author: {type: String, required: true},
	description: {type: String, required: true}
});

module.exports = mongoose.model('Book', bookSchema, 'books');