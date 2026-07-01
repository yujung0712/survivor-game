import { Container, Graphics } from "pixi.js";

export class Grid {
  public container: Container;

  constructor() {
    this.container = new Container();

    const graphics = new Graphics();

    const WORLD_SIZE = 10000;
    const GRID_SIZE = 64;

    // 일반 격자
    graphics.setStrokeStyle({
      width: 1,
      color: 0x222222,
      alpha: 1,
    });

    for (let x = -WORLD_SIZE; x <= WORLD_SIZE; x += GRID_SIZE) {
      graphics.moveTo(x, -WORLD_SIZE);
      graphics.lineTo(x, WORLD_SIZE);
    }

    for (let y = -WORLD_SIZE; y <= WORLD_SIZE; y += GRID_SIZE) {
      graphics.moveTo(-WORLD_SIZE, y);
      graphics.lineTo(WORLD_SIZE, y);
    }

    graphics.stroke();

    // 중심선
    graphics.setStrokeStyle({
      width: 2,
      color: 0x444444,
    });

    graphics.moveTo(0, -WORLD_SIZE);
    graphics.lineTo(0, WORLD_SIZE);

    graphics.moveTo(-WORLD_SIZE, 0);
    graphics.lineTo(WORLD_SIZE, 0);

    graphics.stroke();

    this.container.addChild(graphics);
  }
}