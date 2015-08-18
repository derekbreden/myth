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
  var built_js = '';
  return _gulp2['default'].src(["./src/**/*.html", "./node_modules/myth/src/client/*.html"]).pipe(_through22['default'].obj(function (file, enc, callback) {
    var this_built = _parse_html2['default'].bind(this)(file, callback, class_iterator++);
    built_css += this_built.css;
    built_js += this_built.js;
  })).pipe((0, _gulpConcat2['default'])('client/tmp_modules.js')).pipe(_through22['default'].obj(function (file, enc, callback) {
    this.push(new _gulpUtil2['default'].File({
      path: 'client/index.css',
      contents: new Buffer(built_css)
    }));
    this.push(new _gulpUtil2['default'].File({
      path: 'server/tmp_modules.js',
      contents: new Buffer(built_js)
    }));
    this.push(file);
    callback();
  })).pipe(_gulp2['default'].dest("./build"));
});