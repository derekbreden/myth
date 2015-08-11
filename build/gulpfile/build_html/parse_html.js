'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _htmlparser2Myth = require('htmlparser2-myth');

var _htmlparser2Myth2 = _interopRequireDefault(_htmlparser2Myth);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _parse_node = require('./parse_node');

var _parse_node2 = _interopRequireDefault(_parse_node);

var _parse_css = require('./parse_css');

var _parse_css2 = _interopRequireDefault(_parse_css);

exports['default'] = function (file, callback, class_iterator) {
  var _this = this;

  var final_css = '';
  var handler = new _htmlparser2Myth2['default'].DomHandler(function (error, dom) {
    var top_level_class = 'ms-' + class_iterator;
    var built = {
      html_css: '',
      ctrl_css: '',
      window_js: '',
      ctrl_js: '',
      views: [],
      final_css: ''
    };
    for (var i in dom) {
      built = (0, _parse_node2['default'])(dom[i], built, top_level_class);
    }

    var built_views = built.views[0];
    if (built.views.length > 1) built_views = 'm(\'div\',[' + built.views.join(',\n') + '])';

    final_css += (0, _parse_css2['default'])(built.ctrl_css, top_level_class);
    final_css += built.html_css;

    _this.push(new _gulpUtil2['default'].File({
      path: file.relative,
      contents: new Buffer('\n  ' + built.window_js + '\n  module.exports["' + file.relative.replace(/\..*$/, '') + '"] = {\n  is_body(){\n  return ' + !!(built.views[0] && built.views[0].match(/^m\('body'/)) + '\n  },\n  controller(args){\n  ' + built.ctrl_js + '\n  },\n  view(ctrl, args){\n  return ' + built_views + '\n  }\n  }\n  ') }));
    callback();
  });
  var parser = new _htmlparser2Myth2['default'].Parser(handler);
  parser.write(file.contents);
  parser.done();
  return final_css;
};

module.exports = exports['default'];