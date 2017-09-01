import React, { Component } from 'react';
import PropTypes from 'prop-types';

const imgStyle = { verticalAlign: 'bottom' };
const imgStyleWithOnClick = { ...imgStyle, cursor: 'pointer' };

class Photo extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClick, index, photo } = this.props;

    if (typeof onClick === 'function') {
      onClick({ photo, index });
    }
  }

  render() {
    const { photo, onClick } = this.props;
    const style = typeof onClick === 'function' ? imgStyleWithOnClick : imgStyle;

    return <img style={style} {...photo} onClick={this.handleClick} />;
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

Photo.propTypes = {
  index: PropTypes.number,
  onClick: PropTypes.func,
  photo: photoPropType,
};

export default Photo;
