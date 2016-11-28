const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');

const configValues = require("../config");
const commonWebpackSettings = require("./webpack.base.config");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require("webpack-node-externals");

const PATHS = configValues.PATHS;
const ENVIRONMENT = configValues.ENVIRONMENT;

let testExternals = [
  // Read in a list of all folders in /node_modules/, and use that as
  // a set of "external" references that don't have to be bundled in
  // at build time.  This lets us use normal synchronous lookups for
  // various dependencies at runtime under Mocha.  See
  // http://jlongster.com/Backend-Apps-with-Webpack--Part-I for details.
  nodeExternals({whitelist: []}),

  // Tack on some more externals I found somewhere that may or may not actually help.
  {
    jsdom: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'text-encoding': 'window'
  }
];

const htmlPlugin = // Auto-generate an HTML host page, and insert links to our JS bundles
      new HtmlWebpackPlugin({
        // Sort the inserted script tags by dependency graph
        chunksSortMode : 'dependency',
        template: "test/templates/test.hbs"
      });

const testWebpackConfig = merge.smart(commonWebpackSettings.baseWebpackConfig, {

  entry : {
    appTestBundle : path.join(PATHS.base, "test/test.js"),
    vendor : commonWebpackSettings.baseDependencies.concat("chai", "enzyme", "sinon")
  },

  output : {
    path : PATHS.dist + "test"
  },
  module : {
    loaders: [
      commonWebpackSettings.baseTemplateLoaders,
      commonWebpackSettings.baseBabelLoader,
      {
        test: /(\.css|\.less|\.sass)$/,
        loader: 'null-loader'
      },
      {
        test: /(\.jpg|\.jpeg|\.png|\.gif|\.svg)$/,
        loader: 'null-loader'
      },

      // Sinon is apparently really weird, and needs special handling when loading
      { test: /sinon\.js/,  loader: 'imports?define=>false,require=>false' },
      { test: /\.json/, loader : "json" }
    ],

    noParse : [ /sinon\.js/ ]
  },

  resolve : {
    alias : {
      sinon: 'sinon/pkg/sinon.js',
      test : path.join(PATHS.base, "test")
    }
  },

  plugins: [ new webpack.optimize.DedupePlugin() ],

  externals : testExternals,

  stats : {
    hash: false,
    version: false,
    timings: true,
    assets: false,
    chunks: false,
    modules: true,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: false,
    publicPath: false
  },

  // Generate sourcemaps using a faster method
  devtool : '#cheap-module-inline-source-map'
});


module.exports = testWebpackConfig;
