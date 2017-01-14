export default {
	
	createCallback: function(callback) {
		if ( typeof callback === 'function' ) {
			return callback;
		} else {
			return function(err, res) {
				if (err) {
					console.error(err);
				}
			};
		}
	}
	
};
