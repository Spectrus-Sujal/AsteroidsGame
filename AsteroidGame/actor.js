class Actor {
  constructor(startingPosition, startingVelocity, size) {
    this.position = startingPosition;
    this.velocity = startingVelocity;
    this.size = size;
  }

  update() {
    this.position.add(this.velocity);
    this.checkEdges();
  }

  checkEdges() {
    let collisionRadius = this.size.x / 4;

    if (this.position.x > width + collisionRadius * 2) {
      this.position.x = collisionRadius;
    } else if (this.position.x < -collisionRadius) {
      this.position.x = width - collisionRadius;
    }

    if (this.position.y > height + collisionRadius * 2) {
      this.position.y = collisionRadius;
    } else if (this.position.y < -collisionRadius) {
      this.position.y = height - collisionRadius;
    }
  }

  checkCollision(pos) {
    let d = dist(this.position.x, this.position.y, pos.x, pos.y);

    return d < this.size.x || d < this.size.y;
  }
}
