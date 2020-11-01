function Snake() {
  this.size = 1;
  this.body = [];
  this.body.push(chooseInitialPosition());
  this.vel_vec = chooseInitialDirection();
  this.justAte = false;
  this.dead = false;
  this.passDeadToApp = false;
  this.eatAnimationFlag = true;
  this.deathAnimationFlag = true;
  this.deathAnimationFlagCounter = 5;


  this.update = function() {
    // in case the snake still alive
    if (!this.dead) {
      // creating a new, advanced head and checking whether it's inside the borders, if not, kill the snake
      var tmpHead = createVector(this.body[0].x + this.vel_vec.x * scaling_factor, this.body[0].y + this.vel_vec.y * scaling_factor);
      if ((tmpHead.x < 0) || (width <= tmpHead.x) || (tmpHead.y < 0) || (height <= tmpHead.y))
        this.die();
      // in case the snake still alive
      else {
        // moving the array as follows: [][][][]->[], [][][]->[][], [][]->[][][]
        for (var i = 0; i < this.size - 1; i++)
          this.body[this.size - 1 - i] = this.body[this.size - 2 - i];
        // updates the body[0] to be the new head: [+dv][][][][][]
        this.body[0] = tmpHead;
      }
      //console.log('current pos: (' + this.body[0].x + ', ' + this.body[0].y + ')');
      // checking death by collision with it self
      for (var j = 1; j < this.body.length; j++) {
        if (dist(this.body[0].x, this.body[0].y, this.body[j].x, this.body[j].y) < scaling_factor)
          this.die();
      }
    }
  };

  this.show = function() {
    // the snake is alive
    if (!this.dead) {
      fill(255, 247, 0);
      for (var i = 0; i < this.body.length; i++) {
        // eating animation - the first black/white bit when the snake eats
        if (this.justAte === true && i === 0) {
          if (this.eatAnimationFlag)
            fill(0, 0, 0);
          else {
            fill(255, 255, 255);
            this.justAte = false;
          }
          this.eatAnimationFlag = (this.eatAnimationFlag + 1) % 2;
        } else
          fill(255, 247, 0);
        rect(this.body[i].x, this.body[i].y, scaling_factor, scaling_factor);
      }
    }
    // the snake is dead
    // deeath animation - this is the blinking snake on death
    else {
      if (0 < this.deathAnimationFlagCounter) {
        if (this.deathAnimationFlag)
          fill(0, 0, 0);
        else
          fill(255, 255, 255);

        for (var j = 0; j < this.body.length; j++)
          rect(this.body[j].x, this.body[j].y, scaling_factor, scaling_factor);

        this.deathAnimationFlag = (this.deathAnimationFlag + 1) % 2;
        this.deathAnimationFlagCounter--;
      } else
        this.passDeadToApp = true;
    }
  };

  this.eat = function(food) {
    if (dist(this.body[0].x, this.body[0].y, food.pos_vec.x, food.pos_vec.y) < scaling_factor) {
      this.justAte = true;
      food.beenEaten = true;
      refreshDashBoard(this, food);
      this.changeSize(food);
      return true;
    } else
      return false;
  };

  this.changeSize = function(food) {
    switch (food.type) {
      case 'regular':
        this.size++;
        break;
      case 'special':
        break;
      case 'rare':
        if (3 < this.body.length) {
          this.size = this.size - 3;
          this.body.length = this.body.length - 3;
        } else {
          this.size = 1;
          this.body.length = 1;
        }
        break;
    }
    document.getElementById("length").innerHTML = this.size;
  };

  this.die = function() {
    this.dead = true;
    refreshDashBoard(this, null);
    document.getElementById("length").innerHTML = 1;
  };

  this.isDead = function() {
    return this.passDeadToApp;
  };

  this.changeDirection = function(vx, vy) {
    if (vx * this.vel_vec.x === 0 && vy * this.vel_vec.y === 0) {
      this.vel_vec.x = vx;
      this.vel_vec.y = vy;
    }
  };
}

function chooseInitialPosition() {
  return createVector(floor(width / 2), floor(height / 2));
}

function chooseInitialDirection() {
  var v0x, v0y;
  switch (floor(random(4))) { // random movement direction at the beginning
    case 0:
      v0x = 1;
      v0y = 0; // right direction
      break;
    case 1:
      v0x = 0;
      v0y = 1; // down direction
      break;
    case 2:
      v0x = -1;
      v0y = 0; // left direction
      break;
    case 3:
      v0x = 0;
      v0y = -1; // up direction
  }
  return createVector(v0x, v0y);
}

function sleep(milliseconds) {
  var e = new Date().getTime() + (milliseconds);
  while (new Date().getTime() <= e) {}
}
