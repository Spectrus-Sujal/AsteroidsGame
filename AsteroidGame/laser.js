class Laser extends Actor {
  constructor(pos, angle, isPlayerLaser) {
    let startingPosition = createVector(pos.x, pos.y);
    let startingVelocity = p5.Vector.fromAngle(angle - HALF_PI);
    super(startingPosition, startingVelocity, 1);

    this.isPlayerLaser = isPlayerLaser;
  }

  display() {
    stroke(255);
    strokeWeight(4);
    point(this.position.x, this.position.y);
  }
}
