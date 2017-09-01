import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Photo extends PureComponent {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(next) {
    const { photo, cell } = this.props;

    const photoChanged =
      (next.photo !== photo && next.photo.src !== photo.src) ||
      Object.keys(next.cell).some(p => next.cell[p] !== cell[p]);

    return photoChanged;
  }

  handleClick(event) {
    const { onClick, index, photo, cell } = this.props;

    if (typeof onClick === 'function') {
      onClick(event, { photo, cell, index });
    }
  }

  render() {
    const { photo, cell, index, onClick, ...props } = this.props;

    return (
      <div
        className="react-photo-gallery--photo"
        style={{
          width: cell.width,
          height: cell.height,
          transform: `translate(${cell.posX}px, ${cell.posY}px)`,
          backgroundImage: `url(${photo.src})`,
          cursor: typeof onClick === 'function' ? 'pointer' : 'default',
        }}
        {...props}
        onClick={this.handleClick}
      />
    );
  }
}

export const photoPropType = PropTypes.shape({
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  srcSet: PropTypes.array,
  sizes: PropTypes.array,
});

export const cellPropType = PropTypes.shape({
  posX: PropTypes.number,
  posY: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
});

Photo.propTypes = {
  index: PropTypes.number,
  onClick: PropTypes.func,
  photo: photoPropType,
  cell: cellPropType,
};

export default Photo;
