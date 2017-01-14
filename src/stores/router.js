import EventEmitter from 'eventemitter3';
import ActionsConstants from '../constants/actions.js';
import Dispatcher from '../dispatcher/dispatcher.js';

class Router extends EventEmitter {
	
	constructor() {
		super();
		this.page = 'start';
		this.registerDispatchToken();
	}
	
	registerDispatchToken() {
		
		var me;
		
		if ( !this.dispatchToken ) {
			
			me = this;
			
			this.dispatchToken = Dispatcher.register( function(payload) {
				if ( payload.type === ActionsConstants.SELECT_PAGE ) {
					me.page = payload.pageName;
					me.emitChange();
				}
			} );
			
		}
		
	}

	emitChange() {
		this.emit(Router.CHANGE_EVENT_NAME);
	}
	
	addChangeListener(fn) {
		return this.addListener( Router.CHANGE_EVENT_NAME, fn );
	}
	
	removeChangeListener(fn) {
		return this.removeListener( Router.CHANGE_EVENT_NAME, fn );
	}
	
}

Router.CHANGE_EVENT_NAME = 'change';

var router = new Router();

export default router;
