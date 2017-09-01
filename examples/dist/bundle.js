require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMeasure = require('react-measure');

var _Photo = require('./Photo');

var _Photo2 = _interopRequireDefault(_Photo);

var _utils = require('./utils');

var styles = {
  gallery: { width: '100%' },
  cell: { display: 'inline-block' }
};

var Gallery = (function (_PureComponent) {
  _inherits(Gallery, _PureComponent);

  function Gallery() {
    _classCallCheck(this, Gallery);

    _get(Object.getPrototypeOf(Gallery.prototype), 'constructor', this).call(this);

    this.handleClick = this.handleClick.bind(this);
  }

  _createClass(Gallery, [{
    key: 'handleClick',
    value: function handleClick(event, _ref) {
      var index = _ref.index;
      var cell = _ref.cell;
      var _props = this.props;
      var photos = _props.photos;
      var onClick = _props.onClick;

      if (typeof onClick !== 'function') {
        return;
      }

      onClick(event, {
        index: index,
        cell: cell,
        photo: photos[index],
        previous: photos[index - 1] || null,
        next: photos[index + 1] || null
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var _props2 = this.props;
      var _props2$ImageComponent = _props2.ImageComponent;
      var ImageComponent = _props2$ImageComponent === undefined ? _Photo2['default'] : _props2$ImageComponent;
      var measureRef = _props2.measureRef;
      var _props2$animate = _props2.animate;
      var animate = _props2$animate === undefined ? true : _props2$animate;
      var _props3 = this.props;
      var photos = _props3.photos;
      var columns = _props3.columns;
      var padding = _props3.padding;
      var width = _props3.contentRect.bounds.width;

      if (!width) {
        return _react2['default'].createElement('div', { style: styles.gallery, ref: measureRef });
      }

      var thumbs = (0, _utils.computeSizes)({ width: width, columns: columns, padding: padding, photos: photos });
      var last = thumbs[thumbs.length - 1];
      var height = last.cell.posY + last.cell.height;

      return _react2['default'].createElement(
        'div',
        { className: 'react-photo-gallery--gallery', style: { height: height }, ref: measureRef },
        thumbs.map(function (_ref2, index) {
          var photo = _ref2.photo;
          var cell = _ref2.cell;
          return _react2['default'].createElement(ImageComponent, { key: photo.key || index, index: index, photo: photo, cell: cell, onClick: _this.handleClick });
        }),
        _react2['default'].createElement(
          'style',
          null,
          '\n          .react-photo-gallery--gallery {\n            width: 100%;\n          }\n\n          .react-photo-gallery--gallery .react-photo-gallery--photo {\n            position: absolute;\n            background-repeat: no-repeat;\n            background-position: center;\n            background-color: #fff;\n            background-size: cover;\n            transition: ' + (animate ? 'transform' : 'none') + ' .5s;\n            will-change: transform;\n          }\n        '
        )
      );
    }
  }]);

  return Gallery;
})(_react.PureComponent);

Gallery.propTypes = {
  photos: _propTypes2['default'].arrayOf(_Photo.photoPropType).isRequired,
  onClick: _propTypes2['default'].func,
  columns: _propTypes2['default'].number,
  padding: _propTypes2['default'].number,
  ImageComponent: _propTypes2['default'].any
};

Gallery.defaultProps = {
  columns: 3,
  padding: 4
};

var EnhancedGallery = (0, _reactMeasure.withContentRect)('bounds')(Gallery);
exports['default'] = EnhancedGallery;
module.exports = exports['default'];

},{"./Photo":2,"./utils":3,"prop-types":undefined,"react":undefined,"react-measure":undefined}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var Photo = (function (_PureComponent) {
  _inherits(Photo, _PureComponent);

  function Photo() {
    _classCallCheck(this, Photo);

    _get(Object.getPrototypeOf(Photo.prototype), 'constructor', this).call(this);
    this.handleClick = this.handleClick.bind(this);
  }

  _createClass(Photo, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(next) {
      var _props = this.props;
      var photo = _props.photo;
      var cell = _props.cell;

      var photoChanged = next.photo !== photo && next.photo.src !== photo.src || Object.keys(next.cell).some(function (p) {
        return next.cell[p] !== cell[p];
      });

      return photoChanged;
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      var _props2 = this.props;
      var onClick = _props2.onClick;
      var index = _props2.index;
      var photo = _props2.photo;
      var cell = _props2.cell;

      if (typeof onClick === 'function') {
        onClick(event, { photo: photo, cell: cell, index: index });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var photo = _props3.photo;
      var cell = _props3.cell;
      var index = _props3.index;
      var onClick = _props3.onClick;
      var className = _props3.className;

      var props = _objectWithoutProperties(_props3, ['photo', 'cell', 'index', 'onClick', 'className']);

      return _react2['default'].createElement('div', _extends({
        className: ['react-photo-gallery--photo', className].join(' '),
        style: {
          width: cell.width,
          height: cell.height,
          transform: 'translate(' + cell.posX + 'px, ' + cell.posY + 'px)',
          backgroundImage: 'url(' + photo.src + ')',
          cursor: typeof onClick === 'function' ? 'pointer' : 'default'
        }
      }, props, {
        onClick: this.handleClick
      }));
    }
  }]);

  return Photo;
})(_react.PureComponent);

