const home = require('./app/controllers/home');

module.exports = function (app) {

	app.get('/', home.index);
	app.post('/', home.create);
	// assume 404 since no middleware responded
	app.use(function (req, res, next) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not found'
		});
	});
};
