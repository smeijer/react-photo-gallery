export function ratio({ width, height }) {
  return width / height;
}

export function computeSizes({ photos, columns, width: rowWidth, padding }) {
  if (!rowWidth) {
    return [];
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

    const newRow = row.map((photo, idx) => {
      const width = (idx !== row.length - 1 || row.length === 1) // eslint-disable-line
        ? Math.floor(height * ratio(photo))
        : rowWidth - currentX; // fix last cell width to include rounding loss

      const cell = {
        ...photo,
        height,
        width,
        posX: currentX,
        posY: currentY,
      };

      currentX += width + padding;

      return cell;
    });

    currentY += height + padding;
    currentX = 0;

    return newRow;
  });

  return rowsWithSizes.reduce((acc, row) => [...acc, ...row], []);
}
