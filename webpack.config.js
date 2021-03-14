const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
  devServer: {
    contentBase: __dirname,
    port: 3001,
    host: 'localhost',
    historyApiFallback: true,
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/',
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
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({ path: './.env' }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inlineSource: '.(js|css)$',
    }),
    //new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
  ],
};
