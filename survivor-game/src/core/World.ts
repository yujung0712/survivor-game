import { Container, Graphics } from "pixi.js";

export class World {
  public readonly container: Container;

  private readonly grid: Graphics;

  constructor() {
    this.container = new Container();

    this.grid = new Graphics();
    this.drawGrid();

    this.container.addChild(this.grid);
  }

  private drawGrid() {
    const cellSize = 64;
    const worldSize = 6400;
    const half = worldSize / 2;

    this.grid
      .setStrokeStyle({
        width: 1,
        color: 0x444444,
        alpha: 0.4,
      });

    // 세로선
    for (let x = -half; x <= half; x += cellSize) {
      this.grid
        .moveTo(x, -half)
        .lineTo(x, half);
    }

    // 가로선
    for (let y = -half; y <= half; y += cellSize) {
      this.grid
        .moveTo(-half, y)
        .lineTo(half, y);
    }

    this.grid.stroke();
  }

  public add(child: Container) {
    this.container.addChild(child);
  }
}