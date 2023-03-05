class Character extends Actor {
  constructor(startingPosition, startingVelocity, size, sprite, health) {
    super(startingPosition, startingVelocity, size, sprite, health);
    this.acc = createVector(0, -3);
    this.charRotation = 0;
  }

  rotateShip(newRotation) {
    this.charRotation = newRotation;
  }

  update(isThrusting) {
    if (isThrusting) {
      this.acc.setHeading(this.charRotation - 90);
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
