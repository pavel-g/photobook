import EventEmitter from 'eventemitter3';
import Dispatcher from '../dispatcher/dispatcher.js';
import ActionsConstants from '../constants/actions.js';
import lodash from 'lodash';

class UserData extends EventEmitter {
	
	constructor() {
		super();
		this.cfg = null;
		this.data = null;
		this.registerDispatchToken();
	}
	
	registerDispatchToken() {
		
		var me;
		
		if ( !this.dispatchToken ) {
			
			me = this;
			
			this.dispatchToken = Dispatcher.register( function(payload) {
				if ( payload.type === ActionsConstants.USER_DATA_LOAD ) {
					me.cfg = payload.cfg;
					me.data = payload.data;
					me.emitChange();
				} else if ( payload.type === ActionsConstants.USER_DATA_SET ) {
					me.setData( payload.path, payload.value );
				} else if ( payload.type === ActionsConstants.USER_DATA_ADD_OPTIONAL_PHOTO ) {
					me.addOptionalPhoto( payload.photo, payload.size, payload.count );
				} else if ( payload.type === ActionsConstants.USER_DATA_DELETE_OPTIONAL_PHOTO ) {
					me.deleteOptinalPhoto( payload.photo, payload.size );
				}
			} );
			
		}
		
	}
	
	setData( path, value ) {
		var origValue = lodash.get( this.data, path );
		var isEqual = lodash.isEqual( origValue, value )
		if ( !this.data ) {
			this.data = {};
		}
		lodash.set( this.data, path, value );
		if ( !isEqual ) {
			this.emitChange();
		}
	}
	
	emitChange() {
		this.emit(UserData.CHANGE_EVENT_NAME);
	}
	
	addChangeListener(fn) {
		return this.addListener( UserData.CHANGE_EVENT_NAME, fn );
	}
	
	removeChangeListener(fn) {
		return this.removeListener( UserData.CHANGE_EVENT_NAME, fn );
	}
	
	getCfgAndData() {
		return {
			cfg: this.cfg,
			data: this.data
		};
	}
	
	getPageCfg(index) {
		return lodash.get(this, 'cfg.pages[' + index + ']', {layout: '4+4', photos: []});
	}
	
	getPagePhotos(pageIndex) {
		return this.getPageCfg(pageIndex).photos;
	}
	
	getSelectedPhotoIndex( pageIndex, photoIndex ) {
		return lodash.get( this, 'data.pages[' + pageIndex + '][' + photoIndex + ']' );
	}
	
	getSelectedPhoto( pageIndex, photoIndex ) {
		var photos = this.getPagePhotos(pageIndex); // String[]
		var i = this.getSelectedPhotoIndex( pageIndex, photoIndex );
		if ( photos[i] ) {
			return photos[i];
		} else {
			return null;
		}
	}
	
	getAllOptionalPhotosStore() {
		var photos = lodash.get( this, 'cfg.additionalPhotos' );
		var res = [];
		if (!photos) {
			return res;
		}
		var i, url;
		for ( i = 0; i < photos.length; i++ ) {
			url = photos[i];
			res.push( { id: i, photoUrl: url } );
		}
		return res;
	}
	
	getAllOptionalPhotos() {
		return lodash.get( this, 'cfg.additionalPhotos' );
	}
	
	getAvailableSizes() {
		// return ['15x10', '30x20'];
		return [ '10x15', '15x22', '20x30' ];
	}
	
	getSelectedOptionalPhotos() {
		
		var allOptionalPhotos = this.getAllOptionalPhotos(),
		    selectedOptionalPhotos = this.getDataAdditionalPhotos(),
		    res = [],
		    i,
		    item,
		    url,
		    sizes = this.getAvailableSizes();
			
		if ( !(selectedOptionalPhotos.length > 0) ) {
			return res;
		}
		
		for ( i = 0; i < selectedOptionalPhotos.length; i++ ) {
			
			item = selectedOptionalPhotos[i];
			
			if ( !allOptionalPhotos.hasOwnProperty(item.index) ) {
				console.warn('Выбранная фотография не существует');
				continue;
			}
			
			url = allOptionalPhotos[item.index];
			
			if ( sizes.indexOf( item.size ) < 0 ) {
				console.warn('Неверный размер фотографии');
				continue;
			}
			
			if ( typeof item.count !== 'number' || item.count <= 0 ) {
				console.warn('Неверное число фотографий');
				continue;
			}
			
			res.push( {
				index: item.index,
				size: item.size,
				count: item.count,
				url: url
			} );
		}
		
		return res;
		
	}
	
