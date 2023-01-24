import React, { Component, PropTypes } from 'react';
import ImageItem from './ImageItem.js';
import Swipeable from 'react-swipeable';
import { IoChevronRight, IoChevronLeft, IoCloseRound } from 'react-icons/lib/io';
import loader from 'url?limit=5000&name=loader.svg!./static/default.svg';
import errorImage from 'url?limit=10000&name=error.jpg!./static/404.jpg';

export default class ImageViewer extends Component {
  constructor(props) {
    super(props);

    this.handleTransition = this.handleTransition.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.imageError = this.imageError.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);

    this.listenerAdded;

    this.length = this.props.images.length - 1;
    this.state = { currentIndex: this.props.index, translateValue: 0, opacity: 1, loading: true, transition: 'transform 0.4s ease-out', error: false };
  }

  componentDidMount() {
    if ((!this.props.disableKeyboardNav || !this.props.hideArrows) && this.props.isOpen) {
      if (document) {
        this.listenerAdded = true;
        document.addEventListener('keydown', this.keyPressHandler);
      }
    }
  }

  componentWillUnmount() {
    if (document) {
      document.removeEventListener('keydown', this.keyPressHandler);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.length = this.props.images.length - 1;
  }

  keyPressHandler(e) {
    e.stopPropagation();
    this.handleKeyPress(e.keyCode);
  }

  imageError() {
    this.setState({ loading: false, error: true, translateValue: 0, opacity: 1, transition: 'transform 0.4s ease-out, opacity 0.3s ease-out' });
  }

  imageLoaded() {
    setTimeout(() => this.setState({ loading: false, translateValue: 0, opacity: 1, transition: 'transform 0.4s ease-out, opacity 0.3s ease-out' }), 500);
  }

  handleTransition(direction) {
    if (direction === 'prev' && !this.state.transitionActive && this.state.currentIndex > 0) {
      this.setState((prevState, prevProps) => {
        return { nextIndex: prevState.currentIndex - 1, prev: true, transitionActive: true };
      });

      setTimeout(() => {
        this.setState((prevState, prevProps) => {
          return { direction: true };
        });
      }, 400);

      setTimeout(() => {
        this.setState((prevState, prevProps) => {
          return { nextIndex: null, currentIndex: prevState.nextIndex, prev: false, direction: false, transitionActive: false };
        });
      }, 400);
    } else if (direction === 'next' && !this.state.transitionActive && this.state.currentIndex !== this.length) {
      this.setState((prevState, prevProps) => {
        return { nextIndex: prevState.currentIndex + 1, next: true, transitionActive: true };
      });

      setTimeout(() => {
        this.setState((prevState, prevProps) => {
          return { direction: true };
        });
      }, 400);

      setTimeout(() => {
        this.setState((prevState, prevProps) => {
          return { nextIndex: null, currentIndex: prevState.nextIndex, next: false, direction: false, transitionActive: false };
        });
      }, 400);
    }
  }

  handleKeyPress(keycode) {
    if (keycode === 37) {
      this.handleTransition('prev');
    } else if (keycode === 39) {
      this.handleTransition('next');
    } else if (keycode === 27) {
      this.props.handleClose();
    }
  }

  getContainerStyles() {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: this.props.inverted
        ? `rgba(255,255,255, ${this.props.opacity ? this.props.opacity : 0.8})`
        : this.props.clear ? `rgba(0, 0, 0, 0)` : `rgba(0, 0, 0, ${this.props.opacity ? this.props.opacity : 0.8})`,
      position: 'fixed',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      zIndex: '9998',
    };
  }

  getArrowStyles(arrowDirection) {
    const styles = {
      fontSize: '5em',
      color: this.props.inverted ? '#000000' : '#ffffff',
      cursor: arrowDirection === 'left' && this.state.currentIndex === 0
        ? 'auto'
        : arrowDirection === 'right' && this.state.currentIndex === this.length ? 'auto' : 'pointer',
      opacity: arrowDirection === 'left' && this.state.currentIndex === 0
        ? '0.5'
        : arrowDirection === 'right' && this.state.currentIndex === this.length ? '0.5' : '1',
    };
    if (this.props.arrowStyles) {
      let customStyles = Object.assign(styles, this.props.arrowStyles);
      return customStyles;
    } else {
      return styles;
    }
  }

  getCloseStyles() {
    const styles = {
      position: 'fixed',
      top: '1px',
      right: '1px',
      zIndex: '9999',
      fontSize: '5em',
      color: this.props.inverted ? '#000000' : '#ffffff',
      cursor: 'pointer',
    };
    if (this.props.closeStyles) {
      let customStyles = Object.assign(styles, this.props.closeStyles);
      return customStyles;
    } else {
      return styles;
    }
  }

  getImageStyles() {
    const styles = {
      transform: `translateX(${this.state.translateValue})`,
      transition: this.state.transition,
      opacity: this.state.opacity,
    };
    if (this.props.imageStyles) {
      let customStyles = Object.assign(styles, this.props.imageStyles);
      return customStyles;
    } else {
      return styles;
    }
  }

  render() {
    return (
      <Swipeable onSwipedRight={() => this.handleTransition('prev')} onSwipedLeft={() => this.handleTransition('next')}>
        <div style={this.getContainerStyles()} className={`${this.props.containerClass ? this.props.containerClass : ''}`}>
          {!this.props.hideArrows
            ? <div style={{ position: 'relative', zIndex: '9999' }}>
                <IoChevronLeft onClick={() => this.handleTransition('prev')} style={this.getArrowStyles('left')} />
              </div>
            : null}
          <div
            className="siv-img-container"
            style={this.state.transitionActive || this.props.forceLoadSpinner ? { background: `transparent url(${loader}) center no-repeat` } : {}}>
            {this.props.images.map((image, index) => {
              return (
                <ImageItem
                  key={image}
                  image={image}
                  imageLoaded={this.imageLoaded}
                  imageError={this.imageError}
                  imageClass={this.props.imageClass}
                  active={index === this.state.currentIndex}
                  index={index}
                  prev={this.state.prev}
                  next={this.state.next}
                  nextActive={this.state.nextIndex}
                  direction={this.state.direction}
                />
              );
            })}
          </div>

          {/*<div
            className="siv-img-container"
            style={this.state.loading || this.props.forceLoadSpinner ? { background: `transparent url(${loader}) center no-repeat` } : {}}>
            {!this.state.error
              ? <img
                  onLoad={() => this.imageLoaded()}
                  onError={() => this.imageError()}
                  src={this.props.images[this.state.currentIndex]}
                  className={`image-viewer ${this.props.imageClass ? this.props.imageClass : ''}`}
                  style={this.getImageStyles()}
                />
              : <img src={errorImage} style={this.getImageStyles()} />}
          </div>*/}
          {!this.props.hideArrows
            ? <div style={{ postion: 'relative', zIndex: '9999' }}>
                <IoChevronRight onClick={() => this.handleTransition('next')} style={this.getArrowStyles('right')} />
              </div>
            : null}
        </div>
        {!this.props.hideClose
          ? <div>
              <IoCloseRound style={this.getCloseStyles()} onClick={() => this.props.handleClose()} />
            </div>
          : null}
      </Swipeable>
    );
  }
}

ImageViewer.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  handleClose: PropTypes.func,
  disableKeyboardNav: PropTypes.bool,
  hideArrows: PropTypes.bool,
  inverted: PropTypes.bool,
  opacity: PropTypes.number,
  clear: PropTypes.bool,
  arrowStyles: PropTypes.object,
  closeStyles: PropTypes.object,
  imageStyles: PropTypes.object,
  containerClass: PropTypes.string,
  imageClass: PropTypes.string,
  hideClose: PropTypes.bool,
  pagingFunction: PropTypes.func,
};
