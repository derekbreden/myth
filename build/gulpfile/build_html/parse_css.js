'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _css = require('css');

var _css2 = _interopRequireDefault(_css);

exports['default'] = function (in_css, top_level_class) {
  var obj = _css2['default'].parse(in_css);
  for (var i in obj.stylesheet.rules) {
    var new_selectors = [];
    for (var j in obj.stylesheet.rules[i].selectors) {
      var this_selector = obj.stylesheet.rules[i].selectors[j];
      new_selectors.push('.' + top_level_class + ' ' + this_selector);
      new_selectors.push(this_selector + '.' + top_level_class + ' ');
    }
    obj.stylesheet.rules[i].selectors = new_selectors;
  }
  return _css2['default'].stringify(obj);
};

module.exports = exports['default'];