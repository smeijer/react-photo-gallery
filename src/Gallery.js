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

  handleClick(event, { index, cell }) {
    const { photos, onClick } = this.props;
    if (typeof onClick !== 'function') {
      return;
    }

    onClick(event, {
      index,
      cell,
      photo: photos[index],
      previous: photos[index - 1] || null,
      next: photos[index + 1] || null,
    });
  }

  render() {
    const { ImageComponent = Photo, measureRef, animate = true } = this.props;
    const { photos, columns, padding, contentRect: { bounds: { width } } } = this.props;

    if (!width) {
      return <div style={styles.gallery} ref={measureRef} />;
    }

    const thumbs = computeSizes({ width, columns, padding, photos });
    const last = thumbs[thumbs.length - 1];
    const height = last.cell.posY + last.cell.height;

    return (
      <div className="react-photo-gallery--gallery" style={{ height }} ref={measureRef}>
        {thumbs.map(({ photo, cell }, index) => (
          <ImageComponent key={photo.key || index} index={index} photo={photo} cell={cell} onClick={this.handleClick} />
        ))}

        <style>{`
          .react-photo-gallery--gallery {
            width: 100%;
          }

          .react-photo-gallery--gallery .react-photo-gallery--photo {
            position: absolute;
            background-repeat: no-repeat;
            background-position: center;
            background-color: #fff;
            background-size: cover;
            transition: ${animate ? 'transform' : 'none'} .5s;
            will-change: transform;
          }
        `}</style>
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
