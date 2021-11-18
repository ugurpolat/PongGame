const gameZone = document.getElementById("pong-table");
const startButton = document.getElementById("start-game");

const stick1 = new Shape(10, 80, 260, 0);
const stick2 = new Shape(10, 80, 60, 0);
let ball;
const widthTable = parseInt(
  getComputedStyle(gameZone).getPropertyValue("width")
);
const heightTable = parseInt(
  getComputedStyle(gameZone).getPropertyValue("height")
);

let balls = [];
let isGameStart = false;
let stickspeedIncrease = 10;

function eventListeners() {
  startButton.addEventListener("click", start);
}

function start() {
  startButton.setAttribute("style", "display: none");
  Shape.createStick();
  ball = new Ball(10, 10, 300, 450, 10, 0);
  balls.push(ball);
  isGameStart = true;
}

function keyDown() {
  document.addEventListener("keydown", function (e) {
    let key = e.key;

    if (key === "ArrowUp") {
      stick1.speed = -stickspeedIncrease;
    } else if (key === "ArrowDown") {
      stick1.speed = stickspeedIncrease;
    } else if (key === "W" || key === "w") {
      stick2.speed = -stickspeedIncrease;
    } else if (key === "S" || key === "s") {
      stick2.speed = stickspeedIncrease;
    } else if (key === " ") {
      let ball = new Ball(10, 10, 300, 450, 10, 0);
      balls.push();
    }
  });
}

function keyUp() {
  document.addEventListener("keyup", function (e) {
    let key = e.key;

    if (key === "ArrowUp") {
      stick1.speed = 0;
    } else if (key === "ArrowDown") {
      stick1.speed = 0;
    } else if (key === "W" || key === "w") {
      stick2.speed = 0;
    } else if (key === "S" || key === "s") {
      stick2.speed = 0;
    }
  });
}

function stickBoundaries() {
  if (stick1.position <= 0) {
    stick1.position = 0;
  }

  if (stick1.position + stick1.height >= heightTable) {
    stick1.position = 520;
  }

  if (stick2.position <= 0) {
    stick2.position = 0;
  }

  if (stick2.position + stick2.height >= heightTable) {
    stick2.position = 520;
  }
}
function loop() {
  window.setInterval(function show() {
    if (isGameStart) {
      stick1.position += stick1.speed;
      stick2.position += stick2.speed;

      stickBoundaries();

      const stick_1 = document.getElementById("stick-1");
      const stick_2 = document.getElementById("stick-2");

      stick_1.setAttribute("style", `top:${parseInt(stick1.position)}px`);
      stick_2.setAttribute("style", `top:${parseInt(stick2.position)}px`);

      for (let i = 0; i <= balls.length; i++) {
        const balls = document.querySelectorAll(".ball");

        balls.forEach(function name(ball) {
          ball.setAttribute("style", `top:${parseInt(ball.position)}px`);
          ball.setAttribute("style", `left:${parseInt(ball.left)}px`);
        });
        // balls[i].setAttribute("style", `top:${parseInt(balls[i].position)}px`);
        // balls[i].setAttribute("style", `left:${parseInt(balls[i].left)}px`);
      }
    }
  }, 1000 / 60);
}

function setEvents() {
  eventListeners();
  keyDown();
  keyUp();
}

function startGame() {
  setEvents();
  loop();
}

startGame();
