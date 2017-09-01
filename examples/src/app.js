import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'react-photo-gallery';
import { withContentRect } from 'react-measure';
import Lightbox from 'react-images';

import CustomImage from './CustomImage';

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React, { include: /^Gallery|^Photo|^CustomImage/ });
}

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const unsplash = 'https://source.unsplash.com/random';

const noImg = window.location.search.indexOf('no-img=1') > -1;
const photos = Array.from(Array(25)).map((x, idx) => {
  const width = randomBetween(400, 800);
  const height = randomBetween(400, 800);
  const src = `${unsplash}/${width}x${height}`;

  return {
    src: noImg ? `about:blank?${idx}` : src,
    width,
    height,
    title: `Photo ${idx}`,
    alt: `Photo ${idx}`,
    srcSet: noImg
      ? []
      : [
          `${unsplash}/${Math.floor(width * 1.25)}x${Math.floor(height * 1.25)} ${Math.floor(width * 1.25)}w`,
          `${unsplash}/${Math.floor(width * 1.5)}x${Math.floor(height * 1.5)} ${Math.floor(width * 1.5)}w`,
          `${unsplash}/${Math.floor(width * 1.75)}x${Math.floor(height * 1.75)} ${Math.floor(width * 1.75)}w`,
          `${unsplash}/${Math.floor(width * 2)}x${Math.floor(height * 2)} ${Math.floor(width * 2)}w`,
        ],
    sizes: ['(min-width: 480px) 50vw', '(min-width: 1024px) 33.3vw', '100vw'],
  };
});

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentImage: null,
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  openLightbox(event, { index }) {
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  getColumnCount() {
    const { width } = this.props.contentRect.bounds;

    if (width >= 1824) {
      return 4;
    }

    if (width >= 1024) {
      return 3;
    }

    if (width >= 480) {
      return 2;
    }

    return 1;
  }

  render() {
    const { measureRef, photos, contentRect: { bounds: { width } } } = this.props;
    const { currentImage, lightboxIsOpen } = this.state;

    return (
      <div className="App" ref={measureRef}>
        <div style={{ margin: '0 auto', padding: `0 ${width < 600 ? 25 : 130}px`, minWidth: 400, maxWidth: '80%' }}>
          <Gallery
            photos={photos}
            columns={this.getColumnCount()}
            onClick={this.openLightbox}
           // ImageComponent={CustomImage}
          />
        </div>

        <Lightbox
          theme={{ container: { background: 'rgba(0, 0, 0, 0.85)' } }}
          images={photos.map(x => ({ ...x, srcset: x.srcSet, caption: x.title }))}
          backdropClosesModal={true}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={currentImage}
          isOpen={lightboxIsOpen}
          width={1600}
        />
      </div>
    );
  }
}

const EnhancedApp = withContentRect('bounds')(App);

ReactDOM.render(<EnhancedApp photos={photos} />, document.getElementById('app'));
