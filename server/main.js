var express = require('express');
var app = express();
var database = require('./db.js');
var demoData = require('./demo-data.js');
var auth = require('./auth.js');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var userData = require('./user-data.js');

// TODO: 2016-03-18 Изменить рабочий католог на какой-нибудь отдельный, ибо не безопасно
app.use(express.static(__dirname + '/..'));
app.use( session( { secret: 'd4n98rd428s7', saveUninitialized: true, resave: true } ) );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get( '/', function(req, res) {
	res.sendFile('index.html');
} );

demoData.initApp(app);
auth.initApp(app);
app.use('/user-data',userData);

database.connect( function(err) {
	if (err) {
		throw err;
	}
	app.listen( 3000, function() {
		console.log('Example app listening on port 3000!');
	} );
} );

module.exports = {
	App: app,
	Database: database
};
