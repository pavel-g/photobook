import React from 'react';
import UserDataStore from './stores/user-data.js';

class UserDataPrototype extends React.Component {
	
	constructor() {
		super();
		if ( !this.state ) {
			this.state = {};
		}
		this.state.cfg = UserDataStore.cfg;
		this.state.data = UserDataStore.data;
		this.onChange = this.onChange.bind(this);
	}
	
	onChange() {
		this.forceUpdate();
		this.setState({
			cfg: UserDataStore.cfg,
			data: UserDataStore.data
		});
	}
	
	
	componentDidMount() {
		UserDataStore.addChangeListener(this.onChange);
	}
	
	componentWillUnmount() {
		UserDataStore.removeChangeListener(this.onChange);
	}

}

export default UserDataPrototype;
