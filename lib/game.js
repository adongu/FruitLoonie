// import Board from "./board";

// class Game {
  let circle, stage;
  function init() {
    // stage.addChild(background);
    stage = new createjs.Stage("boardCanvas");
    let backgroundSrc = new Image();
    backgroundSrc.src = "./assets/background.jpg";

      circle = stage.addChild(new createjs.Shape());
      circle.graphics.beginFill("DeepSkyBlue").drawCircle(50, 50, 50);
      circle.x = 0;
      circle.y = 0;

    backgroundSrc.onload = () => {
      let background = new createjs.Bitmap(backgroundSrc);
      stage.addChild(background, circle);
      stage.update();
    };
    createjs.Ticker.on("tick", tick);
 }

  function tick(event) {
    circle.alpha = 0.2;
    if (circle.hitTest(stage.mouseX, stage.MouseY)) {
      console.log(stage)
      // console.log("Hit?", circle.hitTest(stage.mouseX, stage.MouseY));
      circle.alpha = 1;
      stage.update(event);
    }
  }

  // function handleImageLoad()
  //   // w = stage.canvas.width;
  //   // h = stage .canvas.height;
  //   //
  //   // manifest = [
  //   //   { src: "background.jpg", id: "background" }
    // ]
    //
    // loader = new createjs.LoadQueue(false);
    // loader.addEventListener("complete", handleComplete);
    // loader.loadManifest(manifest, true, '../_assets')

  // does logic of checking being sliced, point system and points, as well as difficulty
  // function handleComplete () {
  //   stage.enableMouseOver();
  //   stage.addChild(background);
  //   stage.update();
  // }

// }

// export Game;
