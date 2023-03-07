let ship;
let shipRotation = 0;
let shipRotator = 0;
let AM;

function setup() {
  createCanvas(400, 400);

  angleMode(RADIANS);
  let startingPosition = createVector(width / 2, height / 2);
  let startingVelocity = createVector(0, 0);
  ship = new Character(startingPosition, startingVelocity, 5);

  AM = new AsteroidManager(5);
}

function draw() {
  background(0);

  shipRotation += shipRotator;

  push();

  AM.update();
  AM.display();

  pop();

  push();

  ship.rotateShip(shipRotation);
  ship.update(mouseIsPressed);
  ship.display();

  pop();
}

function keyPressed() {
  switch (key) {
    case "a":
      shipRotator = -0.1;
      break;

    case "d":
      shipRotator = 0.1;
      break;
  }
}

function keyReleased() {
  shipRotator = 0;
}
