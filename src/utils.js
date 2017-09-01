export function ratio({ width, height }) {
  return width / height;
}

let _cached;

export function computeSizes({ photos, columns, width: rowWidth, padding }) {
  if (!rowWidth) {
    return [];
  }

  // use cache to prevent double computations, and return same reference
  // to remove avoidable re-renders
  if (
    _cached &&
    _cached.photos === photos &&
    _cached.rowWidth === rowWidth &&
    _cached.columns === columns &&
    _cached.padding === padding
  ) {
    return _cached.cells;
  }

  // divide photos over rows, max cells based on `columns`
  // effectively resulting in [[0, 1, 2], [3, 4, 5], [6, 7]]
  const rows = photos.reduce((acc, cell, idx) => {
    const row = Math.floor(idx / columns);
    acc[row] = acc[row] ? [...acc[row], cell] : [cell]; // eslint-disable-line no-param-reassign
    return acc;
  }, []);

  // calculate total ratio of each row, and adjust each cell height and width
  // accordingly.
  let currentX = 0;
  let currentY = 0;

  const rowsWithSizes = rows.map((row, rowIndex) => {
    const totalRatio = row.reduce((result, photo) => result + ratio(photo), 0);
    const height = (rowIndex !== rows.length - 1 || row.length > 1) // eslint-disable-line
        ? Math.floor(rowWidth / totalRatio)
        : Math.floor(rowWidth / columns / totalRatio);

    const newRow = row.map((photo, colIndex) => {
      const width = (colIndex !== row.length - 1) // eslint-disable-line
          ? Math.floor(height * ratio(photo)) // default width calculation
          : row.length === 1 && columns > 1
            ? Math.floor(rowWidth / columns * ratio(photo)) // single picture on last row
            : Math.floor(rowWidth - currentX); // fix last cell width to include rounding loss

      const result = {
        photo,
        cell: {
          height,
          width,
          posX: currentX,
          posY: currentY,
          row: rowIndex,
          column: colIndex,
        },
      };

      currentX += width + padding;

      return result;
    });

    currentY += height + padding;
    currentX = 0;

    return newRow;
  });

  const cells = rowsWithSizes.reduce((acc, row) => [...acc, ...row], []);

  // assign cache so we can compare on re-render
  _cached = { rowWidth, columns, padding, photos, cells };
  return cells;
}
