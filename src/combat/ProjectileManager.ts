import {
  GAME_WIDTH,
  GAME_HEIGHT,
} from "../game/GameConfig";

import {
  createProjectile,
  type Projectile,
  type CreateProjectileOptions,
} from "./Projectile";

export class ProjectileManager {
  private projectiles: Projectile[] = [];

  spawn(options: CreateProjectileOptions): void {
    this.projectiles.push(createProjectile(options));
  }

  update(deltaTime: number): void {
    for (const projectile of this.projectiles) {
      if (!projectile.active) {
        continue;
      }

      projectile.x += projectile.velocityX * deltaTime;
      projectile.y += projectile.velocityY * deltaTime;

      if (
        projectile.x < -50 ||
        projectile.x > GAME_WIDTH + 50 ||
        projectile.y < -50 ||
        projectile.y > GAME_HEIGHT + 50
      ) {
        projectile.active = false;
      }
    }

    this.projectiles = this.projectiles.filter(
      (projectile) => projectile.active
    );
  }

  getProjectiles(): Projectile[] {
    return this.projectiles.map((projectile) => ({
      ...projectile,
    }));
  }

  clear(): void {
    this.projectiles = [];
  }

  get count(): number {
    return this.projectiles.length;
  }
}
