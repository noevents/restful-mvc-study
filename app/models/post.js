const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

var postSchema = new mongoose.Schema({
	body: { type : String, default : '', trim : true },
	gender: { type : String, default : ''},
	// image: {
	// 	cdnUri: String,
	// 	files: []
	// },
	createdAt  : { type : Date, default : Date.now }
})
postSchema.methods = {
	uploadAndSave: function (image) {
		const err = this.validateSync();
		if (err && err.toString()) throw new Error(err.toString());
		return this.save()
	},
}
postSchema.statics = {
	list: function(options){
		return this.find().exec()
	}
}

module.exports = mongoose.model('Post', postSchema);