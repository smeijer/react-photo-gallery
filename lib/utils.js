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