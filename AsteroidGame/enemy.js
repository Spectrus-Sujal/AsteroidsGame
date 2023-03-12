class Enemy extends Character {
  constructor(saucerSize) {
    //let startingPosition = createVector(random(width), random(height));
    let startingPosition = createVector(width / 2, height - height / 3);
    let startingVelocity = createVector(-0, 0);
    let size = createVector(saucerSize * 20, saucerSize * 20);
    super(startingPosition, startingVelocity, size);
    this.saucerSize = saucerSize;
    this.angle = 0;
    this.cooldown = 180;
  }

  update(asteroids) {
    let acceleration = this.checkSupproundings(asteroids);

    if (acceleration.x == 0 && acceleration.y == 0) {
      this.velocity = createVector(1, 0);
    } else {
      this.velocity = acceleration.mult(2);
      console.log("Check worked");
    }

    super.update(false);
  }

  lookAtPlayer(player) {
    let tempX = this.position.x - player.x;
    let tempY = this.position.y - player.y;
    let tempVec = createVector(tempX, tempY);
    this.angle = atan2(tempVec.y, tempVec.x) - HALF_PI;
  }

  checkSupproundings(asteroids) {
    let directionToGo = createVector(0, 0);

    for (let curr = 0; curr < asteroids.length; curr++) {
      let temp = asteroids[curr];
    }

    return directionToGo;
  }

  display() {
    stroke(255);
    fill(255, 0, 0);
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    triangle(0, 0, this.size.x, this.size.y, -this.size.x, this.size.y);
  }
}
