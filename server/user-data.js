var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var database = require('./db.js');
var bodyParser = require('body-parser');

var getUserData = function(name, callback) {
	var collection = database.db.collection('users');
	return collection.find({name:name}).limit(1).toArray( function(err, data) {
		var user;
		if (err) {
			return callback(err);
		} else {
			user = data[0];
			return callback(null, user);
		}
	} );
};

router.use( auth.checkAuth.bind(auth) );

router.get( '/data', function(req, resp) {
	return getUserData( req.user.name, function(err, data) {
		if (err) {
			return resp.json({success:false,error:err.message});
		}
		return resp.json({success:true,data:data.data});
	} );
} );

// TODO: 2016-03-25 Добавить сохранение данных на сервере

router.post( '/data', bodyParser.json(), function( req, resp ) {
		
	var collection = database.db.collection('users');
	var name = req.user.name;
	
	return collection.updateOne( { name: name }, { $set: { 'data': req.body.data } }, function(err, res) {
		return resp.json( {success: true} );
	} );
	
} );

router.get('/cfg', function(req, resp) {
	return getUserData(req.user.name, function(err, data) {
		if (err) {
			return resp.json({success:false,error:err.message});
		}
		return resp.json({success:true,cfg:data.cfg});
	})
});

module.exports = router;
