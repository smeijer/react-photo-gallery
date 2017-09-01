import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const updateForProps = ['src', 'width', 'height', 'posX', 'posY'];

class Photo extends PureComponent {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const photoChanged =
      nextProps.photo !== this.props.photo &&
      updateForProps.some(prop => nextProps.photo[prop] !== this.props.photo[prop]);

    return photoChanged;
  }

  handleClick(event) {
    const { onClick, index, photo } = this.props;

    if (typeof onClick === 'function') {
      onClick(event, { photo, index });
    }
  }

  render() {
    const { photo: { src, width, height, posX, posY }, onClick } = this.props;

    return (
      <div
        className="react-photo-gallery--photo"
        style={{
          width,
          height,
          transform: `translate(${posX}px, ${posY}px)`,
          backgroundImage: `url(${src})`,
          cursor: typeof onClick === 'function' ? 'pointer' : 'default',
        }}
        onClick={this.handleClick}
      />
    );
  }
}

export const photoPropType = PropTypes.shape({
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  posX: PropTypes.number,
  posY: PropTypes.number,
  alt: PropTypes.string,
  title: PropTypes.string,
  srcSet: PropTypes.array,
  sizes: PropTypes.array,
});

Photo.propTypes = {
  index: PropTypes.number,
  onClick: PropTypes.func,
  photo: photoPropType,
};

export default Photo;
