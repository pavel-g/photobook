import Qwest from 'qwest';
import ActionsConsts from '../constants/actions.js';
import Utils from '../utils/utils.js';
import Dispatcher from '../dispatcher/dispatcher.js';
import md5 from 'md5';
import UserData from './user-data.js';

export default {
	
	login: function( name, pass ) {
		
		return new Promise( function(resolve, reject) {
			
			return Qwest.post( '/login', { name: name, pass: md5(pass) } )
				.then( function(xhr, resp) {
					if (resp.success) {
						Dispatcher.dispatch( {
							type: ActionsConsts.AUTH_LOGIN,
							success: resp.success,
							name: resp.name
						} );
					}
					return resp;
				} )
				.then( () => UserData.loadData() )
				.catch( function( err, xhr, resp ) {
					return callback(err, null);
				} );
				
		} );
		
	},
	
	logout: function(callback) {
		
		callback = Utils.createCallback(callback);
		
		return Qwest.post('/logout', null).then( function(xhr, resp) {
			if (resp.success) {
				Dispatcher.dispatch({
					type: ActionsConsts.AUTH_LOGOUT,
					success: true
				})
			}
			return callback( null, resp );
		} ).catch( function(err, xhr, resp) {
			return callback(err, null);
		} );
		
	}
	
}
