import React, { Component } from 'react';

class ImageItem extends Component {
  getClassForActive() {
    if (this.props.active) {
      if (this.props.nextActive !== null && this.props.prev) {
        return 'active right';
      } else if (this.props.nextActive !== null && this.props.next) {
        return 'active left';
      } else {
        return 'active';
      }
    } else {
      return '';
    }
  }

  getClassForNext() {
    if (!this.props.active) {
      if (this.props.nextActive === this.props.index && this.props.prev) {
        return `prev ${this.props.direction ? 'right' : ''}`;
      } else if (this.props.nextActive === this.props.index && this.props.next) {
        return `next ${this.props.direction ? 'left' : ''}`;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  render() {
    return (
      <img
        key={this.props.image}
        onLoad={this.props.imageLoaded}
        onError={this.props.imageError}
        src={this.props.image}
        className={`siv-image ${this.props.imageClass ? this.props.imageClass : ''} ${this.getClassForActive()} ${this.getClassForNext()}`}
      />
    );
  }
}

export default ImageItem;
