import React from 'react';
import ReactDOM from 'react-dom';
import Form from './form.jsx';
import b from './bootstrap.js';
import Page from './page.jsx';
import PhotoInPage from './photo-in-page.jsx';
import OptionalPhotos from './optional-photos.jsx';
import OptionalPhoto from './optional-photo.jsx';
import config from './cfg.js';
import qwest from 'qwest';
import debug from './debug.js';
import AppRouter from './app-router.jsx';
import actions from './actions/all.js';
import constants from './constants/all.js';
import dispatcher from './dispatcher/all.js';
import utils from './utils/all.js';
import md5 from 'md5';
import stores from './stores/all.js';
import UserDataPrototype from './UserDataPrototype.jsx';
import lodash from 'lodash';

// TODO: 2016-03-24 Перенести модули с пользовательским интерфейсом в отдельный каталог

window.main = function() {

	var div = document.createElement("div");
	div.id = 'form';
	document.body.appendChild(div);

	ReactDOM.render( <AppRouter/>, div );
	
};

window.main.config = config;

window.main.globals = {
	Form: Form,
	React: React,
	ReactDOM: ReactDOM,
	jQuery: b.jQuery,
	Bootstrap: b.Bootstrap,
	Page: Page,
	PhotoInPage: PhotoInPage,
	OptionalPhotos: OptionalPhotos,
	OptionalPhoto: OptionalPhoto,
	qwest: qwest,
	AppRouter: AppRouter,
	actions: actions,
	constants: constants,
	dispatcher: dispatcher,
	utils: utils,
	md5: md5,
	stores: stores,
	UserDataPrototype: UserDataPrototype,
	lodash: lodash
};

export default window.main;
