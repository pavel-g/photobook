import React from 'react';
import Page from './page.jsx';
import OptionalPhotos from './optional-photos.jsx';
import UserDataStore from './stores/user-data.js';
import UserDataPrototype from './UserDataPrototype.jsx';
import lodash from 'lodash';
import PhotoSelector from './photo-selector.jsx';
import UserDataActions from './actions/user-data.js';
import Calc from './calc.js';
import SaveResultMsg from './save-result-msg.jsx';

class Form extends UserDataPrototype {
	
	constructor() {
		super();
		this.state.summa = 0;
		this.state.photoSelector = false;
		this.state.photobook = Boolean( lodash.get( UserDataStore, 'data.photobook', false ) );
		this.state.disc = Boolean( lodash.get( UserDataStore, 'data.disc', false ) );
		this.state.saveResultMsg = false;
	}
	
	updateFieldsValues() {
		var photobookYes = Boolean( lodash.get( UserDataStore, 'data.photobook', false ) );
		var discYes = Boolean( lodash.get( UserDataStore, 'data.disc', false ) );
		var fioValue = lodash.get( UserDataStore, 'data.fio', '' );
		var phoneValue = lodash.get( UserDataStore, 'data.phone', '' );
		var emailValue = lodash.get( UserDataStore, 'data.email', '' );
		this.refs.photobookYes.checked = photobookYes;
		this.refs.photobookNo.checked = !photobookYes;
		this.refs.discYes.checked = discYes;
		this.refs.discNo.checked = !discYes;
		this.refs.fio.value = fioValue;
		this.refs.phone.value = phoneValue;
		this.refs.email.value = emailValue;
		this.setState( { photobook: Boolean( lodash.get( UserDataStore, 'data.photobook', false ) ) } );
	}
	
	componentDidMount() {
		var res = super.componentDidMount();
		this.updateFieldsValues();
		return res;
	}
	
	onChange() {
		var res = super.onChange();
		this.updateFieldsValues();
		return res;
	}
	
	componentWillUnmount() {
		var res = super.componentWillUnmount();
		return res;
	}
	
	getPagesLayouts() {
		var pages = lodash.get( this.state, 'cfg.pages', null );
		if ( pages && pages.length > 0 && this.state.photobook ) {
			return (
				<div>
					{ pages.map( (page, index) => {
						return <Page pageIndex={index}></Page>;
					} ) }
				</div>
			);
		} else {
			return null;
		}
	}
	
	onSendClick() {
		var fieldsValues = this.getFieldsValues();
		// UserDataActions.saveData();
		
		UserDataActions.setData( 'fio', fieldsValues.fio )
		.then( () => { UserDataActions.setData( 'phone', fieldsValues.phone ) } )
		.then( () => { UserDataActions.setData( 'email', fieldsValues.email ) } )
		.then( () => { UserDataActions.setData( 'photobook', fieldsValues.photobook ) } )
		.then( () => { UserDataActions.setData( 'disc', fieldsValues.disc ) } )
		.then( () => { UserDataActions.saveData() } )
		.then( () => { this.showSaveResultMsg() } );
	}
	
	onDiscRadiogroupSelect(state) {
		this.setState( { disc: Boolean(state) } );
		UserDataActions.setData( 'disc', Boolean(state) );
	}
	
	getDisc() {
		var radioGroupLabelStyle = {
			'marginTop': '18px'
		};
		var price = UserDataStore.getDiscPrice();
		if ( price > 0 ) {
			price = ' (' + price + 'р.)';
		} else {
			price = '';
		}
		this._disc = (
			<div>
				<p style={radioGroupLabelStyle}>Диск с фотографиями{price}:</p>
				<label className="radio-inline">
					<input
						name="diskPhotos"
						type="radio"
						value="yes"
						ref="discYes"
						onClick={ () => this.onDiscRadiogroupSelect(true) }/>
					Да
				</label>
				<label className="radio-inline">
					<input
						name="diskPhotos"
						type="radio"
						value="no"
						ref="discNo"
						onClick={ () => this.onDiscRadiogroupSelect(false) }/>
					Нет
				</label>
			</div>
		);
		return this._disc;
	}
	
