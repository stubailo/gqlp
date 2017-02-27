#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const GzipSize = require('gzip-size');
const PrettyBytes = require('pretty-bytes');
const UglifyJS = require("uglify-js");

const filePath = '../lib/gqlp.js';

console.log('gqlp: ', size(filePath));

const webpack = require("webpack");

const graphqlJsPath = 'graphql-js-index.js';
const graphqlJsBundle = 'graphql-js-bundle.js';

// returns a Compiler instance
webpack({
  entry: path.resolve(__dirname, graphqlJsPath),
  output: {
    path: __dirname,
    filename: graphqlJsBundle,
  },
}, function(err, stats) {
  console.log('graphql-js: ', size(graphqlJsBundle));
});


function size(relativePath) {
  const resolvedPath = path.resolve(__dirname, relativePath);

  const uglified = UglifyJS.minify(resolvedPath).code;

  const rawGzippedSize = GzipSize.sync(uglified);
  return PrettyBytes(rawGzippedSize);
}
