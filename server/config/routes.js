var fs = require('fs');

var font = require('../models/font.js');

module.exports = function(app, db, config){

	app.get('/api/fonts', function(req, res){
		font.fetch(function(err, fonts){
			res.json(fonts);
		});
	});

	app.get('/api/purge', function(){
		font.purge();
	});

	app.post('/api/upload/*', function(req, res){
		var path	= config.dirs.static,
			params	= req.query;
		var name = params.qqfile;
		var dir	= Date.now();
		fs.mkdirSync(path + dir);
		var	ws = fs.createWriteStream(path + dir + '/' + name);
		req.on('data', function(data){
			ws.write(data);
		});
		req.on('end', function(){
			font.init(dir, name, function(err, details){
				res.json(details);
			});
		});
	});
};