	getDiscValue() {
		return Boolean( this.refs.discYes.checked );
	}
	
	// TODO: 2016-04-04 Изменить имя метода onPhotobookComboboxSelect на onPhotobookRadiogroupSelect
	onPhotobookComboboxSelect(state) {
		this.setState( { photobook: Boolean(state) } );
		UserDataActions.setData( 'photobook', Boolean(state) );
	}
	
	getPhotobook() {
		var radioGroupLabelStyle = {
			'marginTop': '18px'
		};
		var price = UserDataStore.getPhotobookPrice();
		if ( price > 0 ) {
			price = ' (' + price + 'р.)';
		} else {
			price = '';
		}
		this._photobook = (
			<div style={ { marginBottom: '20px' } }>
				<p style={radioGroupLabelStyle}>Фотокнига{price}:</p>
				<label className="radio-inline">
					<input
						name="photoalbum"
						type="radio"
						value="yes"
						ref="photobookYes"
						onClick={ () => this.onPhotobookComboboxSelect(true) }/>
					Да
				</label>
				<label className="radio-inline">
					<input
						name="photoalbum"
						type="radio"
						value="no"
						ref="photobookNo"
						onClick={ () => this.onPhotobookComboboxSelect(false) }/>
					Нет
				</label>
				{ this.state.photobook && ( <p style={radioGroupLabelStyle}>Количество фотографий может измениться в результате вёрстки фотокниги</p> ) }
			</div>
		);
		return this._photobook;
	}
	
	getPhotobookValue() {
		return Boolean( this.refs.photobookYes.checked );
	}
	
	getFieldsValues() {
		return {
			fio: this.refs.fio.value,
			phone: this.refs.phone.value,
			email: this.refs.email.value,
			photobook: this.getPhotobookValue(),
			disc: this.getDiscValue()
		};
	}
	
	showSaveResultMsg() {
		this.setState( { saveResultMsg: true } );
	}
	
	hideSaveResultMsg() {
		this.setState( { saveResultMsg: false } );
	}
	
	render() {
		var contentStyle = {
			'marginTop': '60px'
		};
		var optionalPhotos = [
			{ url: 'aaa.jpg', desc: 'Это aaa', size: '15x10', count: 1 },
			{ url: 'bbb.jpg', desc: 'А это bbb', size: '30x20', count: 2 }
		];
		var summa = Calc.calc() || 0;
		var pages = this.getPagesLayouts();
		var photoSelector;
		var disc = this.getDisc();
		var photobook = this.getPhotobook();
		var onDone = function() {
			console.log('photo selector done');
		};
		if ( this.state.photoSelector ) {
			photoSelector = <PhotoSelector onDone={onDone}/>
		} else {
			photoSelector = null;
		}
		var warningStyle = {
			marginTop: '15px',
			marginBottom: '10px'
		};
		return (
			<div>
				{photoSelector}
				<div style={contentStyle} className="container col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
					<p>Ваша ФИО: <input className="form-control" type="text" ref="fio"/></p>
					<p>Телефон: <input className="form-control" type="tel" ref="phone"/></p>
					<p>E-mail: <input className="form-control" type="email" ref="email"/></p>
					{disc}
					{photobook}
					{pages}
					<OptionalPhotos/>
					<div className="alert alert-warning" role="alert" style={warningStyle}>Для сайта фотографии защищены водным знаком. На ваших фотографиях его не будет.</div>
					<div className="well" style={ { textAlign: 'center', marginTop: '20px' } }>
						<p style={ { fontSize: 'large' } }>Итого: {summa}</p>
						<button
							type="button"
							className="btn btn-primary btn-lg"
							onClick={ () => this.onSendClick() }>
							Отправить
						</button>
					</div>
					<SaveResultMsg isOpen={this.state.saveResultMsg} onRequestHide={() => this.hideSaveResultMsg()}/>
				</div>
			</div>
		);
	}
	
}

export default Form;
