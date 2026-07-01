import { Container, Graphics } from "pixi.js";

export class Player {
  public readonly container: Container;

  constructor() {
    this.container = new Container();

    const body = new Graphics()
      .circle(0, 0, 16)
      .fill(0x3399ff);

    this.container.addChild(body);
  }


  public get x(): number {
  return this.container.x;
}

public get y(): number {
  return this.container.y;
}

  public setPosition(x: number, y: number) {
    this.container.position.set(x, y);
  }

  public move(dx: number, dy: number) {
    this.container.x += dx;
    this.container.y += dy;
}
}
