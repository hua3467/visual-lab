
let textTyped = "Type slow and fast.";
const fontSizes = [textTyped.length];
const minFontSize = 15;
const maxFontSize = 100;
let newFontSize = 0;

let pMillis = 0;
let maxTimeDelta = 5000.0;

let spacing = 2;
const tracking = 0;
let font;


function setup() {
  createCanvas(800, 600);

  font = 'Arial';

  noCursor();
  noStroke();

  // init fontSizes
  for (var i = 0; i < textTyped.length; i++) {
    fontSizes[i] = minFontSize;
  }
}

function draw() {
  background(255);
  textAlign(LEFT);
  fill(0);

  spacing = map(mouseY, 0, height, 0, 120);
  translate(0, 200 + spacing);

  var x = 0;
  var y = 0;
  var fontSize = 20;

  for (var i = 0; i < textTyped.length; i++) {
    // get fontsize for the actual letter from the array
    fontSize = fontSizes[i];
    textFont(font, fontSize);
    var letter = textTyped.charAt(i);
    var letterWidth = textWidth(letter) + tracking;

    if (x + letterWidth > width) {
      // start new line and add line height
      x = 0;
      y += spacing;
    }

    // draw letter
    text(letter, x, y);
    // update x-coordinate for next letter
    x += letterWidth;
  }

  // blinking cursor after text
  var timeDelta = millis() - pMillis;
  newFontSize = map(timeDelta, 0, maxTimeDelta, minFontSize, maxFontSize);
  newFontSize = min(newFontSize, maxFontSize);

  fill(200, 30, 40);
  if (int(frameCount / 10) % 2 == 0) fill(255);
  rect(x, y, newFontSize / 2, newFontSize / 20);
}

function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    fontSizes.push(newFontSize);
  } else if (keyCode == BACKSPACE || keyCode == DELETE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, max(0, textTyped.length - 1));
      fontSizes.pop();
    }
  }
  // reset timer
  pMillis = millis();
}
