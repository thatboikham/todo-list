const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/DOM.js',
    project: './src/project.js',
    tasks: './src/tasks.js',
    dialog: './src/dialog.js',
    storage: './src/storage.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'header',
      scriptloading: 'defer',
      scriptags: [
        {
          src: '.scr/DOM.js'
        },
        {
          src: '.scr/project.js'
        },
        {
          src: '.scr/tasks.js'
        },
        {
          src: '.scr/dialog.js'
        },
        {
          src: '.scr/storage.js'
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
