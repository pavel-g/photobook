import React from 'react';
import Header from './header.jsx';
import Login from './login.jsx';
import Form from './form.jsx';
import AuthStore from './stores/auth.js';

class Start extends React.Component {
	
	constructor() {
		super();
		if ( !this.state ) {
			this.state = {};
		}
		this.state.auth = AuthStore.auth;
		this._onAuthChange = this.onAuthChange.bind(this);
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
	
	render() {
		var auth = Boolean( this.state.auth );
		var contentStyle = {
			'marginTop': '60px'
		};
		var page;
		if (auth) {
			page = <Form/>;
		} else {
			page = <Login/>;
		}
		return (
			<div>
				<Header/>
				<div stlye={contentStyle}>
					{page}
				</div>
			</div>
		)
	}
	
}

export default Start;
