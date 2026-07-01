import { Container, Graphics } from "pixi.js";

export class Bullet {
  public readonly container: Container;

  private dx = 0;
  private dy = 0;
  private speed = 8;

  constructor(x: number, y: number, targetX: number, targetY: number) {
    this.container = new Container();

    const body = new Graphics()
      .circle(0, 0, 4)
      .fill(0xffff00);

    this.container.addChild(body);

    this.container.position.set(x, y);

    const dx = targetX - x;
    const dy = targetY - y;

    const len = Math.hypot(dx, dy);

    this.dx = (dx / len) * this.speed;
    this.dy = (dy / len) * this.speed;
  }

  public update() {
    this.container.x += this.dx;
    this.container.y += this.dy;
  }
}