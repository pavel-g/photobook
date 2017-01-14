var database = require('./db.js');
var async = require('async');
var md5 = require('md5');
var clone = require('clone');

module.exports = {
	
	children: [
		{
			name: 'test',
			pass: md5('123456'),
			admin: false,
			cfg: {
				pages: [ // разметки фотокниги
					{
						layout: '4+4',
						photos: [
							'resources/test-photo-1.jpg',
							'resources/test-photo-2.jpg',
							'resources/test-photo-3.jpg',
							'resources/test-photo-4.jpg',
							'resources/test-photo-5.jpg',
							'resources/test-photo-6.jpg',
							'resources/test-photo-7.jpg',
							'resources/test-photo-8.jpg'
						]
					},
					{
						layout: '1+4',
						photos: [
							'resources/test-photo-1.jpg',
							'resources/test-photo-2.jpg',
							'resources/test-photo-3.jpg',
							'resources/test-photo-4.jpg',
							'resources/test-photo-5.jpg',
							'resources/test-photo-6.jpg',
							'resources/test-photo-7.jpg',
							'resources/test-photo-8.jpg'
						]
					},
					{
						layout: '4+1',
						photos: [
							'resources/test-photo-1.jpg',
							'resources/test-photo-2.jpg',
							'resources/test-photo-3.jpg',
							'resources/test-photo-4.jpg',
							'resources/test-photo-5.jpg',
							'resources/test-photo-6.jpg',
							'resources/test-photo-7.jpg',
							'resources/test-photo-8.jpg'
						]
					}
				],
				additionalPhotos: [ // дополнительные фотографии
							'resources/test-photo-1.jpg',
							'resources/test-photo-2.jpg',
							'resources/test-photo-3.jpg',
							'resources/test-photo-4.jpg',
							'resources/test-photo-5.jpg',
							'resources/test-photo-6.jpg',
							'resources/test-photo-7.jpg',
							'resources/test-photo-8.jpg'
				],
				// discounts: [ // скидки
				// 	{
				// 		target: 'photobook',
				// 		discount: 1000
				// 	},
				// 	{
				// 		target: 'disc',
				// 		discount: 100
				// 	}
				// ],
				discounts: {
					photobook: 1000,
					disc: 100
				},
				prices: { // цены
					work: 1000,
					photobook: 1000,
					disc: 100,
					additionalPhotos: {
						// '15x10': 15,
						// '30x20': 50
						'10x15': 15,
						'15x22': 30,
						'20x30': 50
					}
				}
			},
			data: null,
		}
	],
	
	getChildren: function() {
		return clone( this.children );
	},
	
	removeAllChildren: function(callback) {
		var children = this.getChildren();
		var collection = database.db.collection('users');
		return async.each(
			children,
			function(child, callback) {
				return collection.deleteMany({name: child.name}, callback);
			},
			callback
		);
	},
	
	install: function(callback) {
		var collection = database.db.collection('users');
		var me = this;
		var children = this.getChildren();
		return async.series(
			[
				this.removeAllChildren.bind(this),
				function(callback) {
					return collection.insertMany( children, callback );
				}
			],
			callback
		);
	},
	
	initApp: function(app) {
		
		var me = this;
		
		app.get('/demo-data/install', function(req, resp) {
			return me.install( function(err) {
				if (err) {
					return resp.json({success:false});
				} else {
					return resp.json({success:true});
				}
			} );
		});
		
	}
	
};
