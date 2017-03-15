export default class Animations {
  // selects stage through id

  constructor(stage) {
    this.stage = stage;
    this.strokes = [];

  }

  update() {
    this.stage.mouseMoveOutside = true;
    this.stage.on("stagemousemoove", MouseMove = () => {
      // console.log("stageX/Y: "+evt.stageX+","+evt.stageY) // always in bounds
      // console.log("rawX/Y: "+evt.rawX+","+evt.rawY) // could be < 0, or > width/height
    }
  )}

}
