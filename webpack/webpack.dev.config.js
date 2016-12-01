'use strict';

const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');

const configValues = require("../config");
const commonWebpackSettings = require("./webpack.base.config");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = configValues.PATHS;
const ENVIRONMENT = configValues.ENVIRONMENT;

const devWebpackConfig = merge.smart(commonWebpackSettings.baseWebpackConfig, {
  entry : {
    app : [
      'react-hot-loader/patch',

      // For hot style updates
      'webpack/hot/only-dev-server',

      // The script refreshing the browser on none hot updates
      'webpack-dev-server/client?http://localhost:8080',

      // Application
      PATHS.app
    ]
  },

  module : {
    loaders: [
      commonWebpackSettings.baseBabelLoader,
      commonWebpackSettings.baseImageLoaders,
      commonWebpackSettings.baseTemplateLoaders,
      commonWebpackSettings.baseStyleLoaders
    ],

    noParse : []
  },

  resolve : {
    alias : {
    }
  },

  plugins: [
    // Force more consistent build hashes
    new webpack.optimize.OccurenceOrderPlugin(),

    /**
     * This is where the magic happens! You need this to enable Hot Module Replacement!
     */
    new webpack.HotModuleReplacementPlugin(),

    /**
     * NoErrorsPlugin prevents your webpack CLI from exiting with an error code if
     * there are errors during compiling - essentially, assets that include errors
     * will not be emitted. If you want your webpack to 'fail', you need to check out
     * the bail option.
     */
    new webpack.NoErrorsPlugin(),

    /**
     * DefinePlugin allows us to define free variables, in any webpack build, you can
     * use it to create separate builds with debug logging or adding global constants!
     * Here, we use it to specify a development build.
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    commonWebpackSettings.htmlPlugin
  ],

  // Generate sourcemaps
  devtool: '#inline-source-map'
});


module.exports = devWebpackConfig;
