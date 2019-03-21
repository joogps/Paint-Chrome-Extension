var s = function(sketch) {
  var width = document.body.clientWidth;
  var height = document.body.clientHeight;
  var canvas;

  var strokeColor = sketch.color(0, 0, 0);
  var strokeW = 4;

  var colors = {
    black: sketch.color(0),
    white: sketch.color(255),
    red: sketch.color(255, 0, 0),
    green: sketch.color(0, 255, 0),
    blue: sketch.color(0, 0, 255),
    purple: sketch.color(142, 0, 255),
    pink: sketch.color(255, 0, 198),
    orange: sketch.color(255, 143),
    yellow: sketch.color(255, 255, 0)
  }

  var drawing = false;

  sketch.mouseDragged = function() {
    if(canvas){
      sketch.stroke(strokeColor);
      sketch.strokeWeight(strokeW);
      if (sketch.mouseButton == sketch.LEFT && drawing) {
        sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
        canvas.style("pointer-events", "none");
        document.body.style["userSelect"] = "none";
      }

      if(!drawing){
        canvas.style("pointer-events", "auto");
        document.body.style["userSelect"] = "auto";
      }
    }
  }

  function update(message, sender, sendResponse){
    var colorKeys = showObject(colors);
    if(colorKeys.includes(message.txt)){
      strokeColor = colors[message.txt];
      if(!drawing){
        drawing = true;
        canvas = sketch.createCanvas(width, height);
        canvas.position(0, 0);
        canvas.style("z-index", "99999999");
        sketch.clear();
      }
    }
    else if(message.txt == "clear"){
      sketch.clear();
      if(drawing){
        drawing = false;
        canvas = sketch.noCanvas();
      }
    }
  }

  chrome.runtime.onMessage.addListener(update);
};

var myp5 = new p5(s);

function showObject(object) {
  var result = [];
  for (var property in object) {
    if(object.hasOwnProperty(property)){
      result.push(property);
    } 
  }              
  return result;
}