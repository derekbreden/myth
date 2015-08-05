'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _gulpDevelopServer = require('gulp-develop-server');

var _gulpDevelopServer2 = _interopRequireDefault(_gulpDevelopServer);

var types = ['error', 'log', 'info', 'warn'];
// Intercept console messages from self
// Pass messages to server.child if exists

var _loop = function (i) {
  var original = console[types[i]];
  console[types[i]] = function (data) {
    original.apply(console, arguments);
    var args = [].slice.call(arguments);
    if (_gulpDevelopServer2['default'].child) {
      try {
        _gulpDevelopServer2['default'].child.send({ "console": args.join(" ") });
      } catch (e) {}
    }
  };
};

for (var i in types) {
  _loop(i);
}