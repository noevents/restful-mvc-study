const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
	id: String,
	username: String,
	first_name: String,
	last_name: String,
	profileText: String,
	//photo
	date: Date,
	hidden: Boolean
}, { collection: 'users' })

module.exports = mongoose.model('User',userSchema);