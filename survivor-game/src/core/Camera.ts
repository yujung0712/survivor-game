import { Container } from "pixi.js";

export class Camera {
  private readonly world: Container;

  constructor(world: Container) {
    this.world = world;
  }

  public moveTo(
    x: number,
    y: number,
    screenWidth: number,
    screenHeight: number
  ) {
    this.world.position.set(
      screenWidth / 2 - x,
      screenHeight / 2 - y
    );
  }

  public follow(
    x: number,
    y: number,
    screenWidth: number,
    screenHeight: number
  ) {
    this.moveTo(x, y, screenWidth, screenHeight);
  }
}