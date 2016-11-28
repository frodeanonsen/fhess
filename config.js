'use strict';

const path = require("path");
const projectBasePath = path.resolve(__dirname);

const config = {
  env : process.env.NODE_ENV,

  PATHS : {
    base : projectBasePath,
    src: path.resolve(projectBasePath, 'src'),
    dist: path.resolve(projectBasePath, 'dist'),
    app: path.resolve(projectBasePath, 'src', 'app', 'index.jsx'),
    appTemplate: path.resolve(projectBasePath, 'src', 'templates', 'index.hbs')
  },

  ENVIRONMENT : {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000
  }

};

let isDev = config.env === 'development';
let isProd = config.env === 'production';
let isTest = config.env === 'test';


config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(isDev ? "development" : "production")
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : isDev,
  '__PROD__'     : isProd,
  '__TEST__'     : isTest
};


module.exports = config;
