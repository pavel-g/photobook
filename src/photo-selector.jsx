import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from './bootstrap.js';
import lodash from 'lodash';

class PhotoSelector extends React.Component {
	
	constructor() {
		super();
		this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}
	
	onCancelButtonClick() {
		if ( typeof this.props.onDone === 'function' ) {
			this.props.onDone(null);
		}
	}
	
	getHandleHideModal() {
		var hideFn;
		if ( !this.handleHideModal ) {
			if ( typeof this.props.handleHideModal === 'function' ) {
				hideFn = this.props.handleHideModal;
			} else {
				hideFn = function() {};
			}
			this.handleHideModal = lodash.once(hideFn);
		}
		return this.handleHideModal;
	}
	
	onSelect(photo) {
		this.getHandleHideModal()(photo);
		Bootstrap.jQuery( ReactDOM.findDOMNode(this) ).modal('hide');
	}
	
	componentDidMount() {
		var hideFn;
		Bootstrap.jQuery( ReactDOM.findDOMNode(this) ).modal('show');
		Bootstrap.jQuery( ReactDOM.findDOMNode(this) ).on( 'hidden.bs.modal', this.getHandleHideModal() );
	}
	
	render() {
		var photos = this.props.photos;
		var maxHeight = Bootstrap.jQuery(window).height() - 250;
		var bodyStyle = {
			overflow: 'auto',
			maxHeight: String(maxHeight) + 'px'
		};
		return (
			<div className="modal fade " tabIndex="-1" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="modal-title">Выбор фотографии</h4>
						</div>
						<div className="modal-body">
							<p>TODO: Вывести список фотографий</p>
							<div style={bodyStyle}>
								{ photos.map( (photo) => {
									return <img src={photo} style={ { width: '100%', marginTop: '10px', marginBottom: '10px' } } onClick={ () => this.onSelect(photo) }></img>;
								} ) }
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default" data-dismiss="modal">Отмена</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
	
}

export default PhotoSelector;
