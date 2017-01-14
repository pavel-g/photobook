var webpack = require("webpack");

module.exports = {
	entry: "./entry.js",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	module: {
		loaders: [
			// { test: /\.css$/, loader: "style!css" }
			{
				test: /src\/.*\.jsx$/,
				exclude: /node_modules/,
				loader: 'babel', // 'babel-loader' is also a legal name to reference
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /src\/.*\.js$/,
				exclude: /(node_modules|entry.js)/,
				loader: 'babel', // 'babel-loader' is also a legal name to reference
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	// devtool: '#source-map'
	// devtool: '#eval-source-map'
	devtool: '#cheap-source-map'
	// plugins: [
	// 	new webpack.optimize.UglifyJsPlugin()
	// ]
};
