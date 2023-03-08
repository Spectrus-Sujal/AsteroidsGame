class Character extends Actor {
  constructor(startingPosition, startingVelocity, size) {
    super(startingPosition, startingVelocity, size);
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
}
