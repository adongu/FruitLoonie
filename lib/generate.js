function curveGenerate () {
  var stage;
var prevPoint, dataProvider, rect = new createjs.Rectangle(20,20,700,360);
var bar, container, currentClip;
var selectedFunction, selectedItem, selectedIndex = 0;
var resetRunning = false, startTimeout;
var clips = [];
var activeTween;
function init() {
  stage = new createjs.Stage("testCanvas");
  var Ease = createjs.Ease; // shortcut.
  dataProvider = [
    {type: "divider", label: "Ease Equations"},
    {type: Ease.backIn, label: "backIn"},
    {type: Ease.backInOut, label: "backInOut"},
    {type: Ease.backOut, label: "backOut"},
    {type: Ease.bounceIn, label: "bounceIn"},
    {type: Ease.bounceInOut, label: "bounceInOut"},
    {type: Ease.bounceOut, label: "bounceOut"},
    {type: Ease.circIn, label: "circIn"},
    {type: Ease.circInOut, label: "circInOut"},
    {type: Ease.circOut, label: "circOut"},
    {type: Ease.cubicIn, label: "cubicIn"},
    {type: Ease.cubicInOut, label: "cubicInOut"},
    {type: Ease.cubicOut, label: "cubicOut"},
    {type: Ease.elasticIn, label: "elasticIn"},
    {type: Ease.elasticInOut, label: "elasticInOut"},
    {type: Ease.elasticOut, label: "elasticOut"},
    {type: Ease.linear, label: "linear/none"},
    {type: Ease.quadIn, label: "quadIn"},
    {type: Ease.quadInOut, label: "quadInOut"},
    {type: Ease.quadOut, label: "quadOut"},
    {type: Ease.quartIn, label: "quartIn"},
    {type: Ease.quartInOut, label: "quartInOut"},
    {type: Ease.quartOut, label: "quartOut"},
    {type: Ease.quintIn, label: "quintIn"},
    {type: Ease.quintInOut, label: "quintInOut"},
    {type: Ease.quintOut, label: "quintOut"},
    {type: Ease.sineIn, label: "sineIn"},
    {type: Ease.sineInOut, label: "sineInOut"},
    {type: Ease.sineOut, label: "sineOut"},
    {type: "divider", label: "Custom Eases"},
    {type: Ease.getBackIn(2.5), label: "getBackIn"},
    {type: Ease.getBackInOut(2.5), label: "getBackInOut"},
    {type: Ease.getBackOut(2.5), label: "getBackOut"},
    {type: Ease.getElasticIn(2, 5), label: "getElasticIn"},
    {type: Ease.getElasticInOut(2, 5), label: "getElasticInOut"},
    {type: Ease.getElasticOut(2, 5), label: "getElasticOut"},
    {type: Ease.getPowIn(2.5), label: "getPowIn"},
    {type: Ease.getPowInOut(20.5), label: "getPowInOut"},
    {type: Ease.getPowOut(2.5), label: "getPowOut"}
  ];
  var eases = document.getElementById("eases");
  var cloneElement = document.createElement("a");
  cloneElement.href = "#";
  for (var i = 0, l = dataProvider.length; i < l; i++) {
    var item = dataProvider[i];
    if (item.type == "divider") {
      element = document.createElement("span");
      element.innerHTML = item.label;
      eases.appendChild(element);
      continue;
    }
    var element = cloneElement.cloneNode(true);
    element.id = i;
    element.onclick = selectItem;
    element.innerHTML = item.label;
    eases.appendChild(element);
    if (item.label == "linear") {
      selectedItem = element;
      element.className = "selected";
    }
  }
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", tick);
  prevPoint = new createjs.Point(rect.x, rect.y);
  container = stage.addChild(new createjs.Container());
  bar = container.addChild(new createjs.Shape()
                   .set({alpha:0.7, x:rect.x, y:rect.y}));
  bar.graphics.f("#000").setStrokeStyle(1)
      .drawRect(-2, 0, 4, 15)
      .drawRect(-2, rect.height-15, 4, 15)
      .setStrokeStyle(1)
      .beginFill("#000")
      .drawRect(-1, 15, 2, rect.height-15*2);
  var bounds = container.addChild(new createjs.Shape()
                      .set({alpha:0.7, x:0.5, y:0.5}));
  bounds.graphics.setStrokeStyle(1)
      .beginStroke("#000")
      .drawRect(rect.x, rect.y, rect.width, rect.height);
  stage.update();
  startTimeout = setTimeout(run, 1000);
}
function stop() {
  Ticker.off("tick", tick);
}
function selectItem() {
  clearTimeout(startTimeout);
  if (clips.length > 0) { fade(); }
  if (selectedItem != null && selectedItem != this) {
    selectedItem.className = "";
  }
  selectedItem = this;
  selectedIndex = this.id;
  selectedItem.className = "selected";
  selectedFunction = dataProvider[selectedIndex].type;
  resetRunning = true;
  createjs.Tween.get(bar, {override: true}).to({x: rect.x}, 500).call(resetComplete);
  return false;
}
function run(easeType) {
  currentClip = stage.addChild(new createjs.Shape());
  clips.push(currentClip);
  prevPoint.setValues(rect.x, rect.y);
  activeTween = createjs.Tween.get(bar, {override: true}).to({x: rect.x+rect.width}, 1500, easeType).call(tweenComplete);
}
function tweenComplete () {
  currentClip = null;
}
function resetComplete() {
  bar.x = rect.x;
  resetRunning = false;
  currentClip = null;
  prevPoint.setValues(rect.x, rect.y);
  run(selectedFunction);
}
function tick(event) {
  if (!resetRunning && currentClip != null) {
    var hue = (selectedIndex / dataProvider.length) * 360;
    var g = currentClip.graphics
        .setStrokeStyle(1, "round", "round")
        .beginStroke(createjs.Graphics.getHSL(hue, 50, 50))
        .moveTo(prevPoint.x, prevPoint.y);
    prevPoint.x = bar.x;
    prevPoint.y = rect.x+ activeTween.position/1500 * rect.height;
    g.lineTo(prevPoint.x, prevPoint.y)
        .beginStroke(createjs.Graphics.getHSL(hue, 100, 50))
        .beginFill(createjs.Graphics.getHSL(hue, 100, 50))
        .drawCircle(prevPoint.x, prevPoint.y, 2)
        .endFill();
    stage.update(event);
  } else if (resetRunning) {
    stage.update(event);
  }
}
function fade() {
  for (var i = 0; i < clips.length; i++) {
    var clip = clips[i];
    createjs.Tween.get(clip, {override: true})
        .to({alpha: clip.alpha - 0.4}, 1000)
        .call(fadeTweenComplete);
  }
}
function fadeTweenComplete(tween) {
  var clip = tween._target;
  if (clip.alpha <= 0) {
    stage.removeChild(clip);
    var index = clips.indexOf(clip);
    clips.splice(index, 1);
  }
}

}
