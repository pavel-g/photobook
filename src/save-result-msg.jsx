import {Modal, ModalClose} from 'react-modal-bootstrap';
import React from 'react';

export default function(props) {
	return (
		<Modal isOpen={props.isOpen} onRequestHide={props.onRequestHide}>
			<div className="modal-header">
				<ModalClose onClick={props.onRequestHide}/>
				<h4>Сохранение данных</h4>
			</div>
			<div className="modal-body">
				<p>Ваши данные были сохранены на сервере. Можете продолжить редактирование или закрыть страницу.</p>
			</div>
			<div className="modal-footer">
				<button className="btn btn-default" onClick={props.onRequestHide}>ОК</button>
			</div>
		</Modal>
	);
};
