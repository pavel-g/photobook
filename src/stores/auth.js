import EventEmitter from 'eventemitter3';
import Dispatcher from '../dispatcher/dispatcher.js';
import ActionsConstants from '../constants/actions.js';

class Auth extends EventEmitter {
	
	constructor() {
		super();
		this.name = null;
		this.auth = false;
		this.registerDispatchToken();
	}
	
	registerDispatchToken() {
		
		var me;
		
		if ( !this.dispatchToken ) {
			
			me = this;
			
			this.dispatchToken = Dispatcher.register( function(payload) {
				if ( payload.type === ActionsConstants.AUTH_LOGIN ) {
					me.auth = true;
					me.name = payload.name;
					me.emitChange();
				} else if ( payload.type === ActionsConstants.AUTH_LOGOUT ) {
					me.auth = false;
					me.name = null;
					me.emitChange();
				}
			} );
			
		}
		
	}
	
	emitChange() {
		this.emit( Auth.CHANGE_EVENT_NAME );
	}
	
	addChangeListener(fn) {
		return this.addListener( Auth.CHANGE_EVENT_NAME, fn );
	}
	
	removeChangeListener(fn) {
		return this.removeListener( Auth.CHANGE_EVENT_NAME, fn );
	}
	
}

Auth.CHANGE_EVENT_NAME = 'change';

var auth = new Auth();

export default auth;
