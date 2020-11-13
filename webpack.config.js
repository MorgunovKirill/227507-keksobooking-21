var path = require('path');

module.exports = {
  entry: [
    "./js/util.js",
    "./js/backend.js",
    "./js/form.js",
    "./js/drag.js",
    "./js/filter.js",
    "./js/card.js",
    "./js/map.js",
    "./js/preview.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "js"),
    iife: true
  },
  devtool: false
};
