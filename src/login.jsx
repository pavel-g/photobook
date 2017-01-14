import React from 'react';
import AuthAction from './actions/auth.js';

class Login extends React.Component {
	
	constructor() {
		super();
		this._onLoginButtonClick = this.onLoginButtonClick.bind(this);
	}
	
	getData() {
		return {
			name: this.refs.nameField.value,
			pass: this.refs.passField.value
		};
	}
	
	getNameField() {
		if ( !this._nameField ) {
			this._nameField = <input className="form-control" type="text" placeholder="Имя пользователя" ref="nameField"/>;
		}
		return this._nameField;
	}
	
	getPassField() {
		if ( !this._passField ) {
			this._passField = <input className="form-control" type="password" placeholder="Пароль" ref="passField"/>;
		}
		return this._passField;
	}
	
	onLoginButtonClick() {
		var data = this.getData();
		AuthAction.login( data.name, data.pass );
	}
	
	render() {
		var contentStyle = {
			'marginTop': '60px'
		};
		var nameField = this.getNameField();
		var passField = this.getPassField();
		return (
			<div style={contentStyle} className="container col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
				<form>
					<div className="form-group">
						<label for="name">Имя пользователя</label>
						{nameField}
					</div>
					<div className="form-group">
						<label for="">Пароль:</label>
						{passField}
					</div>
					<button type="button" className="btn btn-primary" onClick={this._onLoginButtonClick}>Войти</button>
				</form>
			</div>
		);
	}
	
}

export default Login;
