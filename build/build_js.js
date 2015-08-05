'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _browserify = require('browserify');

var _browserify2 = _interopRequireDefault(_browserify);

var _babelify = require('babelify');

var _babelify2 = _interopRequireDefault(_babelify);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _vinylSourceStream = require('vinyl-source-stream');

var _vinylSourceStream2 = _interopRequireDefault(_vinylSourceStream);

_gulp2['default'].task("build_js", function (cb) {
  (0, _browserify2['default'])({
    entries: ['./node_modules/myth/src/entry/client.js']
  }).transform(_babelify2['default']).bundle().on('error', function (err) {
    console.error(err.filename);
    console.error(err.loc);
    console.error(err.codeFrame);
  }).pipe((0, _vinylSourceStream2['default'])('entry/client.js')).pipe(_gulp2['default'].dest("./build")).on('end', function () {
    (0, _del2['default'])(['./build/tmp_modules.js'], function () {});
    if (cb) cb();
  });
});