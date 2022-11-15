import './style.css';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = 300;
canvas.height = 300;

class Circle {
  x: number;
  y: number;
  radius: number;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }
}

let isMouseDown = false;
let isMouseDownInsideCircle = false;
let mousePosition = { x: 0, y: 0 };
let initialMousePosition = { x: 0, y: 0 };
let x = 150;
let y = 150;
let dx = 0;
let dy = 0;
const circle = new Circle(x, y, 50);

const isMouseInsideCircle = (mouseX: number, mouseY: number) => {
  dx = mouseX - circle.x;
  dy = mouseY - circle.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < circle.radius;
};

const loop = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (
    isMouseDown &&
    !isMouseDownInsideCircle &&
    isMouseInsideCircle(initialMousePosition.x, initialMousePosition.y)
  ) {
    isMouseDownInsideCircle = true;
  }

  if (isMouseDown && isMouseDownInsideCircle) {
    x = mousePosition.x - dx;
    y = mousePosition.y - dy;
  }

  circle.x = x;
  circle.y = y;

  circle.draw();

  window.requestAnimationFrame(loop);
};

window.requestAnimationFrame(loop);

canvas.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  initialMousePosition.x = e.offsetX;
  initialMousePosition.y = e.offsetY;
});

canvas.addEventListener('mouseup', (e) => {
  isMouseDown = false;
  isMouseDownInsideCircle = false;
});

canvas.addEventListener('mousemove', (e) => {
  mousePosition = { x: e.offsetX, y: e.offsetY };
});
