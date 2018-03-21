var HtmlWebpackPlugin = require('html-webpack-plugin');
const { join } = require('path');
module.exports = options => {
  return {
    mode: 'development',
    entry: join(__dirname, 'index.js'),
    devtool: 'inline-source-map',
    output: {
      path: join(__dirname, 'dist'),
      filename: 'bundle.js',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    module: {
      rules: [
        {
          test: /\.js?/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015'],
              plugins: ['transform-object-rest-spread']
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        title: 'test',
        myPageHeader: 'test',
        template: join(__dirname, 'index.html'),
        filename: join(__dirname, 'dist/index.html') //relative to root of the application
      })
    ]
  };
};
