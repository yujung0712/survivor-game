import { Container, Graphics } from "pixi.js";

export class Bullet {
  public readonly container: Container;

  private dx = 0;
  private dy = 0;

  private readonly speed = 8;

  constructor(
    x: number,
    y: number,
    targetX: number,
    targetY: number
  ) {
    this.container = new Container();

    const body = new Graphics()
      .circle(0, 0, 4)
      .fill(0xffff00);

    this.container.addChild(body);

    this.container.position.set(x, y);

    const vx = targetX - x;
    const vy = targetY - y;

    const len = Math.hypot(vx, vy);

    if (len !== 0) {
      this.dx = (vx / len) * this.speed;
      this.dy = (vy / len) * this.speed;
    }
  }

  public update() {
    this.container.x += this.dx;
    this.container.y += this.dy;
  }

  // 화면에서 너무 멀어졌는지 확인
  public isOutOfRange(
    playerX: number,
    playerY: number
  ): boolean {
    const dx = this.container.x - playerX;
    const dy = this.container.y - playerY;

    return Math.hypot(dx, dy) > 1000;
  }
}