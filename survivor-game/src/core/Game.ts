import { Application, Container, Graphics } from "pixi.js";

export class Game {
  public readonly app: Application;
  public readonly world: Container;

  constructor(app: Application) {
    this.app = app;

    this.world = new Container();

    this.app.stage.addChild(this.world);

    this.createOrigin();
  }

  private createOrigin() {
    const point = new Graphics();

    point.circle(0, 0, 8);
    point.fill(0xff0000);

    point.x = this.app.screen.width / 2;
    point.y = this.app.screen.height / 2;

    this.world.addChild(point);
  }
}