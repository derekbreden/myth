'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _runSequence = require('run-sequence');

var _runSequence2 = _interopRequireDefault(_runSequence);

_gulp2['default'].task("watch", function (cb) {
  _gulp2['default'].watch(['./src/**/*.html'], function () {
    (0, _runSequence2['default'])("build_client", "build_app", "reload_client");
  });
  cb();
});