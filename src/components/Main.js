require('normalize.css/normalize.css');
require('../styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

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

function getRangeRandom(low, height) {
  let random = Math.floor(Math.random() * (height - low + 1)) + low;
  return random;
}
class ImgFigureComponent extends React.Component {
  render() {
    let styleObj = {};
    // 如果props属性中指定了这张图片的位置,则使用
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    return (
      <figure className="img-figure" style={styleObj}>
        <img src={this.props.data.imageUrl} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
}
class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.Constant = {
      centerPos: {
        left: 0,
        top: 0
      },
      hPosRange: { // 水平
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: { // 垂直
        x: [0, 0],
        topY: [0, 0]
      }
    };
    this.state = {
      imgsArrangeArr: []
    }
  }
  /**
   *  重新排布所有图片
   *  @param centerIndex 指定居中排布哪个图片
   */
  rearrange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr;
    let constant = this.Constant;
    let centerPos = constant.centerPos;
    let hPosRange = constant.hPosRange;
    let vPosRange = constant.vPosRange;
    let hPosRangeLeftSecX = hPosRange.leftSecX;
    let hPosRangeRightSecX = hPosRange.rightSecX;
    let hPosRangeY = hPosRange.y;
    let vPosrangeTopY = vPosRange.topY;
    let vPosrangeX = vPosRange.x;

    // 居中centerIndex的图片
    let imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
    imgsArrangeCenterArr[0].pos = centerPos;
    // 上面取一个或者不取
    let imgsAarrangeTopArr = [];
    let topImgNum = Math.floor(Math.random() * 2);
    let topImgSpliceIndex = 0;
    // 取出要布局上侧的图片的状态信息
    if (topImgNum) {
      topImgSpliceIndex = Math.floor(Math.random() * imgsArrangeArr.length - topImgNum);
      imgsAarrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
      imgsAarrangeTopArr.forEach(function (value) {
        value.pos = {
          left: getRangeRandom(vPosrangeX[0],vPosrangeX[1]),
          top: getRangeRandom(vPosrangeTopY[0],vPosrangeTopY[1])
        }
      })
    }

    // 布局左右两侧图片
    imgsArrangeArr.forEach(function (value, index) {
      let hPosRangeLeftOrRightX = null;

      // 分布左右两边
      if (index < imgsArrangeArr.length / 2) {
        hPosRangeLeftOrRightX = hPosRangeLeftSecX;
      } else {
        hPosRangeLeftOrRightX = hPosRangeRightSecX;
      }
      value.pos = {
        left: getRangeRandom(hPosRangeLeftOrRightX[0],hPosRangeLeftOrRightX[1]),
        top: getRangeRandom(hPosRangeY[0],hPosRangeY[1])
      }
    })

    // 合并,先插入上边,再插入中间
    if (imgsAarrangeTopArr && imgsAarrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsAarrangeTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
    // 重新渲染
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    })
  }

  // 组件加载以后，为每张图片计算位置范围
  componentDidMount() {
    // 获取舞台大小
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage);
    let stageW = stageDOM.scrollWidth;
    let stageH = stageDOM.scrollHeight;
    let halfStageW = Math.floor(stageW / 2);
    let halfStageH = Math.floor(stageH / 2);
    // 获取imgFigure的大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0);
    let imgW = imgFigureDOM.scrollWidth;
    let imgH = imgFigureDOM.scrollHeight;
    let halfImgW = Math.floor(imgW / 2);
    let halfImgH = Math.floor(imgH / 2);

    // 计算中心图片的位置点
    this.Constant.centerPos.left = halfStageW - halfImgW,
    this.Constant.centerPos.top = halfStageH - halfImgH

    // 计算左侧右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgW;

    // 计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - halfImgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    this.rearrange(0);
  }

  render() {
    let controllerUnits = [];
    let imgFigures = [];
    let _self = this;
    imageData.forEach(function (value, index) {
      if(!_self.state.imgsArrangeArr[index]) {
        _self.state.imgsArrangeArr[index] = {
          pos: {
            left: 123,
            top: 111
          }
        }
      }
      imgFigures.push(<ImgFigureComponent key={'imgFigure' + index} data={value} ref={'imgFigure' + index} arrange={_self.state.imgsArrangeArr[index]}/>)
    });
    return (
      <section className="stage" ref="stage">
        <section className="image-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
