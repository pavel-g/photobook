var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/questionnaire_survey';

var res = {
	
	db: null,
	
	connect: function(callback) {
		var me;
		if ( !this.db ) {
			me = this;
			return MongoClient.connect(url, function(err, db) {
				if (err) {
					return callback(err, null);
				} else {
					me.db = db;
					return callback(null, me.db);
				}
			});
		} else {
			return callback(null, this.db);
		}
	}
	
};

module.exports = res;
