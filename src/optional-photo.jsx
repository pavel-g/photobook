import React from 'react';

class OptionalPhoto extends React.Component {
	
	render() {
		var blockStyle = {
			display: 'block',
			width: '100%',
			height: '50px',
			border: '1px solid #D0D0D0'
		};
		var actionsStyle = {
			textAlign: 'right',
			display: 'inline-block',
			width: '30%',
			// height: '100%',
			verticalAlign: 'middle'
		};
		var imgStyle = {
			height: '50px'
		};
		var onDeleteClick;
		if ( typeof this.props.onDeleteClick ) {
			onDeleteClick = this.props.onDeleteClick;
		} else {
			onDeleteClick = function() {};
		}
		return (
			<div style={blockStyle}>
				<div style={ { display: 'inline-block', height: '100%', verticalAlign: 'middle' } }></div>
				<div style={ { display: 'inline-block', verticalAlign: 'middle', width: '70%' } }>
					<img src={this.props.url} style={imgStyle}/> ({this.props.size} - {this.props.count} шт.)
				</div>
				<div style={actionsStyle}>
					<button type="button" className="btn btn-xs" onClick={onDeleteClick}>
						<span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
					</button>
				</div>
			</div>
		);
	}
	
}

export default OptionalPhoto;
