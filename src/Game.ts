import Circle from './Circle';

class MousePosition {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Game {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  public isMouseDown: boolean = false;
  public initialMousePosition: MousePosition = new MousePosition(0, 0);
  public mousePosition: MousePosition = new MousePosition(0, 0);
  public draggables: Circle[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  private clearCanvas(): void {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public init(): void {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;
      this.initialMousePosition.x = e.offsetX;
      this.initialMousePosition.y = e.offsetY;
    });

    this.canvas.addEventListener('mouseup', (e) => {
      this.isMouseDown = false;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      this.mousePosition.x = e.offsetX;
      this.mousePosition.y = e.offsetY;
    });

    this.draggables.push(
      new Circle(this, this.ctx, 150, 150, 0, 50),
      new Circle(this, this.ctx, 75, 75, 1, 50)
    );

    this.loop();
  }

  private loop(): void {
    this.clearCanvas();
    this.draggables.forEach((draggable) => draggable.draw());
    window.requestAnimationFrame(this.loop.bind(this));
  }
}

export default Game;
