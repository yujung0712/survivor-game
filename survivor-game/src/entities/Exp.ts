import { Container, Graphics } from "pixi.js";

export class Exp {
  public readonly container: Container;

  constructor(x: number, y: number) {
    this.container = new Container();

    const body = new Graphics()
      .circle(0, 0, 5)
      .fill(0x00ff88);

    this.container.addChild(body);

    this.container.position.set(x, y);
  }
}