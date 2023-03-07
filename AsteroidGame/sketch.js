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
      lasers.push(new Laser(ship.position, shipRotation));
      break;
  }
}

function keyReleased() {
  shipRotator = 0;
}
