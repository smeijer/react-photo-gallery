import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const imgStyle = {
  position: 'absolute',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundColor: '#fff',
  backgroundSize: 'cover',
};

const imgStyleWithOnClick = { ...imgStyle, cursor: 'pointer' };

class Photo extends PureComponent {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { onClick, index, photo } = this.props;

    if (typeof onClick === 'function') {
      onClick(event, { photo, index });
    }
  }

  render() {
    const { photo: { src, width, height, posX, posY }, onClick } = this.props;
    const style = typeof onClick === 'function' ? imgStyleWithOnClick : imgStyle;

    return (
      <div
        style={{ ...style, width, height, transform: `translate(${posX}px, ${posY}px)`, backgroundImage: `url(${src})` }}
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
