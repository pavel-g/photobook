import UserDataStore from './stores/user-data.js';
import lodash from 'lodash';

export default {
	
	calcPhotobook: function() {
		
		var price = Number(lodash.get( UserDataStore, 'cfg.prices.photobook', 0 ));
		var selected = Boolean( lodash.get( UserDataStore, 'data.photobook', false ) );
		
		if ( !selected ) {
			return 0;
		} else {
			return price;
		}
		
	},
	
	calcDisc: function() {
		
		var price = Number( lodash.get( UserDataStore, 'cfg.prices.disc', 0 ) );
		var selected = Boolean( lodash.get( UserDataStore, 'data.disc', false ) );
		
		if ( !selected ) {
			return 0;
		} else {
			return price
		}
		
	},
	
	calcAdditionalPhotos: function() {
		
		var prices = lodash.defaultsDeep(
			lodash.cloneDeep( lodash.get( UserDataStore, 'cfg.prices.additionalPhotos', {} ) ),
			{
				// '15x10': 0,
				// '30x20': 0
				'10x15': 0,
				'15x22': 0,
				'20x30': 0
			}
		);
		var selected = lodash.get( UserDataStore, 'data.additionalPhotos', [] );
		var i, item;
		var sum = 0;
		
		if ( !lodash.isArray(selected) ) {
			return 0;
		} else {
			
			for ( i = 0; i < selected.length; i++ ) {
				item = selected[i];
				sum += prices[ item.size ] * item.count;
			}
			
			return sum;
			
		}
		
	},
	
	calcWork: function() {
		var price = Number( lodash.get( UserDataStore, 'cfg.prices.work', 0 ) );
		return price;
	},
	
	calc: function() {
		return this.calcPhotobook() + this.calcDisc() + this.calcAdditionalPhotos() +
		       this.calcWork();
	}
	
};
