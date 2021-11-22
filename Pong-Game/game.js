const gameZone = document.getElementById("pong-table");
const startButton = document.getElementById("start-game");

let ball_id = 0;
let active_balls = [];
let isGameStart = false;
let stickspeedIncrease = 10;
let stickOffset = 20;

const stick1 = new Shape(10, 80, 260, 0, 20);
const stick2 = new Shape(10, 80, 260, 0, 880);

const widthTable = parseInt(
  getComputedStyle(gameZone).getPropertyValue("width")
);
const heightTable = parseInt(
  getComputedStyle(gameZone).getPropertyValue("height")
);

function eventListeners() {
  startButton.addEventListener("click", start);
}

function createBallObject() {
  let ballDimension = parseInt(Math.random() * 30);
  let ball = new Ball("ball" + ball_id.toString(), 10, 10, 300, 450, 10, 0);
  ball_id += 1;
  active_balls.push(ball);
}

function start() {
  startButton.setAttribute("style", "display: none");
  Shape.createStick();
  createBallObject();
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
      createBallObject();
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
  if (stick1.top <= 0) {
    stick1.top = 0;
  }

  if (stick1.top + stick1.height >= heightTable) {
    stick1.top = 520;
  }

  if (stick2.top <= 0) {
    stick2.top = 0;
  }

  if (stick2.top + stick2.height >= heightTable) {
    stick2.top = 520;
  }
}
function loop() {
  window.setInterval(function show() {
    if (isGameStart) {
      stick1.top += stick1.speed;
      stick2.top += stick2.speed;

      stickBoundaries();

      const stick_1 = document.getElementById("stick-1");
      const stick_2 = document.getElementById("stick-2");
      const gameBalls = document.getElementsByClassName(".ball");

      stick_1.setAttribute("style", `top:${parseInt(stick1.top)}px`);
      // stick_2.setAttribute("style", `top:${parseInt(stick2.top)}px`);

      //Clean inactive balls
      for (let i = 0; i < active_balls.length; i++) {
        if (active_balls[i].isBallActive === false) active_balls.splice(i, 1);
      }

      let rightZone = [];
      for (let i = 0; i < active_balls.length; i++) {
        if (active_balls[i].leftSpeed > 0) {
          rightZone.push(active_balls[i]);
        }
      }

      let distanceArray = [];
      for (let i = 0; i < rightZone.length; i++) {
        if (rightZone.length >= 1) {
          let distance = getDistanceBetweenElements(rightZone[i], stick2);
          distanceArray.push(distance);
        }
      }

      let findMinDistance = Math.min(...distanceArray);
      // console.log(findMinDistance);
      let findMinDistanceIndex = distanceArray.indexOf(findMinDistance);
      //console.log(findMinDistanceIndex);
      if (findMinDistanceIndex >= 0) {
        stick_2.setAttribute(
          "style",
          `top:${parseInt(rightZone[findMinDistanceIndex].top * 0.8)}px`
        );
      }
    }
  }, 1000 / 60);
}

function getDistanceBetweenElements(ball, stick) {
  let ballPosition = getElementCenterPosition(ball);
  let stickPosition = getElementCenterPosition(stick);

  return Math.sqrt(
    Math.pow(stickPosition.x - ballPosition.x, 2) +
      Math.pow(stickPosition.y - ballPosition.y, 2)
  );
}

function getElementCenterPosition(element) {
  return {
    x: element.left + element.width / 2,
    y: element.top + element.height / 2,
  };
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
