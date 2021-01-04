module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    contentBase: __dirname,
    port: 3001,
    host: 'localhost',
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
