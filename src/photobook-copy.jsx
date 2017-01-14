import UserDataPrototype form './UserDataPrototype.jsx';
import UserDataStore from './stores/user-data.js';
import UserDataActions from './actions/user-data.js';
import lodash from 'lodash';

class PhotobookCopy extends UserDataPrototype {
	
	constructor() {
		super();
		if ( !this.state ) {
			this.state = {};
		}
		this.state.checked = Boolean( lodash.get( UserDataStore, 'data.photobookCopy', false ) );
	}
	
	componentDidMount() {
		var res = super.componentDidMount();
		this.updateValue();
		return res;
	}
	
	onChange() {
		var res = super.onChange();
		this.updateValue();
		return res;
	}
	
	updateValue() {
		var checked = Boolean( lodash.get( UserDataStore, 'data.photobookCopy', false ) );
		this.refs.photobookCopyYes.checked = checked;
		this.refs.photobookCopyNo.checked = !checked;
	}
	
	onSelect(state) {
		this.setState( { checked: Boolean(state) } );
		UserDataActions.setData( 'photobookCopy', Boolean(state) );
	}
	
	render() {
		var radioGroupLabelStyle = {
			'marginTop': '18px'
		};
		var price = UserDataStore.getPhotobookCopyPrice();
		if ( price > 0 ) {
			price = ' (' + price + ' р.)';
		} else {
			price = '';
		}
		return (
			<div style={ { marginBottom: '20px' } }>
				<p style={radioGroupLabelStyle}>Дополнительная копия фотокниги{price}:</p>
				<label className="radio-inline">
					<input
						name="photobookCopy"
						type="radio"
						value="yes"
						ref="photobookCopyYes"
						onClick={ () => this.onSelect(true) }/>
					Да
				</label>
				<label className="radio-inline">
					<input
						name="photobookCopy"
						type="radio"
						value="no"
						ref="photobookCopyNo"
						onClick={ () => this.onSelect(false) }/>
					Нет
				</label>
			</div>
		);
	}
	
}
