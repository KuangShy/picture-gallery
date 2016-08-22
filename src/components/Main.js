require('normalize.css/normalize.css');
require('../styles/App.scss');

import React from 'react';

/*
// 获取图片信息
let imageData = require('json!../data/imageData.json');

// 利用自执行函数， 将图片名信息转成图片URL路径信息
imageData = ((imageDataArr)=> {
  for (let i = 0; i < imageDataArr.length; i++) {
    let singleImageData = imageDataArr[i];
    singleImageData.imageUrl = require('../images/' + singleImageData.fileName);
    imageDataArr[i] = singleImageData;
  }
  return imageDataArr;
})(imageData);
*/

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="image-sec">
        </section>
        <nav className="controller-nav">
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
