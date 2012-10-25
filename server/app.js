/**
 * Module dependencies.
 */

var express = require('express');

var app = express();

// var user = require('./models/user');

var config	= require('./config/config.js')(),
	server	= require('./config/environment.js')(app, express, config),
	db		= require('./config/db.js')(config),
	routes	= require('./config/routes')(app, db, config);
	
	// auth	= require('./config/auth.js')(passport, config),
	// io		= require('./config/io')(server, sessionStore, config),
	// sockets	= require('./config/sockets')(io, config);

app.configure('development', function(){
	app.use(express.errorHandler());
});