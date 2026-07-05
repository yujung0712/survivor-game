import { Exp } from "../entities/Exp";
import { Bullet } from "../entities/Bullet";
import { Enemy } from "../entities/Enemy";
import { Input } from "../systems/Input";
import { Player } from "../entities/Player";
import { Application } from "pixi.js";
import { World } from "./World";
import { Camera } from "./Camera";
import { WeaponManager } from "../systems/WeaponManager";

export class Game {
  public readonly app: Application;
  public readonly world: World;
  public readonly camera: Camera;
  public readonly input: Input;

  public readonly player: Player;
  public readonly weaponManager: WeaponManager;

  // Enemy 배열
  private enemies: Enemy[] = [];

  private bullets: Bullet[] = [];

  private exps: Exp[] = [];

  private attackTimer = 0;
  private spawnTimer = 0;

  private exp = 0;
  private level = 1;
  private expToNextLevel = 3;

  private onLevelUpCallback: (() => void) | null = null;

  constructor(app: Application) {
    this.weaponManager = new WeaponManager();
    this.app = app;

    this.input = new Input();

    this.world = new World();
    this.camera = new Camera(this.world.container);

    this.app.stage.addChild(this.world.container);

    this.player = new Player();
    this.player.setPosition(0, 0);

    this.world.add(this.player.container);

    // 시작 적
    for (let i = 0; i < 5; i++) {
      this.spawnEnemy();
    }

    this.app.ticker.add(() => this.update());
  }

  public setLevelUpCallback(cb: () => void) {
    this.onLevelUpCallback = cb;
  }

  private gainExp(amount: number) {
    this.exp += amount;

    console.log(
      `EXP : ${this.exp} / ${this.expToNextLevel}`
    );

    if (this.exp >= this.expToNextLevel) {
      this.levelUp();
    }
  }


  public resumeGame() {
    this.paused = false;
}

  private levelUp() {
    this.level++;

    this.exp = 0;

    this.expToNextLevel += 2;

    console.log("LEVEL UP");

    this.paused = true;

    this.onLevelUpCallback?.();
  }

  // ==========================
  // Enemy Spawn
  // ==========================

  private spawnEnemy() {
    const enemy = new Enemy();

    const radius = 700;

    const angle = Math.random() * Math.PI * 2;

    const x =
      this.player.x +
      Math.cos(angle) * radius;

    const y =
      this.player.y +
      Math.sin(angle) * radius;

    enemy.setPosition(x, y);

    this.enemies.push(enemy);

    this.world.add(enemy.container);
  }

  // ==========================
  // 가장 가까운 Enemy 찾기
  // ==========================

  private getNearestEnemy(): Enemy | null {
    if (this.enemies.length === 0)
      return null;

    let nearest = this.enemies[0];

    let min = Infinity;

    for (const enemy of this.enemies) {
      const dx =
        enemy.container.x -
        this.player.x;

      const dy =
        enemy.container.y -
        this.player.y;

      const d = Math.hypot(dx, dy);

      if (d < min) {
        min = d;
        nearest = enemy;
      }
    }

    return nearest;
  }

  // ==========================
  // Shoot
  // ==========================

  private shoot() {
    const target =
      this.getNearestEnemy();

    if (!target) return;

    const bullet = new Bullet(
      this.player.x,
      this.player.y,
      target.container.x,
      target.container.y
    );

    this.bullets.push(bullet);

    this.world.add(
      bullet.container
    );
  }

  // ==========================
  // UPDATE
  // ==========================
  private paused = false;

  private update() {
    const speed = 4;

    let dx = 0;
    let dy = 0;
    
    if (this.paused) return;

    if (this.input.isKeyDown("KeyW"))
      dy -= speed;

    if (this.input.isKeyDown("KeyS"))
      dy += speed;

    if (this.input.isKeyDown("KeyA"))
      dx -= speed;

    if (this.input.isKeyDown("KeyD"))
      dx += speed;

    this.player.move(dx, dy);

    // Enemy 이동
    for (const enemy of this.enemies) {
      enemy.moveToward(
        this.player.x,
        this.player.y,
        2
      );
    }

    // Bullet 이동
    for (let i = this.bullets.length - 1; i >= 0; i--) {
  const bullet = this.bullets[i];

  bullet.update();

  if (
    bullet.isOutOfRange(
      this.player.x,
      this.player.y
    )
  ) {
    this.world.container.removeChild(
      bullet.container
    );

    this.bullets.splice(i, 1);
  }
}

    // Spawn Timer
    this.spawnTimer++;

    if (this.spawnTimer > 60) {
      this.spawnTimer = 0;

      this.spawnEnemy();
    }

    // Attack Timer
    this.attackTimer++;

    if (this.attackTimer > 20) {
      this.attackTimer = 0;

      this.shoot();
    }

    this.checkBulletEnemyCollision();

    this.checkExpAbsorption();

    this.camera.follow(
      this.player.x,
      this.player.y,
      this.app.screen.width,
      this.app.screen.height
    );
  }
    // ==========================
  // Bullet vs Enemy
  // ==========================

  private checkBulletEnemyCollision() {
    const enemyRadius = 14;
    const bulletRadius = 4;

    for (
      let b = this.bullets.length - 1;
      b >= 0;
      b--
    ) {
      const bullet = this.bullets[b];

      let hit = false;

      for (
        let e = this.enemies.length - 1;
        e >= 0;
        e--
      ) {
        const enemy = this.enemies[e];

        const dx =
          bullet.container.x -
          enemy.container.x;

        const dy =
          bullet.container.y -
          enemy.container.y;

        const distance = Math.hypot(
          dx,
          dy
        );

        if (
          distance <
          enemyRadius + bulletRadius
        ) {
          enemy.takeDamage(1);

          // 총알 제거
          this.world.container.removeChild(
            bullet.container
          );

          this.bullets.splice(b, 1);

          hit = true;

          // 적 죽음
          if (enemy.isDead()) {
            console.log("Enemy Dead");

            const exp = new Exp(
              enemy.container.x,
              enemy.container.y
            );

            this.exps.push(exp);

            this.world.add(exp.container);

            this.world.container.removeChild(
              enemy.container
            );

            this.enemies.splice(e, 1);
          }

          break;
        }
      }

      if (hit) continue;
    }
  }

  // ==========================
  // EXP 흡수
  // ==========================

  private checkExpAbsorption() {
    for (
      let i = this.exps.length - 1;
      i >= 0;
      i--
    ) {
      const exp = this.exps[i];

      const dx =
        this.player.x -
        exp.container.x;

      const dy =
        this.player.y -
        exp.container.y;

      const distance =
        Math.hypot(dx, dy);

      const magnetRange = 120;

      const pickupRadius = 45;

      if (
        distance < magnetRange &&
        distance > 0
      ) {
        const speed = 3;

        exp.container.x +=
          (dx / distance) * speed;

        exp.container.y +=
          (dy / distance) * speed;
      }

      if (distance < pickupRadius) {
        this.gainExp(1);

        this.world.container.removeChild(
          exp.container
        );

        this.exps.splice(i, 1);
      }
    }
  }
}