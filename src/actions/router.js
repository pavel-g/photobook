import Dispatcher from '../dispatcher/dispatcher.js';
import ActionsConstants from '../constants/actions.js';

export default {
	
	setPage: function(pageName) {
		
		var me = this;
		
		return new Promise( function(resolve, reject) {
			
			Dispatcher.dispatch( {
				type: ActionsConstants.SELECT_PAGE,
				pageName: pageName
			} );
			
			return resolve(pageName);
			
		} );
		
	}
	
};
