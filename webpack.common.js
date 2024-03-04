const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    print: `./src/print.js`
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'header',
      scriptloading: 'defer',
      scriptags: [
        {
          src: '.scr/index.js'
        },
        {
          src: '.scr/print.js'
        },
      ]
    }),
  ],
  output: {
    filename: '[name].main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
