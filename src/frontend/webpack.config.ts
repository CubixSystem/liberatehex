import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

module.exports = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  // NOTE ./ - project root directory
  entry: {
    bundle: './src/frontend',
    vendor: [ 'babylonjs', 'react', 'react-dom', 'jquery', 'jquery.terminal' ]
  },

  module: {
    rules: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' },
      { test: /\.tsx?$/, loader: 'tslint-loader', enforce: 'pre' },

      // General files
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css?$/, loader: 'style-loader' },
      { test: /\.css?$/, loader: 'css-loader' },
      { test: /\.html$/, loader: 'file-loader?name=[name].[ext]!extract-loader!html-loader' },

      { test: require.resolve('babylonjs'), loader: 'expose-loader?BABYLON' },
      { test: require.resolve('jquery'), loader: 'expose-loader?jQuery' },
      { test: require.resolve('react-dom'), loader: 'expose-loader?ReactDOM' },
      { test: require.resolve('react'), loader: 'expose-loader?React' }
    ]
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../../public')
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      filename: 'js/vendor.bundle.js',
      name: 'vendor'
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, './assets/models'), to: 'assets/models' },
      { from: path.join(__dirname, './assets/textures'), to: 'assets/textures' },
      { from: path.join(__dirname, './assets/js'), to: 'assets/js' }
    ])
  ],

  resolve: {
    extensions: [ '.webpack.js', '.web.js', '.ts', '.js', '.tsx' ]
  }
};
