'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpDevelopServer = require('gulp-develop-server');

var _gulpDevelopServer2 = _interopRequireDefault(_gulpDevelopServer);

_gulp2['default'].task("reload_client", function (cb) {
  if (_gulpDevelopServer2['default'].child) _gulpDevelopServer2['default'].child.send({ "action": "reload-client" });
  cb();
});