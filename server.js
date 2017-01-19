const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const _ = require('lodash')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const winston = require('winston')

var config = require('./config')
var initRoutes = require('./routes')

const app = express()

module.exports = start

function start() {
	initExpress()
	initRoutes(app)
	initErrorHandling(app);

	connect()
		.on('error', console.log)
		.on('disconnected', connect)
		.once('open', listen)
}

function listen () {
	app.listen(config.port, function () {
		console.log('Server is listening on port '+config.port)
	})
}

function connect () {
	var options = { server: { socketOptions: { keepAlive: 1 } } };
	var connection = mongoose.connect(config.db, options).connection;
	return connection;
}

function initExpress() {
	app.use(morgan('dev')) //log requests
	//app.use(compression());
	app.use(bodyParser.json()); // get information from html forms
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(express.static(config.root + '/public'))
	app.set('views', config.root + '/app/views');
	app.set('view engine', 'pug')
	app.use(cookieParser())
	app.use(cookieSession({ secret: config.sessionSecret }))

	//app.use(cors());
}

function initErrorHandling(app) {
	//log unhandled errors
	app.use(function (err, req, res, next) {
		console.log(err);
		let message = _.isError(err) ? err.message : err;
		res.status(500).send({error: message});
	});

	process.on('uncaughtException', function (err) {
		console.log(err);
	});
}
