import React from 'react';
import Header from './header.jsx';

class About extends React.Component {
	
	render() {
		var contentStyle = {
			'marginTop': '60px'
		};
		return (
			<div>
				<Header/>
				<div style={contentStyle} className="container col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
					<p>Магазин фотографий от Гнедовой Марии</p>
				</div>
			</div>
		);
	}
	
}

export default About;
