class Enemy extends Character {
  constructor(saucerSize) {
    //let startingPosition = createVector(random(width), random(height));
    let startingPosition = createVector(random(width), random(height));
    let startingVelocity = createVector(2, 2);
    let size = createVector(saucerSize * 10, saucerSize * 10);
    super(startingPosition, startingVelocity, size);
    this.saucerSize = saucerSize;
    this.charRotation = 0;
    this.cooldown = 180;

    this.thrusters = [4];
    this.thrusters[0] = createVector(-1, -1);
    this.thrusters[1] = createVector(1, -1);
    this.thrusters[2] = createVector(-1, 1);
    this.thrusters[3] = createVector(1, 1);
  }

  lookAtPlayer(player) {
    let tempX = this.position.x - player.x;
    let tempY = this.position.y - player.y;
    let tempVec = createVector(tempX, tempY);
    this.angle = atan2(tempVec.y, tempVec.x) - HALF_PI;
  }

  update() {
    console.log(this.position + "Before");
    console.log(this.velocity + "velocity");
    super.update();
    console.log(this.position + "After");
  }

  checkSurroundings(asteroids) {
    let thrusters = [0, 0, 0, 0];

    for (let i = 0; i < asteroids.length; i++) {
      let temp = asteroids[i];

      let distance = dist(
        this.position.x,
        this.position.y,
        temp.position.x,
        temp.position.y
      );

      if (
        distance <= (temp.r + this.size.x) * 2 ||
        distance <= (temp.r + this.size.y) * 2
      ) {
        if (temp.position.x < this.position.x) {
          thrusters[0]--;
          thrusters[2]--;
        }

        if (temp.position.x > this.position.x) {
          thrusters[1]--;
          thrusters[3]--;
        }

        if (temp.position.y < this.position.y) {
          thrusters[0]--;
          thrusters[1]--;
        }

        if (temp.position.y > this.position.y) {
          thrusters[2]--;
          thrusters[3]--;
        }

        let biggest = 0;

        for (let j = 0; j < thrusters.length; j++) {
          if (thrusters[j] > thrusters[biggest]) {
            biggest = j;
          }

          console.log(thrusters[j]);
        }

        this.velocity = this.thrusters[biggest];
        return;
      }
    }
  }

  display() {
    push();
    stroke(255);
    fill(255, 0, 0);
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    triangle(0, 0, this.size.x / 2, this.size.y, -this.size.x / 2, this.size.y);
    pop();
  }
}
