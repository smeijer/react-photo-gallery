import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withContentRect } from 'react-measure';

import Photo, { photoPropType } from './Photo';
import { computeSizes } from './utils';

const styles = {
  gallery: { width: '100%' },
  cell: { display: 'inline-block' },
};

class Gallery extends PureComponent {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, { index }) {
    const { photos, onClick } = this.props;
    if (typeof onClick !== 'function') {
      return;
    }

    onClick(event, {
      index,
      photo: photos[index],
      previous: photos[index - 1] || null,
      next: photos[index + 1] || null,
    });
  }

  render() {
    const { ImageComponent = Photo, measureRef } = this.props;
    const { photos, columns, padding, contentRect: { bounds: { width } } } = this.props;

    if (!width) {
      return <div style={styles.gallery} ref={measureRef} />;
    }

    const thumbs = computeSizes({ width, columns, padding, photos });
    const last = thumbs[thumbs.length - 1];
    const height = last.posY + last.height;

    return (
      <div style={{ ...styles.gallery, height }} ref={measureRef}>
        {thumbs.map((photo, index) => (
          <ImageComponent key={photo.key || photo.src} index={index} photo={photo} onClick={this.handleClick} />
        ))}
      </div>
    );
  }
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(photoPropType).isRequired,
  onClick: PropTypes.func,
  columns: PropTypes.number,
  padding: PropTypes.number,
  ImageComponent: PropTypes.any,
};

Gallery.defaultProps = {
  columns: 3,
  padding: 4,
};

const EnhancedGallery = withContentRect('bounds')(Gallery);
export default EnhancedGallery;
