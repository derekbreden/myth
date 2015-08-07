'use strict';

var _arguments = arguments;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpConcatCss = require('gulp-concat-css');

var _gulpConcatCss2 = _interopRequireDefault(_gulpConcatCss);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

_gulp2['default'].task("build_css", function () {
  return _gulp2['default'].src("./node_modules/myth/src/entry/client.css").pipe((0, _gulpConcatCss2['default'])("entry/client.css")).on('error', function () {
    console.error(_arguments);
  }).pipe(_gulp2['default'].dest("./build")).on('end', function () {
    (0, _del2['default'])(['./build/tmp_modules.css'], function () {});
  });
});