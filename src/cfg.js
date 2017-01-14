var cfg;

try {
	cfg = require('./cfg-custom.js');
} catch (ex) {
	cfg = require('./cfg-default.js');
}

module.exports = cfg;
