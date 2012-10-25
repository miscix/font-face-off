var	fs = require('fs'),
	exec = require('child_process').exec;

var step = require('step'),
	libxmljs = require('libxmljs');

var config	= require('../config/config.js')(),
	db		= require('../config/db.js')(config);

var init = step.fn(
		function start(dir, file){
			var data = {
					filename:	file,
					dirname	:	dir,
					src		:	([config.dirs.static, dir, file]).join('/'),
					fontid	:	file.split('.').shift()
				};
			this.data = data;
			return data;
		},
		function convert(err, data){
			console.log(1);
			var command = ([
					'fontforge -script ' + __dirname + '/../util/fontforge.sh ' + data.src,
					__dirname + '/../util/ttf2eot ' + data.src + ' > ' + ([config.dirs.static, data.dirname, data.fontid]).join('/') + '.eot'
				]).join(' | ');
			exec(command, this);
		},
		function parse(err){
			console.log(3);
			var src = ([config.dirs.static, this.data.dirname, this.data.fontid]).join('/') + '.svg';
			fs.readFile(src, this);
		},
		function details(err, contents){
			var details = {
					filename: this.data.fontid,
					dirname	: this.data.dirname
				};
			var xml = contents.toString(),
				xmlDoc = libxmljs.parseXmlString(xml);
			var fontNode = xmlDoc.get('/svg/defs/font'),
				fontFace = xmlDoc.get('/svg/defs/font/font-face');
			details.fontid	= fontNode.attr('id').value();
			details.family	= fontFace.attr('font-family').value();
			details.style	= fontFace.attr('font-style') ? fontFace.attr('font-style').value() : 'normal';
			details.weight	= fontFace.attr('font-weight').value();
			this.data = details;
			return details;
		},
		function stylesheet(err, details){
			var uri = ([config.host.static, details.dirname, details.filename]).join('/'),
				src = uri.replace(config.host.static, config.dirs.static),
				css = ([
					'@font-face {',
					'	font-family: "' + details.family + '";',
					'	src: url("' + uri + '.eot");',
					'	font-style: ' + details.style + ';',
					'	font-weight: ' + details.weight + ';',
					'	src: url("' + uri + '.eot?#iefix") format("embedded-opentype"),',
					'		url("' + uri + '.woff") format("woff"),',
					'		url("' + uri + '.ttf") format("truetype"),',
					'		url("' + uri + '.svg#' + details.fontid + '") format("svg");',
					'}'
				]).join('\n');
			fs.writeFile(src + '.css', css, this);
		},
		function save(err){
			db.save('fonts', this.data.fontid, this.data);
			return this.data;
		}
	);

exports.fetch = function(done){
	db.getAll('fonts', done);
};

exports.init = function(dir, file, done){
	var done = typeof done === 'function' ? 
			done : function(){ };
	init(dir, file, function(err, data){
		done(err, data);
	});
};

exports.purge = function(){
	db.keys('fonts', { keys: 'stream' }).on('keys', function(a, b){
		if (a[0]){
			console.log(a);
			db.remove('fonts', a[0]);
		}
	}).start()
}