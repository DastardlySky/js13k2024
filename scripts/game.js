import { init, Sprite, SpriteSheet, Scene, GameLoop, initKeys, keyPressed, Text, collides, loadImage} from "./kontra.js";
import { ARROW_LEFT, ARROW_RIGHT, ARROW_UP, ARROW_DOWN, CHARACTER_SPRITE, BACKGROUND_IMAGE} from "../util/constants.js";

let { canvas, context } = init();
canvas.width = 1586;
canvas.height = 864;

let frames = 0;
let time = 0;

context.imageSmoothingEnabled = false;
let offscreenCanvas = document.createElement('canvas');

let characterSprite = new Image();
characterSprite.src = CHARACTER_SPRITE;

let reiko = Sprite({
  width: 16,
  height: 32,
  x: canvas.width / 2,        
  y: canvas.height / 2,
  dx: 0,
  dy: 0,
  image: characterSprite,
  update(){
    if (keyPressed(ARROW_LEFT)) {
      this.dx = -2;
      this.scaleX = -1;
    } else if (keyPressed(ARROW_RIGHT)) {
      this.dx = +2;
      this.scaleX = 1;
    }

    else{
      this.dx = 0
    }
  
    if (keyPressed(ARROW_UP)) {
      this.dy = -2;  
    }
  
    else if (keyPressed(ARROW_DOWN)) {
      this.dy = +2;  
    }

    else {
      this.dy = 0
    }

    this.advance();
    this.x = Math.max(0, Math.min(this.x, camera.width - this.width));
    this.y = Math.max(0, Math.min(this.y, camera.height - this.height));
  }
});

let camera = Scene({
  id: 'world',
  width: 2000,
  height: 1600,
  x: 0,
  y: 0
});

camera.update = function(){
  reiko.update();

  this.x = Math.max(0, Math.min(reiko.x - (canvas.width / 2), this.width - canvas.width));
  this.y = Math.max(0, Math.min(reiko.y - (canvas.height / 2), this.height - canvas.height));
};

camera.render = function(){
  context.save();

  context.translate(-this.camera.x, -this.camera.y);
  reiko.render();
  
  context.restore();
}

function drawPixelText(context, text, x, y, font, threshold, scalingFactor, wiggle) {
  const canvasWidth = 250;
  const canvasHeight = 32;
  offscreenCanvas.width = canvasWidth;
  offscreenCanvas.height = canvasHeight;
  let d = offscreenCanvas.getContext('2d');
  time +=0.01

  d.font = font;
  d.textBaseline = "middle";
  d.fillText(text, 0, 16);

  let I = d.getImageData(0, 0, canvasWidth, canvasHeight);

  // set fill style
  context.fillStyle = '#001023';
  context.lineWidth = 1;

  let offsetY = 0; // initialize the offsetY variable outside the loop

  for (let i = 0; i < canvasWidth; i++) {
    for (let j = 0; j < canvasHeight; j++) {
      if (
        I.data[(j * canvasWidth + i) * 4 + 1] > threshold ||
        I.data[(j * canvasWidth + i) * 4 + 2] > threshold ||
        I.data[(j * canvasWidth + i) * 4 + 3] > threshold
      ) {
        if (wiggle) {
          // only calculate offsetY if wiggle is true
          offsetY = Math.sin(time + i * 0.06) * 5;
        }
        // draw the pixel with potentially modified offsetY
        context.fillRect(x + i * scalingFactor, y + j * scalingFactor + offsetY, scalingFactor, scalingFactor);
        
      }
    }
  }
}

camera.add(reiko)
let loop = GameLoop({ 

  render: function() { 
    camera.render();
    drawPixelText(context, `${Math.floor(frames / 60)}`, 15, -16, '12px Calibri', 13, 3, true);
  },
  
  update: function() {
    camera.update();
    frames ++;

    if (frames % 60 == 0) {
      zzfx(...[.8,0,-100,,.02,.008,1,,9,2,249,.01,.01,,,,,.55,.02,,392]);
    }

    console.log(frames/60)
  }

});

initKeys(); 
loop.start(); 