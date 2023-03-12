class Laser extends Actor {
  constructor(pos, angle, isPlayerLaser) {
    let startingPosition = createVector(pos.x, pos.y);
    let startingVelocity = p5.Vector.fromAngle(angle - HALF_PI);
    let size = createVector(1, 1);
    super(startingPosition, startingVelocity, size);

    this.isPlayerLaser = isPlayerLaser;
    this.health = 180;
  }

  update() {
    this.health--;
    super.update();
  }

  display() {
    stroke(255);

    if (!this.isPlayerLaser) stroke(255, 0, 0);
    strokeWeight(4);
    point(this.position.x, this.position.y);
  }
}
