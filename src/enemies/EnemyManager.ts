import { GAME_WIDTH, GAME_HEIGHT } from "../game/GameConfig";

import {
  createEnemy,
  type Enemy,
} from "./Enemy";

const SPAWN_INTERVAL = 1.8;
const MAX_ENEMIES = 8;

export class EnemyManager {
  private enemies: Enemy[] = [];
  private spawnTimer = 0;

  update(deltaTime: number): void {
    this.spawnTimer -= deltaTime;

    if (
      this.spawnTimer <= 0 &&
      this.enemies.length < MAX_ENEMIES
    ) {
      const margin = 30;
      const x =
        margin + Math.random() * (GAME_WIDTH - margin * 2);

      this.enemies.push(createEnemy({ x }));
      this.spawnTimer = SPAWN_INTERVAL;
    }

    for (const enemy of this.enemies) {
      if (!enemy.active) {
        continue;
      }

      enemy.y += enemy.speed * deltaTime;

      if (enemy.y > GAME_HEIGHT + enemy.height) {
        enemy.active = false;
      }
    }

    this.enemies = this.enemies.filter(
      (enemy) => enemy.active
    );
  }

  damageEnemy(enemyId: number, damage: number): number {
    const enemy = this.enemies.find(
      (item) => item.id === enemyId && item.active
    );

    if (!enemy || damage <= 0) {
      return 0;
    }

    enemy.health -= damage;

    if (enemy.health <= 0) {
      enemy.active = false;
      this.enemies = this.enemies.filter(
        (item) => item.active
      );

      return enemy.points;
    }

    return 0;
  }

  getEnemies(): Enemy[] {
    return this.enemies.map((enemy) => ({ ...enemy }));
  }

  clear(): void {
    this.enemies = [];
    this.spawnTimer = 0;
  }

  get count(): number {
    return this.enemies.length;
  }
}
