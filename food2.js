function Food(snake) {
  this.pos_vec = PickNewFoodLocation(snake);
  this.beenEaten = false;
  this.flipflop = true;
  this.flipflopCount = 2;
  this.specialFoodProb = 9.3;
  this.rareFoodProb = 9.8;

  // decide which type of food it is
  this.rnd = random(10);
  if (this.rnd < this.specialFoodProb)
    this.type = 'regular';
  else if (this.rnd < this.rareFoodProb)
    this.type = 'special';
  else
    this.type = 'rare';

  this.show = function() {
    switch (this.type) {
      case 'regular':
        fill(153, 255, 255);
        break;
      case 'special':
        fill(51, 51, 255);
        break;
      case 'rare':
        fill(204, 0, 204);
        break;
    }
    rect(this.pos_vec.x, this.pos_vec.y, scaling_factor, scaling_factor);
  };
}

function PickNewFoodLocation(snake) {
  var new_pos_vec;
  var doAgain;
  do {
    doAgain = false;
    new_pos_vec = createVector(floor(random(floor(width / scaling_factor))) * scaling_factor, floor(random(floor(height / scaling_factor))) * scaling_factor);
    if (snake !== null) {
      // checking if the food is created on top of the snake's arrays
      for (var i = 0; i < snake.body.length; i++) {
        if (new_pos_vec.x === snake.body[i].x && new_pos_vec.y === snake.body[i].y) {
          doAgain = true;
        }
      }
    }
  } while (doAgain);
  return new_pos_vec;
}
