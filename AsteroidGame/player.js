class Player extends Character {
  constructor(startingPosition, startingVelocity, size, startHealth) {
    super(startingPosition, startingVelocity, size);
    this.health = startHealth;
    this.score = 0;
    this.acc = createVector(0, -3);
    this.scoreCounter = 1;
  }

  teleport() {
    this.position.x = random(width);
    this.position.y = random(height);
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
    stroke(255);
    strokeWeight(1);

    noFill();
    text("Lives Left: " + this.health, 20, 20);
    text("Score: " + this.score, 20, 40);

    translate(this.position.x, this.position.y);
    rotate(this.charRotation);
    triangle(0, 0, -this.size.x / 2, this.size.y, this.size.x / 2, this.size.y);
  }
}
