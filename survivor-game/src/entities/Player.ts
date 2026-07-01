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

  public setPosition(x: number, y: number) {
    this.container.position.set(x, y);
  }
}