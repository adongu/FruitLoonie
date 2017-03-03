import Sliceable from './sliceable'

export default class Generate {
  constructor () {

  }

  function generateSliceables () {
    stage.addChild(background)
    circles.forEach( (circle, index) => {
      // set time interval for each Sliceables
      time = index*500
      setTimeout(() => generateSliceable(circle), time)
    });
    stage.update();
  }

  appendSlicables(circle) {
    c = stage.addChild(circle);
    prevPoint = new createjs.Point(circle.x, circle.y);
    createjs.Tween.get(circle)
    .to({guide:{ path:[120, 500, 220, 160, 340, 160, 500, 320, 580, 550] }}, 1000, createjs.Ease.BezierEasing)
    // .to({guide:{ path:[0,480, 220, 300, 390, 160, 500, 320, 640, 480] }}, 1000, createjs.Ease.BezierEasing)
    // .to({ guide:{ path:[300 ,400, 150, 100, 480, 0] }},1000, createjs.Ease.QuinIn)

    // .call( () => createjs.Tween.get(circle).to({ guide:{ path:[300 ,400, 150, 100, 480, 0] }},1000, createjs.Ease.QuinIn));

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);

  }

  BezierEasing (k) {
    // function(t:Number, b:Number, c:Number, d:Number):Number {
    //   var ts:Number=(t/=d)*t;
    //   var tc:Number=ts*t;
    //   return b+c*(0.699999999999999*tc*ts + -1.75*ts*ts + 3.9*tc + -4.1*ts + 2.25*t);
    // }
    let t = (k*100);
    let d = 100;
    let ts=(t/d)*t;
    let tc=ts*t;
    return (0.699999999999999*tc*ts + -1.75*ts*ts + 3.9*tc + -4.1*ts + 2.25*t);
  }
}
