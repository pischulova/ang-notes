module.exports = {
	entry: './src/main.js',
	output: {
		path: './bin',
		filename: 'app.bundle.js',
	},
	devtool: 'source-map',
	module: {
		loaders: [
		{ test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	}
}