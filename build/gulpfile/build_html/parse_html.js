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
  var final_js = '';
  var handler = new _htmlparser2Myth2['default'].DomHandler(function (error, dom) {
    var top_level_class = 'ms-' + class_iterator;
    var built = {
      html_css: '',
      ctrl_css: '',
      window_js: '',
      ctrl_js: '',
      server_js: '',
      views: [],
      final_css: ''
    };
    for (var i in dom) {
      built = (0, _parse_node2['default'])(dom[i], built, top_level_class);
    }

    var built_views = built.views[0];
    if (built.views.length > 1) built_views = 'm(\'div\',[' + built.views.join(',\n') + '])';

    // Local CSS
    final_css += (0, _parse_css2['default'])(built.ctrl_css, top_level_class);
    // Global CSS
    final_css += built.html_css;

    // Server JS
    final_js += built.server_js;

    // Local JS
    _this.push(new _gulpUtil2['default'].File({
      path: file.relative,
      contents: new Buffer('\n  ' + built.window_js + '\n  module.exports["' + file.relative.replace(/\..*$/, '') + '"] = {\n    is_body(){\n      return ' + !!(built.views[0] && built.views[0].match(/^m\('body'/)) + '\n    },\n    controller(args, name){\n      if(typeof(args) === \'object\')\n        for(let i in args){\n          this[i] = args[i]\n        }\n      this.children = []\n      this.name = name\n\n      ' + built.ctrl_js + '\n\n      m.root = m.root || {}\n      m.root[name] = this\n      if(this.parent && this.parent.children){\n        this.parent.children.push(this)\n      }\n    },\n    view(ctrl){\n      return ' + built_views + '\n    }\n  }\n  ') }));
    callback();
  });
  var parser = new _htmlparser2Myth2['default'].Parser(handler);
  parser.write(file.contents);
  parser.done();
  return {
    css: final_css,
    js: final_js
  };
};

module.exports = exports['default'];