var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var database = require('./db.js');

// TODO: 2016-03-21 Проверить работу авторизации

var auth = {
	
	check: function( name, pass, done ) {
		var collection = database.db.collection('users');
		return collection.find( { name: name } ).limit(1).toArray( function( err, users ) {
			if (err) {
				return done(err, null);
			}
			if ( users.length === 0 ) {
				return done( null, false, { message: 'Неверное имя пользователя' } );
			}
			var user = users[0];
			if ( user.pass === pass ) {
				return done( null, {name:user.name,admin:user.admin} );
			} else {
				return done( null, false, { message: 'Неверный пароль' } );
			}
		} );
	},
	
	authReqired: 'Требуется авторизация',
	
	checkAuth: function( req, resp, next ) {
		if ( req.isAuthenticated() ) {
			return next();
		} else {
			return resp.json({success:false,msg:this.authReqired});
		}
	},
	
	initApp: function(app) {
		
		app.use( passport.initialize() );
		app.use( passport.session() );
		passport.use( new LocalStrategy( {usernameField: 'name', passwordField: 'pass'}, this.check.bind(this) ) );
		passport.serializeUser( function(user, done) {
			// TODO: 2016-03-23 code for serializeUser
			var u = JSON.stringify(user);
			console.log('serializeUser', u); /* DEBUG */
			return done( null, JSON.stringify(user) );
		} );
		passport.deserializeUser( function(json, done) {
			// TODO: 2016-03-23 code for deserializeUser
			console.log('deserializeUser'); /* DEBUG */
			return done( null, JSON.parse(json) );
		} );
		
		app.post( '/login', passport.authenticate('local'), function(req, resp) {
			req.session.save( function(err) {
				if (err) {
					return resp.json({success:false,error:err.message});
				}
				return resp.json({success:true,name:req.user.name});
			} );
		} );
		
		app.get( '/login', this.checkAuth.bind(this), function(req, resp) {
			resp.json({success:true,name:req.user.name});
		} );
		
		app.post( '/logout', function(req, resp) {
			req.logout();
			req.session.save( function(err) {
				if (err) {
					return resp.json({success:false});
				}
				return resp.json({success:true});
			} );
		} );
		
	}
	
};

module.exports = auth;
