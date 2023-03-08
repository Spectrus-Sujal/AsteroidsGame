let ship;
let shipRotation = 0;
let shipRotator = 0;
let AM;

let lasers = [];

function setup() {
  createCanvas(400, 400);

  angleMode(RADIANS);
  let startingPosition = createVector(width / 2, height / 2);
  let startingVelocity = createVector(0, 0);
  let size = createVector(10, 20);
  ship = new Player(startingPosition, startingVelocity, size);

  AM = new AsteroidManager(5);
}

function draw() {
  background(0);

  shipRotation += shipRotator;

  push();

  AM.update();
  AM.display();

  for (let i = 0; i < lasers.length; i++) {
    if (AM.checkCollisions(lasers[i].position)) {
      lasers.splice(i, 1);
      i--;
    }
  }

  pop();

  push();

  ship.rotateShip(shipRotation);
  ship.update(mouseIsPressed);
  ship.display();

  pop();

  push();

  for (let i = 0; i < lasers.length; i++) {
    lasers[i].update();
    lasers[i].display();
  }

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

    case "f":
      lasers.push(new Laser(ship.position, shipRotation, true));
      break;
  }
}

function keyReleased() {
  shipRotator = 0;
}
