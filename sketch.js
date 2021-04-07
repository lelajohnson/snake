
let label = "waiting...";
let flipVideo;
let classifier;
let modelURL = 'https://storage.googleapis.com/tm-models/YadBJmj5/';

function preload() {
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/cUS5BRG6f/' + 'model.json');
}
let snake;
let rez = 1;
let food;
let w;
let h;

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.hide();
  video.size(640, 480);
  flipVideo = ml5.flipImage(video);

  classifyVideo();
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();
}

function classifyVideo() {
  flipVideo = ml5.flipImage(video);
  classifier.classify(flipVideo, gotResults);
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  controlSnake();
  classifyVideo();
}

function controlSnake() {
  if (label === 'Left') {
    snake.setDir(-1, 0);
  } else if (label === 'Right') {
    snake.setDir(1, 0);
  } else if (label === 'Down') {
    snake.setDir(0, 1);
  } else if (label === 'Up') {
    snake.setDir(0, -1);
  }
}

function draw() {
  scale(rez);
  background(220);

  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    print('END GAME');
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);

  image(flipVideo, 0, 0);
  textSize(32);
  fill(255);
  text(label, 10, 50);
}
