import React, { PureComponent } from 'react';
import { Photo } from 'react-photo-gallery';

const style = `
  .thumb {
    overflow: hidden;
    position: relative;
  }

  .overlay {
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity .2s linear;
  }
  
  .thumb:hover .overlay {
    opacity: 1;
    background: linear-gradient(transparent 65%, rgba(0,0,0,.35));
  }
  
  .text {
    font-size: 14px;
    color: #fff;
    font-weight: 600;
    min-height: 17px;
    
    position: absolute;
    bottom: 0;
    left: 0;
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 8px 4px;
  }
  
  .title, .attr {
    display: block;
    margin: 2px 0;
    text-shadow: 0 0 2px #000;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    z-index: 2;
  }
  
  .attr {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.7);
    transition: color .15s linear;
  }
  
  .attr:hover {
    color: rgba(255, 255, 255, 1);
  }
`;

const handleClick = (event, data) => {
  console.log('click', data);
};

class CustomImage extends PureComponent {
  render() {
    const { photo } = this.props;

    return (
      <Photo className="thumb" {...this.props} onClick={handleClick}>
        <div className="overlay">
          <div className="text">
            <span className="title">{photo.title}</span>
            <span className="attr">{photo.attr}</span>
          </div>
        </div>

        <style>{style}</style>
      </Photo>
    );
  }
}

export default CustomImage;
