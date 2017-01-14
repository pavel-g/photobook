import React from 'react';
import OptionalPhoto from './optional-photo.jsx';
import UserDataStore from './stores/user-data.js';
import UserDataPrototype from './UserDataPrototype.jsx';
import {Modal, ModalClose} from 'react-modal-bootstrap';
import Bootstrap from './bootstrap.js';
import lodash from 'lodash';
import UserDataActions from './actions/user-data.js';

class OptionalPhotos extends UserDataPrototype {
	
	constructor() {
		super();
		if ( !this.state ) {
			this.state = {};
		}
		this.state.modalAddPhoto = false;
		this.state.modalOptions = false;
		this.state.selectedPhoto = null;
	}
	
	onDeleteClick( photoIndex, size ) {
		UserDataActions.deleteOptinalPhoto( photoIndex, size );
	}
	
	showModalAddPhoto() {
		this.setState({modalAddPhoto: true});
	}
	
	hideModalAddPhoto(photo) {
		var newState = {};
		newState.modalAddPhoto = false;
		newState.selectedPhoto = ( (photo) ? photo : null );
		this.setState( newState, () => { if (photo) { this.showModalOptions() } } );
	}
	
	showModalOptions() {
		this.setState({modalOptions: true});
	}
	
	hideModalOptions(ok) {
		this.setState({modalOptions: false});
	}
	
	getSizeField() {
		var sizes, sizesStore;
		if ( !this._countField ) {
			sizes = UserDataStore.getAvailableSizes();
			sizesStore = [];
			lodash.forEach( sizes, (size, id) => sizesStore.push({ size: size, id: id }) );
			this._countField = (
				<select className="form-control" ref="sizeField">
					{ sizesStore.map( (item) => { return (<option value={item.size}>{item.size}</option>); } ) }
				</select>
			);
		}
		return this._countField;
	}
	
	getCountField() {
		if ( !this._sizeField ) {
			this._sizeField = <input type="number" className="form-control" ref="countField"/>; // TODO: 2016-03-31
		}
		return this._sizeField;
	}
	
	getModalOptionsData() {
		return {
			count: Number(this.refs.countField.value),
			size: this.refs.sizeField.value
		};
	}
	
	addOptionalPhoto() {
		var data = this.getModalOptionsData();
		var photo = this.state.selectedPhoto;
		if ( photo !== null && data.count && data.size ) {
			UserDataActions.addOptionalPhoto( photo, data.size, data.count );
			return true;
		} else {
			return false;
		}
	}
	
	onAddClick() {
		if ( this.addOptionalPhoto() ) {
			this.hideModalOptions(true);
		}
	}
	
	getSelectedOptionalPhotos() {
		
		var selectedOptionalPhotos = UserDataStore.getSelectedOptionalPhotos();
		
		return (
			<div>
				{ selectedOptionalPhotos.map( (item) => {
					var onDeleteClick = () => {
						this.onDeleteClick( item.index, item.size );
					};
					return (
						<OptionalPhoto
							url={item.url}
							size={item.size}
							count={item.count}
							onDeleteClick={onDeleteClick}
						/>
					);
				} ) }
			</div>
		);
		
	}
	
	getPrices() {
		var prices = UserDataStore.getAdditionalPhotosPriceStore();
		return (
			<ul>
				{ prices.map( (item) => {
					return (
						<li key={item.key}>{item.size} - { String( item.price ) + 'р.' }</li>
					);
				} ) }
			</ul>
		);
	}
	
	render() {
		
		var data = UserDataStore.getSelectedOptionalPhotos(),
		    allOptionalPhotos = UserDataStore.getAllOptionalPhotosStore(),
		    photoStyle = { width: '100%', marginTop: '10px', marginBottom: '10px' },
		    maxHeight = Bootstrap.jQuery(window).height() - 250,
		    containerStyle = { overflow: 'auto', maxHeight: String(maxHeight) + 'px' },
		    sizeField = this.getSizeField(),
		    countField = this.getCountField(),
		    selectedOptionalPhotos,
		    prices = this.getPrices();
		
		selectedOptionalPhotos = this.getSelectedOptionalPhotos();
		
		// TODO: 2016-03-29 Разобраться с модальными окнами
		// Внизу из-за строчки {addOptionalPhoto} остальная страница ломается
		
		return (
			<div>
				<p style={ { marginTop: '10px' } }>Дополнительные фотографии:</p>
				
				{/*{prices}*/}
				
				<button
					type="button"
					className="btn btn-default btn-sm"
					style={ { marginBottom: '10px' } }
					onClick={() => this.showModalAddPhoto()}>
					
					<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Добавить
				</button>
				
				<Modal isOpen={this.state.modalAddPhoto} onRequestHide={() => this.hideModalAddPhoto(null)}>
					<div className="modal-header">
						<ModalClose onClick={() => this.hideModalAddPhoto(null)}/>
						<h4>Выбор фотографии</h4>
					</div>
					<div className="modal-body">
						<p>Выберите фотографию</p>
						<div style={containerStyle}>
							{ allOptionalPhotos.map( (item) => {
								return (<img
									key={item.id}
									src={item.photoUrl}
									style={photoStyle}
									onClick={() => this.hideModalAddPhoto(item.photoUrl)}
								/>);
							} ) }
						</div>
					</div>
					<div className="modal-footer">
						<button className="btn btn-default" onClick={() => this.hideModalAddPhoto(null)}>Отмена</button>
					</div>
				</Modal>
				
				<Modal isOpen={this.state.modalOptions} onRequestHide={() => this.hideModalOptions(false)}>
					<div className="modal-header">
						<ModalClose onClick={() => this.hideModalOptions(false)}/>
						<h4>Дополнительные параметры</h4>
					</div>
					<div className="modal-body">
						{ this.state.selectedPhoto && ( <img style={ { width: '50%' } } src={ this.state.selectedPhoto }/> ) }
						<p>Стоимость печати фотографии:</p>
						<ul>
							<li>10x15 - 30 р.</li>
							<li>15x22 - 50 р.</li>
							<li>20x30 - 80 р.</li>
						</ul>
						<form>
							<div className="form-group">
								<label for="size">Размер:</label>
								{sizeField}
							</div>
							<div className="form-group">
								<label for="size">Количество:</label>
								{countField}
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button className="btn btn-default" onClick={() => this.hideModalOptions(false)}>Отмена</button>
						{/* TODO: 2016-03-31 По нажатию на Добавить передавать данные в hideModalOptions */}
						<button className="btn btn-primary" onClick={() => this.onAddClick()}>Добавить</button>
					</div>
				</Modal>
				
				{selectedOptionalPhotos}
				
				{/*{addOptionalPhoto}*/}
				{/*{ data.map( (item) => {
					var onDeleteClick = () => this.onDeleteClick( item.index, item.size );
					return (
						<OptionalPhoto url={item.url} size={item.size} count={item.count}
						               onDeleteClick={onDeleteClick}/>
					);
				} ) }*/}
			</div>
		);
	}
	
}

export default OptionalPhotos;
