class Enemy extends Character {
  constructor(shipSize) {
    //let startingPosition = createVector(random(width), random(height));
    let startingPosition = createVector(width / 2, height - height / 3);
    let startingVelocity = createVector(-0, 0);
    let size = createVector(shipSize * 20, shipSize * 20);
    super(startingPosition, startingVelocity, size);
    this.shipSize = shipSize;
  }

  update(asteroids) {
    let acceleration = this.checkSupproundings(asteroids);

    console.log(acceleration);
    if (acceleration.x == 0 && acceleration.y == 0) {
      this.velocity = createVector(1, 0);
    } else {
      this.velocity = acceleration.mult(2);
      console.log("Check worked");
    }

    super.update(false);
  }

  checkSupproundings(asteroids) {
    let directionToGo = createVector(0, 0);

    for (let curr = 0; curr < asteroids.length; curr++) {
      let temp = asteroids[curr];

      if (
        temp.position.x <= this.position.x - this.shipSize.x &&
        temp.position.x + temp.size.x >= this.position.x - this.shipSize.x * 2
      ) {
        directionToGo.x++;
        console.log("X +");
      }

      if (
        temp.position.x <= this.position.x + this.shipSize.x * 2 &&
        temp.position.x > this.position.x
      ) {
        directionToGo.x--;

        console.log("X -");
      }

      if (
        temp.position.y <= this.position.y - this.shipSize.y &&
        temp.position.y + temp.size.y >= this.position.y - this.shipSize.y * 2
      ) {
        directionToGo.y++;

        console.log("Y +");
      }

      if (
        temp.position.y <= this.position.y + this.shipSize.y * 2 &&
        temp.position.y > this.position.y
      ) {
        directionToGo.y--;

        console.log("Y -");
      }
    }

    return directionToGo;
  }

  display() {
    stroke(255);
    fill(255);
    ellipse(this.position.x, this.position.y, this.size.x, this.size.y);
  }
}
