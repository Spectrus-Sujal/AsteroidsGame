class Enemy extends Character {
  constructor(shipSize) {
    let startingPosition = createVector(random(width), random(height));
    let startingVelocity = createVector(-(5 - shipSize), 5 - shipSize);
    let size = createVector(shipSize * 2, shipSize * 2);
    super(startingPosition, startingVelocity, size);
    this.shipSize = shipSize;
  }

  update(player) {
    let direction = player.getHeading() - HALF_PI;
  }
}
