import { Container, Graphics } from "pixi.js";

export class Enemy {
  public readonly container: Container;

  private hp: number;

  constructor() {
    this.container = new Container();

    this.hp = 3;

    const body = new Graphics()
      .circle(0, 0, 14)
      .fill(0xff3333);

    this.container.addChild(body);
  }

  public setPosition(x: number, y: number) {
    this.container.position.set(x, y);
  }

  public moveToward(
    targetX: number,
    targetY: number,
    speed: number
  ) {
    const dx = targetX - this.container.x;
    const dy = targetY - this.container.y;

    const distance = Math.hypot(dx, dy);

    if (distance === 0) return;

    this.container.x += (dx / distance) * speed;
    this.container.y += (dy / distance) * speed;
  }

  public takeDamage(amount: number) {
    this.hp -= amount;

    console.log("Enemy HP:", this.hp);
  }

  public isDead(): boolean {
    return this.hp <= 0;
  }
}