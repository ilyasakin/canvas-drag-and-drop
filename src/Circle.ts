import Game from './Game';

class Circle {
  public x: number;
  public y: number;
  public z: number;
  private dx: number = 0;
  private dy: number = 0;
  public radius: number;
  private readonly ctx: CanvasRenderingContext2D;
  private game: Game;
  public isGettingDragged: boolean = false;

  constructor(
    game: Game,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    z: number,
    radius: number
  ) {
    this.ctx = ctx;
    this.game = game;
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
  }

  private isMouseInsideThisCircle(mouseX: number, mouseY: number): boolean {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < this.radius;
  }

  private cleanup(): void {
    this.isGettingDragged = false;
    this.dx = 0;
    this.dy = 0;
  }

  public draw(): void {
    this.ctx.beginPath();

    if (!this.game.isMouseDown) {
      this.cleanup();
    }

    if (
      this.game.isMouseDown &&
      !this.isGettingDragged &&
      this.isMouseInsideThisCircle(
        this.game.initialMousePosition.x,
        this.game.initialMousePosition.y
      )
    ) {
      this.isGettingDragged = true;
      this.dy = this.game.initialMousePosition.y - this.y;
      this.dx = this.game.initialMousePosition.x - this.x;
    }

    if (this.game.isMouseDown && this.isGettingDragged) {
      this.x = this.game.mousePosition.x - this.dx;
      this.y = this.game.mousePosition.y - this.dy;
    }

    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
  }
}

export default Circle;
