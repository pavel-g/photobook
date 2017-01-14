import React from 'react';
import lodash from 'lodash';
import UserDataPrototype from './UserDataPrototype.jsx';
import UserDataStore from './stores/user-data.js';
import PhotoSelector from './photo-selector.jsx';
import Bootstrap from './bootstrap.js';
import UserDataActions from './actions/user-data.js';

class PhotoInPage extends UserDataPrototype {
	
	constructor() {
		super();
		if ( !this.state ) {
			this.state = {};
		}
		this.state.showPhotoSelector = false;
		this.showPhotoSelector = this.showPhotoSelector.bind(this);
		this.hidePhotoSelector = this.hidePhotoSelector.bind(this);
	}
	
	// TODO: 2016-03-12 Выровнять контент по центру
	
	getPageIndex() {
		return Number(lodash.get(this.props, 'pageIndex', 0));
	}
	
	getPhotoIndex() {
		return Number(lodash.get(this.props, 'photoIndex', 0));
	}
	
	getPhotos() {
		return UserDataStore.getPageCfg( this.getPageIndex() ).photos;
	}
	
	getSelectedPhoto() {
		// return lodash.get( this.state, 'selectedPhoto', null );
	}
	
	disableChangeState() {
		if ( !this._disableChangeState ) {
			this._disableChangeState = 0;
		}
		this._disableChangeState++;
		return true;
	}
	
	enableChangeState() {
		if ( typeof this._disableChangeState === 'number' && this._disableChangeState > 0 ) {
			this._disableChangeState--;
			if ( this._disableChangeState === 0 ) {
				delete this._disableChangeState;
			}
			return true;
		} else {
			return false;
		}
	}
	
	isDisabledChangeState() {
		return Boolean( this._disableChangeState );
	}
	
	showPhotoSelector() {
		if ( this.isDisabledChangeState() ) {
			return;
		}
		this.disableChangeState();
		this.setState(
			{
				showPhotoSelector: true
			},
			() => {
				this.enableChangeState();
			}
		);
	}
	
	hidePhotoSelector(photo) {
		if ( this.isDisabledChangeState() ) {
			return;
		}
		this.disableChangeState();
		var path, photoIndex;
		if (photo) {
			path = 'pages.' + String( this.getPageIndex() ) + '.' + String( this.getPhotoIndex() );
			photoIndex = this.getPhotos().indexOf(photo);
			UserDataActions.setData( path, photoIndex );
		}
		this.setState(
			{
				showPhotoSelector: false
			},
			() => {
				this.enableChangeState();
			}
		);
	}
	
	getModalId() {
		var res = "photo-" + this.getPhotoIndex() + "-in-page-" + this.getPageIndex();
		return res;
	}
	
	render() {
		var style = {
			minHeight: '100px',
			textAlign: 'center',
			verticalAlign: 'middle'
		};
		var rowspan = this.props.rowspan;
		var colspan = this.props.colspan;
		var tdStyle = {
			border: '1px solid #000000'
		};
		if ( colspan == 2 ) {
			tdStyle.width = '50%';
		} else {
			tdStyle.width = '25%';
		}
		var photoSelector;
		if ( this.state.showPhotoSelector ) {
			photoSelector = <PhotoSelector handleHideModal={this.hidePhotoSelector} photos={this.getPhotos()}/>
		} else {
			photoSelector = null;
		}
		var selectedPhoto = UserDataStore.getSelectedPhoto( this.getPageIndex(), this.getPhotoIndex() );
		var selectedPhotoItem;
		if ( selectedPhoto ) {
			selectedPhotoItem = <img style={ { width: '100%' } } src={selectedPhoto}/>;
		} else {
			selectedPhotoItem = <span>Нажмите сюда для выбора фотографии</span>;
		}
		return (
			<td rowSpan={rowspan} colSpan={colspan} style={tdStyle} onClick={this.showPhotoSelector}>
				{photoSelector}
				<div style={style}>
					{selectedPhotoItem}
				</div>
			</td>
		);
	}
	
}

export default PhotoInPage;
