import { Player } from "../entities/Player";
import { Application, Graphics } from "pixi.js";
import { World } from "./World";
import { Camera } from "./Camera";

export class Game {
  public readonly player: Player;
  public readonly app: Application;
  public readonly world: World;
  public readonly camera: Camera;

constructor(app: Application) {
    this.app = app;

    this.world = new World();
    this.camera = new Camera(this.world.container);

    this.app.stage.addChild(this.world.container);

    this.player = new Player();
    this.player.setPosition(0, 0);

    this.world.add(this.player.container);

    this.camera.moveTo(
        0,
        0,
        this.app.screen.width,
        this.app.screen.height
    );

    this.createOrigin();
}
  private createOrigin() {
    const point = new Graphics()
      .circle(0, 0, 8)
      .fill(0xff0000);

    this.world.add(point);
  }
}