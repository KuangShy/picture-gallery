require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let imageData = require('../data/imageData.json');

function getImageUrl (imageDataArr) {
  for (let i = 0; i < imageDataArr.length; i++) {
    let singleImageData = imageDataArr[i];
    singleImageData.imageUrl = require('../image/singleImageData.fileName');
    imageDataArr[i] = singleImageData;
  }
  return imageDataArr;
}
imageData = getImageUrl(imageData);

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
