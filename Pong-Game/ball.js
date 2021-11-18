class Ball extends Shape {
  constructor(width, height, position, left, topSpeed, leftSpeed) {
    super(width, height, position);
    this.left = left;
    this.topSpeed = topSpeed;
    this.leftSpeed = leftSpeed;

    this.loop();
  }

  createBall() {
    const gameZone = document.getElementById("pong-table");

    const ball = document.createElement("div");

    ball.className = "ball";

    gameZone.appendChild(ball);
  }

  rollBall() {
    let side;

    if (Math.random() < 0.5) {
      side = 1;
    } else {
      side = -1;
    }

    let ballSpeed = Math.random() * 2 + 2;
    this.topSpeed =
      side * (Math.random() * 2 * Math.sqrt(3) - Math.sqrt(3)) * ballSpeed;
    this.leftSpeed = side * ballSpeed;

    this.ballMovement();
  }

  ballMovement() {
    this.position += this.topSpeed;
    this.left += this.leftSpeed;

    // this.checkBoundaries();
    //console.log(this.position, this.left);
  }

  checkBoundaries() {
    if (this.position <= 0 || this.position + this.height >= heightTable) {
      this.topSpeed = -this.topSpeed;
    }
  }

  loop() {
    this.createBall();
    this.rollBall();

    window.setInterval(function move() {
      this.ballMovement();
    }, 1000 / 60);
  }
}
