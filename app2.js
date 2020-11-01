var cnvs;
var snake;
var food;
var frameRate_factor = 10;
var scaling_factor = 20;
var highscore = 0;
var score = 0;
var loopFlag = 0;

function setup() {
  cnvs = createCanvas(800, 560);
  centerCanvas();
  frameRate(frameRate_factor);
  snake = new Snake();
  food = new Food(snake);
  document.getElementById("highscore").innerHTML = highscore;
  document.getElementById("score").innerHTML = score;
  document.getElementById("length").innerHTML = snake.body.length;
}

function centerCanvas() {
  cnvs.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

function windowResized() {
  centerCanvas();
}

function draw() {
  background(255, 170, 238);
  if (snake.eat(food)) {
    food.show();
    food = new Food(snake);
  }
  if (snake.isDead()) {
    snake = new Snake();
    food = new Food(snake);
  }
  snake.show();
  snake.update();
  food.show();
}

function refreshDashBoard(snake, food) {
  if (food !== null && food.beenEaten) {
    switch (food.type) {
      case 'regular':
        score += snake.body.length;
        break;
      case 'special':
        score += Math.pow(snake.body.length, 2);
        break;
      case 'rare':
        score += Math.pow(snake.body.length, 3);
        break;
    }
  } else if (snake !== null && snake.dead) {
    score = 0;
  }
  if (highscore < score)
    highscore = score;
  document.getElementById("highscore").innerHTML = highscore;
  document.getElementById("score").innerHTML = score;
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      snake.changeDirection(0, -1);
      break;
    case DOWN_ARROW:
      snake.changeDirection(0, 1);
      break;
    case RIGHT_ARROW:
      snake.changeDirection(1, 0);
      break;
    case LEFT_ARROW:
      snake.changeDirection(-1, 0);
      break;
    case 32:
      if (loopFlag === 0) {
        noLoop();
        loopFlag = 1;
      } else {
        loop();
        loopFlag = 0;
      }
      break;
    case 13:
      for (var i = 0; i < this.snake.body.length; i++) {
        console.log('i = ' + i + ': (' + this.snake.body[i].x + ', ' + this.snake.body[i].y + ')');
      }
      console.log('*************');
      break;
  }
}
