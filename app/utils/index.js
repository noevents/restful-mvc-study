
exports.respond = function(res, view, obj, status) {
	res.format({
		html: () => res.render(view, obj),
		json: () => {
			if (status) return res.status(status).json(obj);
			res.json(obj);
		}
	});
}