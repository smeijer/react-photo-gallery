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