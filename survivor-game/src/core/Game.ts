import { Input } from "../systems/Input";
import { Player } from "../entities/Player";
import { Application, Graphics } from "pixi.js";
import { World } from "./World";
import { Camera } from "./Camera";

export class Game {
  public readonly player: Player;
  public readonly app: Application;
  public readonly world: World;
  public readonly camera: Camera;
  public readonly input: Input;

constructor(app: Application) {
    this.input = new Input();

    
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

    this.app.ticker.add(() => {
    this.update();
});

    this.createOrigin();
}
  private update() {
    const speed = 4;

    let dx = 0;
    let dy = 0;

    if (this.input.isKeyDown("KeyW")) {
        dy -= speed;
    }

    if (this.input.isKeyDown("KeyS")) {
        dy += speed;
    }

    if (this.input.isKeyDown("KeyA")) {
        dx -= speed;
    }

    if (this.input.isKeyDown("KeyD")) {
        dx += speed;
    }

    this.player.move(dx, dy);
}

  private createOrigin() {
    const point = new Graphics()
      .circle(0, 0, 8)
      .fill(0xff0000);

    this.world.add(point);
  }
}