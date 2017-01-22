const pick = require('lodash').pick
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const respond = require('../utils/index').respond
const Post = require('../models/post.js')

exports.index = function (req, res) {
	Post.list()
		.then(function(posts){
			respond(res, 'home/index', {
				posts,
				title: 'Home Page',
			})
		})
		.catch(function(err){
			console.log(err)
		})

};
exports.create = function (req, res) {
	const post = new Post(pick(req.body, ['body', 'gender']))
	post.uploadAndSave()
		.then(function(post){
			Post.list()
				.then(function(posts){
					respond(res, 'home/index', {
						posts,
						title: 'Home Page',
				})
			})
		})
		.catch(function(err){
			console.log(err)
		})
	

};