	checkDataAdditionalPhotos() {
		var ap = lodash.get( this, 'data.additionalPhotos', [] );
		var i;
		var sizes = this.getAvailableSizes();
		var checkItem = function(item) {
			return Boolean(
				lodash.isObject(item) &&
				lodash.isNumber( item.index ) &&
				lodash.isString( item.size ) &&
				sizes.indexOf( item.size ) >= 0 &&
				lodash.isNumber( item.count ) &&
				item.count > 0
			);
		};
		for ( i = 0; i < ap.length; i++ ) {
			if ( !checkItem(ap[i]) ) {
				console.error('Некорректная запись о дополнительной фотографии:', ap[i]);
			}
		}
	}
	
	getDataAdditionalPhotos() {
		var a = lodash.get(this, 'data.additionalPhotos');
		if (!a) {
			lodash.set( this, 'data.additionalPhotos', [] );
		}
		this.checkDataAdditionalPhotos();
		return this.data.additionalPhotos;
	}
	
	photoToUrl(photo) {
		var index = this.photoToIndex(photo);
		var all = lodash.get( this, 'cfg.additionalPhotos', [] );
		if ( all.hasOwnProperty(index) ) {
			return all[index];
		} else {
			return null;
		}
	}
	
	photoToIndex(photo) {
		var all = lodash.get( this, 'cfg.additionalPhotos', [] );
		var index;
		if ( typeof photo === 'number' ) {
			if ( all.hasOwnProperty(photo) ) {
				return photo;
			} else {
				return null;
			}
		} else if ( typeof photo === 'string' ) {
			index = all.indexOf(photo);
			if ( index >= 0  ) {
				return index;
			} else {
				return null;
			}
		}
		return null;
	}
	
	getSelectedByPhotoAndSize( photo, size ) {
		var ap = this.getDataAdditionalPhotos();
		var filtered;
		photo = this.photoToIndex(photo);
		if ( photo === null ) {
			return null;
		}
		filtered = lodash.filter( ap, { index: photo, size: size } );
		if ( filtered.length >= 1 ) {
			if ( filtered.length > 1 ) {
				console.error('Обнаружено несколько копий ' + this.photoToUrl(photo) + ' размером ' + size);
			}
			return filtered[0];
		} else {
			return null;
		}
	}
	
	addOptionalPhoto( photo, size, count ) {
		var allOptionalPhotos;
		var selected;
		var index;
		if ( !this.data ) {
			this.data = {};
		}
		allOptionalPhotos = this.getAllOptionalPhotos();
		index = this.photoToIndex(photo);
		if ( index === null ) {
			return false;
		}
		selected = this.getSelectedByPhotoAndSize( index, size );
		if ( selected === null ) {
			this.getDataAdditionalPhotos().push( {
				index: index,
				size: size,
				count: count
			} );
		} else {
			selected.count += count;
		}
		this.emitChange();
		return true;
	}
	
	deleteOptinalPhoto( photo, size ) {
		var index = this.photoToIndex(photo);
		var selected;
		var dataAdditionalPhotos;
		var removeRes;
		if ( !this.data ) {
			this.data = {};
		}
		dataAdditionalPhotos = this.getDataAdditionalPhotos();
		removeRes = lodash.remove( dataAdditionalPhotos, { index: index, size: size } );
		if ( Boolean( lodash.isArray(removeRes) && removeRes.length > 0 ) ) {
			this.emitChange();
			return true;
		} else {
			return false;
		}
	}
	
	getPhotobookPrice() {
		return Number( lodash.get( this, 'cfg.prices.photobook', 0 ) );
	}
	
	getDiscPrice() {
		return Number( lodash.get( this, 'cfg.prices.disc', 0 ) );
	}
	
	getAdditionalPhotosPrice() {
		var prices = lodash.get( this, 'cfg.prices.additionalPhotos', {} );
		var availableSizes = this.getAvailableSizes();
		var res = {};
		var i, size;
		for ( i = 0; i < availableSizes.length; i++ ) {
			size = availableSizes[i];
			res[size] = ( (prices[size]) ? prices[size] : 0 );
		}
		return res;
	}
	
	getAdditionalPhotosPriceStore() {
		var prices = this.getAdditionalPhotosPrice();
		var res = [];
		var size, price, id = 0;
		for ( size in prices ) { if ( prices.hasOwnProperty(size) ) {
			price = prices[size];
			res.push( { size: size, price: price, key: id } );
			id++;
		} }
		return res;
	}
	
	getPhotobookCopyPrice() {
		return 0; // TODO: 2016-04-06 Добавить цену за копию фотокниги
	}
	
}

UserData.CHANGE_EVENT_NAME = 'change';

var userData = new UserData();

export default userData;
