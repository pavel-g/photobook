import Qwest from 'qwest';
import AuthStore from '../stores/auth.js';
import ActionsConstants from '../constants/actions.js';
import Dispatcher from '../dispatcher/dispatcher.js';
import UserDataStore from '../stores/user-data.js';

export default {
	
	loadData: function() {
		
		var cfg,
		    data;
		
		return new Promise( function(resolve, reject) {
			if ( !AuthStore.auth ) {
				return reject();
			}
			return Qwest.get('/user-data/cfg').then(function(xhr, resp) {
				cfg = resp;
				return Qwest.get('/user-data/data');
			}).then(function(xhr, resp) {
				data = resp;
				if ( cfg.success && data.success ) {
					Dispatcher.dispatch( {
						type: ActionsConstants.USER_DATA_LOAD,
						success: true,
						cfg: cfg.cfg,
						data: data.data
					} );
				}
				return resolve( { cfg: cfg.cfg, data: data.data } );
			}).catch(function(err) {
				return reject(err);
			});
		} );
		
	},
	
	setData: function( path, value ) {
		return new Promise( function(resolve, reject) {
			Dispatcher.dispatch( {
				type: ActionsConstants.USER_DATA_SET,
				path: path,
				value: value
			} );
			return resolve( { path: path, value: value } );
		} );
	},
	
	saveData: function() {
		
		return new Promise( function(resolve, reject) {
			
			var data;
			
			if ( !AuthStore.auth ) {
				return reject( new Error('Need auth') );
			}
			
			data = {
				data: UserDataStore.data
			};
			
			return Qwest.post( '/user-data/data', data, { dataType: 'json' } ).then( ( xhr, resp ) => {
				
				if ( resp && resp.success ) {
					Dispatcher.dispatch( {
						type: ActionsConstants.USER_DATA_SAVE,
						success: true
					} );
					return resolve( Boolean( resp.success ) );
				} else {
					return resolve(false);
				}
				
			} ).catch( (err) => reject(err) );
			
		} );
		
	},
	
	addOptionalPhoto: function( photo, size, count ) {
		return new Promise( function(resolve, reject) {
			Dispatcher.dispatch( {
				type: ActionsConstants.USER_DATA_ADD_OPTIONAL_PHOTO,
				photo: photo,
				size: size,
				count: count
			} )
			return resolve();
		} );
	},
	
	deleteOptinalPhoto: function( photo, size ) {
		return new Promise( function(resolve, reject) {
			Dispatcher.dispatch( {
				type: ActionsConstants.USER_DATA_DELETE_OPTIONAL_PHOTO,
				photo: photo,
				size: size
			} );
			return resolve();
		} )
	}
	
};
