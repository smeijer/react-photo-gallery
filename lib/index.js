'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Gallery = require('./Gallery');

var _Gallery2 = _interopRequireDefault(_Gallery);

var _Photo = require('./Photo');

var _Photo2 = _interopRequireDefault(_Photo);

exports.Gallery = _Gallery2['default'];
exports.Photo = _Photo2['default'];

// backwards compatibility
exports['default'] = _Gallery2['default'];