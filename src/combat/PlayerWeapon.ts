import { ProjectileManager } from "./ProjectileManager";

const PLAYER_PROJECTILE_SPEED = 520;
const PLAYER_FIRE_INTERVAL = 0.25;
const MAX_PLAYER_PROJECTILES = 100;

export class PlayerWeapon {
  private fireTimer = 0;

  update(
    deltaTime: number,
    playerX: number,
    playerY: number,
    projectileManager: ProjectileManager
  ): void {
    this.fireTimer -= deltaTime;

    if (this.fireTimer > 0) {
      return;
    }

    this.fireTimer = PLAYER_FIRE_INTERVAL;

    if (projectileManager.count >= MAX_PLAYER_PROJECTILES) {
      return;
    }

    projectileManager.spawn({
      x: playerX,
      y: playerY - 30,
      velocityX: 0,
      velocityY: -PLAYER_PROJECTILE_SPEED,
      damage: 10,
      radius: 4,
      owner: "player",
    });
  }
}
