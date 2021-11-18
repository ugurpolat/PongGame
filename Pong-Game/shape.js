class Shape {
  constructor(width, height, position, speed) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.speed = speed;
  }

  static createElement() {
    const gameZone = document.getElementById("pong-table");

    const stick1 = document.createElement("div");
    const stick2 = document.createElement("div");

    stick1.className = "stick";
    stick1.id = "stick-1";
    stick2.className = "stick";
    stick2.id = "stick-2";

    gameZone.appendChild(stick1);
    gameZone.appendChild(stick2);
  }
}
