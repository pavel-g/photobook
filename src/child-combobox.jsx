import React from 'react';

class ChildCombobox extends React.Component {
	
	render() {
		var style = {
			'display': 'inline-block',
			'width': '100px'
		};
		return (
			<select className="form-control">
				<option value="1">Ваня Иванов</option>
				<option value="2">Петя Петров</option>
			</select>
		);
	}
	
}

export default ChildCombobox;
