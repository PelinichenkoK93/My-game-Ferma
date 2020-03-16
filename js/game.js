let canvas = document.getElementById("game");
let context = canvas.getContext("2d");

let scoreCowMilk = 0;
let wheat = [];
let eat = [];
let timer = 0;
let box = 80;
let cow = { x: 300, y: 200 };

let bg = new Image();
bg.src = "img/bg.png";

let wheatImg = new Image();
wheatImg.src = "img/wheat.png";

let eatingImg = new Image();
eatingImg.src = "img/eat.png";

let cowImg = new Image();
cowImg.src = "img/cow.png";

canvas.addEventListener("mousemove", function(event) {
  cow.x = event.offsetX - 25;
  cow.y = event.offsetY - 13;
});

bg.onload = function() {
  game();
};

function game() {
  update();
  render();
  requestAnimationFrame(game);
}

function update() {
  timer++;
  if (true) {
    wheat.push({
      x: Math.floor(Math.random() * 100) * box,
      y: Math.floor(Math.random() * 100) * box,
      dx: Math.floor(Math.random() * 0) * box,
      dy: Math.floor(Math.random() * 0) * box,
      del: 0
    });
  }

  if (timer % 30 == 0) {
    eat.push({ x: cow.x, y: cow.y, dx: 0, dy: -5 });
  }

  for (i in eat) {
    eat[i].x = eat[i].x + eat[i].dx;
    eat[i].y = eat[i].y + eat[i].dy;

    if (eat[i].y <-30) eat.splice(i, 1);
  }

  for (i in wheat) {
    wheat[i].x = wheat[i].x + wheat[i].dx;
    wheat[i].y = wheat[i].y + wheat[i].dy;

    if (wheat[i].x >= 640 || wheat[i].x < 0) wheat[i].dx = -wheat[i].dx;
    if (wheat[i].y >= 640 || wheat[i].y < 0) wheat[i].dy = -wheat[i].dy;

    for (j in eat) {
      if (
        Math.abs(wheat[i].x + 37.5 - eat[j].x - 37.5) < 75 &&
        Math.abs(wheat[i].y - eat[j].y) < 37.5
      ) {
        wheat[i].del = 1;
        eat.splice(j, 1);
        scoreCowMilk ++;
        break;
      }
    }
    if (wheat[i].del == 1) wheat.splice(i, 1);
  }
}

function render() {
  context.drawImage(bg, 0, 0, 640, 640);
  context.drawImage(cowImg, cow.x, cow.y);

  for (i in eat) context.drawImage(eatingImg, eat[i].x, eat[i].y, 30, 30);

  for (i in wheat) context.drawImage(wheatImg, wheat[i].x, wheat[i].y, 75, 75);

  context.fillStyle = "red";
  context.font = "20px Roboto";
  context.fillText(scoreCowMilk, box * 3.5, box * 7.9);
  context.fillText("Количество литров молока:", box * 0, box * 7.9);
}

let requestAnimationFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 20);
    }
  );
})();
