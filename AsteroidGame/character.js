class Character extends Actor {
  constructor(startingPosition, startingVelocity) {
    super(startingPosition, startingVelocity);
    this.acc = createVector(0, -3);
    this.charRotation = 0;
  }

  rotateShip(newRotation) {
    this.charRotation = newRotation;
  }

  update(isThrusting) {
    if (isThrusting) {
      this.acc.setHeading(this.charRotation - HALF_PI);
      this.velocity.add(this.acc);
    }

    super.update();
    this.velocity.mult(0.9);
  }

  display() {
    translate(this.position.x, this.position.y);
    rotate(this.charRotation);
    triangle(0, 0, -10, 10, 10, 10);
  }
}
