**simple-image-viewer**
=======
An image viewer component for React.js projects
[![npm version](https://badge.fury.io/js/simple-image-viewer.svg)](https://www.npmjs.com/package/simple-image-viewer) [![Dependencies](https://david-dm.org/dharvey0310/simple-image-viewer.svg)](https://david-dm.org/dharvey0310/simple-image-viewer) [![devDependencies Status](https://david-dm.org/dharvey0310/simple-image-viewer/dev-status.svg)](https://david-dm.org/dharvey0310/simple-image-viewer?type=dev)

----------
This is a simple component for viewing images in React Projects. This doesn't handle displaying the images as thumbnails, only displaying the full size images.

Updated with support for navigation using arrow keys and closing the viewer using the esc key.

**0.2.0** Updated to allow navigation via swiping left and right on touch screen devices

Install
-------
---------
**npm**

    npm install simple-image-viewer --save
  
  **yarn**
  

    yarn add simple-image-viewer

Usage
-------
--------

Begin by importing the component & css to your project

```javascript
    // es6 imports
    import ImageViewer from 'simple-image-viewer'
    import 'simple-image-viewer/lib/styles.css'
    
    // CommonJS
    var ImageViewer = require('simple-image-viewer')
    require('simple-image-viewer/lib/styles.css')
```

The simplest usage is to pass an array of images to the ImageViewer along with the index of the image to display first and a function to handle closing the viewer

```javascript
    <ImageViewer images=[image1.jpg, image2.jpg, image3.jpg] index="0" handleClose={this.closeFunction} />
```

You can also map over an array of images to display the thumbnails and use this array to load the image viewer

```javascript
    renderImages(index) {
		<ImageViewer images={this.props.images} index={index} handleClose={this.closeFunction} />
	}
    
    this.props.images.map((i, index) => <img src={i} onClick={() => this.renderImages(index)} />)
```

There are also a number of other props as detailed below to control the look of the component

Props
-------

| Prop        | Type        | Usage                  |
|-------------|-------------|------------------------|
| images      | Array       | An array with the images to display |
| index       | Number      | The position in the array of the image to show first |
| handleClose | Function    | A function to handle the clicking of the close icon  |
| containerClass | String   | An optional css class to use on the overlay container |
| hideArrows | Boolean      | Hides the navigation arrows |
| inverted   | Boolean      | Changes the overlay colour to white and the arrows and close icon to black |
| clear       | Boolean     | Sets the opacity of the overlay to 0 |
| opacity     | Number      | Used to set a custom opacity for the overlay (default is 0.8) |
| imageClass  | String      | An optional css class to apply styles to the image which is displaying |
| imageStyles | Object      | Used to apply inline styles to the image |
| arrowStyles | Object      | Used to apply styles to the navigation arrows |
| closeStyles | Object      | Used to apply styles to the close icon (can be used to change the position of the icon) |
| disableKeyboardNav | Boolean   | Disable navigating the images using the keyboard |