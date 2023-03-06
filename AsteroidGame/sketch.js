let ship;
let shipRotation = 0;
let shipRotator = 0;
let AM;

function setup() {
  createCanvas(400, 400);

  angleMode(DEGREES);
  let startingPosition = createVector(width / 2, height / 2);
  let startingVelocity = createVector(0, 0);
  let spriteSize = 5;
  let sprite = 5;
  let health = 5;
  ship = new Character(
    startingPosition,
    startingVelocity,
    spriteSize,
    sprite,
    health
  );

  AM = new AsteroidManager(5, 5);
}

function draw() {
  background(0);

  shipRotation += shipRotator;

  AM.update();
  //AM.display();

  push();

  ship.rotateShip(shipRotation);
  ship.update(mouseIsPressed);
  ship.display();

  pop();
}

function keyPressed() {
  switch (key) {
    case "a":
      shipRotator = -5;
      break;

    case "d":
      shipRotator = 5;
      break;
  }
}

function keyReleased() {
  shipRotator = 0;
}
