import { Bullet } from "../entities/Bullet";
import { Enemy } from "../entities/Enemy";
import { Input } from "../systems/Input";
import { Player } from "../entities/Player";
import { Application } from "pixi.js";
import { World } from "./World";
import { Camera } from "./Camera";

export class Game {
  public readonly app: Application;
  public readonly world: World;
  public readonly camera: Camera;
  public readonly input: Input;

  public readonly player: Player;
  public readonly enemy: Enemy;

  private bullets: Bullet[] = [];
  private attackTimer = 0;

  constructor(app: Application) {
    this.app = app;

    this.input = new Input();

    this.world = new World();
    this.camera = new Camera(this.world.container);

    this.app.stage.addChild(this.world.container);

    // Player
    this.player = new Player();
    this.player.setPosition(0, 0);
    this.world.add(this.player.container);

    // Enemy (임시 1개)
    this.enemy = new Enemy();
    this.enemy.setPosition(300, 0);
    this.world.add(this.enemy.container);

    // Camera 초기 위치
    this.camera.moveTo(
      0,
      0,
      this.app.screen.width,
      this.app.screen.height
    );

    // Game Loop
    this.app.ticker.add(() => {
      this.update();
    });
  }

  private update() {
    const speed = 4;

    // ======================
    // 1. Input → Player 이동
    // ======================
    let dx = 0;
    let dy = 0;

    if (this.input.isKeyDown("KeyW")) dy -= speed;
    if (this.input.isKeyDown("KeyS")) dy += speed;
    if (this.input.isKeyDown("KeyA")) dx -= speed;
    if (this.input.isKeyDown("KeyD")) dx += speed;

    this.player.move(dx, dy);

    // ======================
    // 2. Enemy 추적 AI
    // ======================
    this.enemy.moveToward(
      this.player.x,
      this.player.y,
      2
    );

    // ======================
    // 3. Bullet update
    // ======================
    for (const bullet of this.bullets) {
      bullet.update();
    }

    // ======================
    // 4. Collision (Player-Enemy)
    // ======================
    if (this.isColliding()) {
      console.log("💥 COLLISION!");
    }

    // ======================
    // 5. Camera Follow
    // ======================
    this.camera.follow(
      this.player.x,
      this.player.y,
      this.app.screen.width,
      this.app.screen.height
    );

    // ======================
    // 6. Auto Attack
    // ======================
    this.attackTimer++;

    if (this.attackTimer > 20) {
      this.attackTimer = 0;
      this.shoot();
    }
  }

  // ======================
  // Collision check
  // ======================
  private isColliding(): boolean {
    const dx = this.player.x - this.enemy.container.x;
    const dy = this.player.y - this.enemy.container.y;

    const distance = Math.hypot(dx, dy);

    const playerRadius = 16;
    const enemyRadius = 14;

    return distance < playerRadius + enemyRadius;
  }

  // ======================
  // Bullet 생성
  // ======================
  private shoot() {
    const bullet = new Bullet(
      this.player.x,
      this.player.y,
      this.enemy.container.x,
      this.enemy.container.y
    );

    this.bullets.push(bullet);
    this.world.add(bullet.container);
  }
}