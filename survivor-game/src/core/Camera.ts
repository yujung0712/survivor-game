import { Container, Point } from "pixi.js";

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
    target: Point,
    screenWidth: number,
    screenHeight: number
  ) {
    this.moveTo(
      target.x,
      target.y,
      screenWidth,
      screenHeight
    );
  }
}