var photoPropType = _propTypes2['default'].shape({
  src: _propTypes2['default'].string.isRequired,
  width: _propTypes2['default'].number.isRequired,
  height: _propTypes2['default'].number.isRequired,
  alt: _propTypes2['default'].string,
  title: _propTypes2['default'].string,
  srcSet: _propTypes2['default'].array,
  sizes: _propTypes2['default'].array
});

exports.photoPropType = photoPropType;
var cellPropType = _propTypes2['default'].shape({
  posX: _propTypes2['default'].number,
  posY: _propTypes2['default'].number,
  width: _propTypes2['default'].number,
  height: _propTypes2['default'].number
});

exports.cellPropType = cellPropType;
Photo.propTypes = {
  index: _propTypes2['default'].number,
  onClick: _propTypes2['default'].func,
  photo: photoPropType,
  cell: cellPropType
};

exports['default'] = Photo;

},{"prop-types":undefined,"react":undefined}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ratio = ratio;
exports.computeSizes = computeSizes;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function ratio(_ref) {
  var width = _ref.width;
  var height = _ref.height;

  return width / height;
}

var _cached = undefined;

function computeSizes(_ref2) {
  var photos = _ref2.photos;
  var columns = _ref2.columns;
  var rowWidth = _ref2.width;
  var padding = _ref2.padding;

  if (!rowWidth) {
    return [];
  }

  // use cache to prevent double computations, and return same reference
  // to remove avoidable re-renders
  if (_cached && _cached.photos === photos && _cached.rowWidth === rowWidth && _cached.columns === columns && _cached.padding === padding) {
    return _cached.cells;
  }

  // divide photos over rows, max cells based on `columns`
  // effectively resulting in [[0, 1, 2], [3, 4, 5], [6, 7]]
  var rows = photos.reduce(function (acc, cell, idx) {
    var row = Math.floor(idx / columns);
    acc[row] = acc[row] ? [].concat(_toConsumableArray(acc[row]), [cell]) : [cell]; // eslint-disable-line no-param-reassign
    return acc;
  }, []);

  // calculate total ratio of each row, and adjust each cell height and width
  // accordingly.
  var currentX = 0;
  var currentY = 0;

  var rowsWithSizes = rows.map(function (row, rowIndex) {
    var totalRatio = row.reduce(function (result, photo) {
      return result + ratio(photo);
    }, 0);
    var height = rowIndex !== rows.length - 1 || row.length > 1 ? // eslint-disable-line
    Math.floor(rowWidth / totalRatio) : Math.floor(rowWidth / columns / totalRatio);

    var newRow = row.map(function (photo, colIndex) {
      var width = colIndex !== row.length - 1 ? // eslint-disable-line
      Math.floor(height * ratio(photo)) // default width calculation
      : row.length === 1 && columns > 1 ? Math.floor(rowWidth / columns * ratio(photo)) // single picture on last row
      : Math.floor(rowWidth - currentX); // fix last cell width to include rounding loss

      var result = {
        photo: photo,
        cell: {
          height: height,
          width: width,
          posX: currentX,
          posY: currentY,
          row: rowIndex,
          column: colIndex
        }
      };

      currentX += width + padding;

      return result;
    });

    currentY += height + padding;
    currentX = 0;

    return newRow;
  });

  var cells = rowsWithSizes.reduce(function (acc, row) {
    return [].concat(_toConsumableArray(acc), _toConsumableArray(row));
  }, []);

  // assign cache so we can compare on re-render
  _cached = { rowWidth: rowWidth, columns: columns, padding: padding, photos: photos, cells: cells };
  return cells;
}

},{}],"react-photo-gallery":[function(require,module,exports){
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

},{"./Gallery":1,"./Photo":2}]},{},[]);
