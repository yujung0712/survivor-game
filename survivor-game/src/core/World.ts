import { Container } from "pixi.js";

export class World {
  public readonly container: Container;

  constructor() {
    this.container = new Container();
  }

  add(child: Container) {
    this.container.addChild(child);
  }
}