import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import Start from './start.jsx';
import About from './about.jsx';
import RouterStore from './stores/router.js';

class AppRouter extends React.Component {
	
	constructor() {
		super();
		if ( !this.state ) {
			this.state = {};
		}
		this.onChange = this.onChange.bind(this);
		this.state.page = RouterStore.page;
	}
	
	onChange() {
		this.setState({
			page: RouterStore.page
		})
	}
	
	componentDidMount() {
		RouterStore.addChangeListener(this.onChange);
	}
	
	componentWillUnmount() {
		RouterStore.removeChangeListener(this.onChange);
	}
	
	render() {
		if ( this.state.page === 'about' ) {
			return <About/>;
		} else {
			return <Start/>;
		}
	}
	
}

export default AppRouter;
