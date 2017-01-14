import qwest from 'qwest';
import md5 from 'md5';

var createCallback = function() {
	return function(xhr, resp) {
		console.log( 'resp:', resp );
	}
};
window.post = function( path, data, callback ) {
	if ( typeof callback !== 'function' ) {
		callback = createCallback();
	}
	return qwest.post( path, data ).then(callback);
};
window.get = function( path, data, callback ) {
	if ( typeof callback !== 'function' ) {
		callback = createCallback();
	}
	return qwest.get( path, data ).then(callback);
};
window.login = function() {
	post('/login', {name:'Ivanov',pass:md5('123456')});
};
window.logout = function() {
	post('/logout', null);
};
