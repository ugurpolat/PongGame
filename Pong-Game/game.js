const gameZone = document.getElementById("pong-table");
const startButton = document.getElementById("start-game");

const stick1 = new Shape(10, 80, 260, 0);
const stick2 = new Shape(10, 80, 60, 0);

let isGameStart = false;
let stickspeedIncrease = 10;

function eventListeners() {
  startButton.addEventListener("click", start);
  // document.addEventListener("keydown", move);
  // keyDown();
}

function start() {
  startButton.setAttribute("style", "display: none");
  Shape.createElement();
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

function loop() {
  window.setInterval(function show() {
    if (isGameStart) {
      stick1.position += stick1.speed;
      stick2.position += stick2.speed;

      const stick_1 = document.getElementById("stick-1");
      const stick_2 = document.getElementById("stick-2");

      stick_1.setAttribute("style", `top:${parseInt(stick1.position)}px`);
      stick_2.setAttribute("style", `top:${parseInt(stick2.position)}px`);
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
