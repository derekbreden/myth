'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _through2 = require('through2');

var _through22 = _interopRequireDefault(_through2);

var _gulpConcat = require('gulp-concat');

var _gulpConcat2 = _interopRequireDefault(_gulpConcat);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _parse_html = require('./parse_html');

var _parse_html2 = _interopRequireDefault(_parse_html);

_gulp2['default'].task("build_html", function () {

  var class_iterator = 0;
  var built_css = '';
  return _gulp2['default'].src("./src/**/*.html").pipe(_through22['default'].obj(function (file, enc, callback) {
    built_css += _parse_html2['default'].bind(this)(file, callback, class_iterator++);
  })).pipe((0, _gulpConcat2['default'])('client/tmp_modules.js')).pipe(_through22['default'].obj(function (file, enc, callback) {
    this.push(new _gulpUtil2['default'].File({
      path: 'tmp_modules.css',
      contents: new Buffer(built_css)
    }));
    this.push(file);
    callback();
  })).pipe(_gulp2['default'].dest("./build"));
});