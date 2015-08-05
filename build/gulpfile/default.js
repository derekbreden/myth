'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _runSequence = require('run-sequence');

var _runSequence2 = _interopRequireDefault(_runSequence);

_gulp2['default'].task("default", function (cb) {
  (0, _runSequence2['default'])("clean", "build_client", "build_app", "reload_client", "watch", cb);
});