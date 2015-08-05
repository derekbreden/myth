'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _gulpDevelopServer = require('gulp-develop-server');

var _gulpDevelopServer2 = _interopRequireDefault(_gulpDevelopServer);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

_gulp2['default'].task("build_app", function (cb) {
  _gulp2['default'].src(["./node_modules/myth/src/**/server.js"]).pipe((0, _gulpBabel2['default'])()).on('error', function (err) {
    console.error(err.fileName);
    console.error(err.loc);
    console.error(err.codeFrame);
    _gulpDevelopServer2['default'].kill();
  }).pipe(_gulp2['default'].dest("./build")).on('end', function () {
    var server_ready = function server_ready() {
      if (cb) cb();
    };
    if (!_gulpDevelopServer2['default'].child) _gulpDevelopServer2['default'].listen({ path: './build/entry/server.js' }, server_ready);else _gulpDevelopServer2['default'].restart(server_ready);
  });
});