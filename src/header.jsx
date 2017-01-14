import React from 'react';
import {Link} from 'react-router';
import AuthStore from './stores/auth.js';
import AuthActions from './actions/auth.js';
import RouterActions from './actions/router.js';

class Header extends React.Component {
	
	// TODO: 2016-03-24 В ссылки навигатора добавить класс "active"
	// <li className="active"><Link to="/">Начало</Link></li>
	
	constructor() {
		super();
		if ( !this.state ) {
			this.state = {};
		}
		this.state.auth = AuthStore.auth;
		this._onAuthChange = this.onAuthChange.bind(this);
		this._onLogoutClick = this.onLogoutClick.bind(this);
	}
	
	componentDidMount() {
		AuthStore.addChangeListener(this._onAuthChange);
	}
	
	componentWillUnmount() {
		AuthStore.removeChangeListener(this._onAuthChange);
	}
	
	onAuthChange() {
		this.setState({auth:AuthStore.auth});
	}
	
	onLogoutClick() {
		AuthActions.logout();
	}
	
	render() {
		var logoutLink;
		if ( this.state.auth ) {
			logoutLink = (
				<ul className="nav navbar-nav navbar-right">
					<li><a onClick={this._onLogoutClick} href="#"><span className="glyphicon glyphicon-log-in" aria-hidden="true"></span> Выйти</a></li>
				</ul>
			);
		} else {
			logoutLink = null;
		}
		return (
			<div>
				<nav className="navbar navbar-inverse navbar-fixed-top">
					<div className="container-fluid">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<span className="navbar-brand">Выбор фотографий</span>
						</div>
						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">
								<li><a href="#" onClick={RouterActions.setPage.bind(RouterActions, 'start')}>Начало</a></li>
								<li><a href="#" onClick={RouterActions.setPage.bind(RouterActions, 'about')}>Об авторе</a></li>
							</ul>
							{logoutLink}
						</div>
					</div>
				</nav>
			</div>
		);
	}
	
}

export default Header;
