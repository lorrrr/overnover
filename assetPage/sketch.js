var video;
var cwidth = 500;
var cheight = 281;
var pw = 6;
var ph = 6 * 2;
var pArray = [];
var canvas;
var x, y;

var textArray = [",",
  "DAY",
  "YEAR",
  " AFTER",
  ""
];
var fps = 30;
var capturer = new CCapture({
  format: 'png',
  framerate: fps
});
var imgArray = [];
var video;
var frames = 178;
var mycanvas;

function preload() {
  for (var i = 0; i < frames; i++) {
    imgArray[i] = loadImage("seq2/img" + i + ".png");
  }
}

function setup() {

  mycanvas=createCanvas(windowWidth,windowHeight);
  mycanvas.id("mycanvas");
  frameRate(60);
  background(0);
  for (var i = 0; i < cwidth; i++) {
    pArray[i] = [];
  }
  capturer.start();
}

function draw() {
 translate(-100,-84);
  background(250);
  video = imgArray[frameCount % frames];
  video.loadPixels();
textSize(6);

  /*draw pixels and flag*/
  for (y = 0; y < video.height; y++) {
    for (x = 0; x < video.width; x++) {
      var index = (x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var bright = (r + g + b) / 3;
      noStroke();
      fill(34,56,83)
      rect(x * pw, y * pw, pw, ph - pw);
      if ((bright >= 200)) {
        pArray[x][y] = false; //black
        noStroke();
        fill(240)
        rect(x * pw, y * pw, pw, ph);
      } else {
        pArray[x][y] = true; //white
      }
    }
  }

  /*search*/
  var count = 0;
  for (y = 0; y < video.height; y++) {
    count = 0;
    for (x = 0; x < video.width - 1; x++) {
      if ((pArray[x + 1][y] == pArray[x][y]) & (x < video.width - 1)) {
        count++;
      } else {
        drawText(count, x - count, y + 1, pArray[x][y]);
        count = 0;
      }

    }
  }


  capturer.capture(document.getElementById('mycanvas'));
  // image(video,50,50);
  if (frameCount==178){

    capturer.stop();
    capturer.save();
  }
}



function drawText(count, x, y, color) {

  if (count > 4) {
    drawText(4, x, y, color);
    drawText(count - 4, x + 4, y, color);
    return;
  }
  if (color == true) {
    fill(240)
  } else {
    fill(34,56,83)
  }
  text(textArray[count], x * pw , y * pw -1);

}
//
// function keyTyped() {
//   if (key === 'n') {
//     //saveFrames('out', 'png', 1, 25)
//     capturer.stop();
//     capturer.save();
//   }
//     if (key === 's') {
//     //saveFrames('out', 'png', 1, 25)
//      capturer.start();
//   }
//
// }
