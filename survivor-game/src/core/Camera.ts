import { Container, Point } from "pixi.js";

export class Camera {
  private world: Container;

  constructor(world: Container) {
    this.world = world;
  }

  public follow(target: Point, screenWidth: number, screenHeight: number) {
    this.world.x = screenWidth / 2 - target.x;
    this.world.y = screenHeight / 2 - target.y;
  }
}