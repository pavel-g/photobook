import jQuery from 'jquery';

window.jQuery = window.jquery = window.$ = jQuery;

var bootstrap = require('bootstrap');

var exp = {
	jQuery: jQuery,
	Bootstrap: bootstrap
};

export default exp;
