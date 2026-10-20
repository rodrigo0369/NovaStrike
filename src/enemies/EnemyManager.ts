import { GAME_WIDTH, GAME_HEIGHT } from "../game/GameConfig";
import { ProjectileManager } from "../combat/ProjectileManager";
import { createEnemy, type Enemy, type EnemyType } from "./Enemy";

const SPAWN_INTERVAL = 1.8;
const MAX_ENEMIES = 8;
const MAX_ENEMY_PROJECTILES = 140;
const BOSS_EVERY = 12;

export class EnemyManager {
  private enemies: Enemy[] = [];
  private spawnTimer = 0;
  private spawnedCount = 0;

  update(
    deltaTime: number,
    projectileManager?: ProjectileManager,
    playerX = GAME_WIDTH / 2,
    playerY = GAME_HEIGHT - 100
  ): void {
    this.spawnTimer -= deltaTime;

    if (this.spawnTimer <= 0 && this.enemies.length < MAX_ENEMIES) {
      this.spawnedCount++;

      const boss = this.spawnedCount % BOSS_EVERY === 0;
      const types: EnemyType[] = ["scorpion", "zigzag", "charger"];
      const type: EnemyType = boss
        ? "boss"
        : types[Math.floor(Math.random() * types.length)];

      const margin = type === "boss" ? 60 : 30;
      const x = margin + Math.random() * (GAME_WIDTH - margin * 2);

      this.enemies.push(createEnemy({ x, type }));
      this.spawnTimer = boss ? 3.5 : SPAWN_INTERVAL;
    }

    for (const enemy of this.enemies) {
      if (!enemy.active) continue;

      enemy.age += deltaTime;

      if (enemy.type !== "boss" || enemy.y < 155) {
        enemy.y += enemy.speed * deltaTime;
      }

      if (enemy.type === "zigzag") {
        enemy.x = Math.max(
          enemy.width / 2,
          Math.min(
            GAME_WIDTH - enemy.width / 2,
            enemy.originX + Math.sin(enemy.age * 3 + enemy.phase) * 85
          )
        );
      }

      if (enemy.type === "charger") {
        enemy.speed = 145 + Math.min(90, enemy.age * 8);
      }

      if (enemy.type === "boss") {
        enemy.x = Math.max(
          enemy.width / 2,
          Math.min(
            GAME_WIDTH - enemy.width / 2,
            enemy.originX + Math.sin(enemy.age * 1.5) * 110
          )
        );

        if (enemy.y > 155) {
          enemy.y = 155;
          enemy.speed = 0;
        }
      }

      // Cada enemigo dispara según su propio ritmo.
      if (
        projectileManager &&
        projectileManager.count < MAX_ENEMY_PROJECTILES &&
        enemy.y > 0 &&
        enemy.y < GAME_HEIGHT - 100
      ) {
        enemy.fireTimer -= deltaTime;

        if (enemy.fireTimer <= 0) {
          if (enemy.type === "boss") {
            // Ráfaga en abanico: tres proyectiles.
            for (const angle of [-0.38, 0, 0.38]) {
              if (projectileManager.count >= MAX_ENEMY_PROJECTILES) {
                break;
              }

              const speed = 230;
              projectileManager.spawn({
                x: enemy.x,
                y: enemy.y + enemy.height / 2,
                velocityX: Math.sin(angle) * speed,
                velocityY: Math.cos(angle) * speed,
                damage: 1,
                radius: 6,
                owner: "enemy",
              });
            }

            enemy.fireTimer = 1.65;
          } else {
            // Apunta hacia la posición actual de la nave.
            const dx = playerX - enemy.x;
            const dy = playerY - enemy.y;
            const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
            const speed = enemy.type === "charger" ? 280 : 220;

            projectileManager.spawn({
              x: enemy.x,
              y: enemy.y + enemy.height / 2,
              velocityX: (dx / distance) * speed,
              velocityY: (dy / distance) * speed,
              damage: 1,
              radius: enemy.type === "charger" ? 5 : 4,
              owner: "enemy",
            });

            enemy.fireTimer =
              enemy.type === "charger"
                ? 1.5
                : enemy.type === "zigzag"
                  ? 2.4
                  : 2.1;
          }
        }
      }

      if (enemy.y > GAME_HEIGHT + enemy.height) {
        enemy.active = false;
      }
    }

    this.enemies = this.enemies.filter((enemy) => enemy.active);
  }

  damageEnemy(enemyId: number, damage: number): number {
    const enemy = this.enemies.find(
      (item) => item.id === enemyId && item.active
    );

    if (!enemy || damage <= 0) return 0;

    enemy.health -= damage;

    if (enemy.health <= 0) {
      enemy.active = false;
      this.enemies = this.enemies.filter((item) => item.active);
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
    this.spawnedCount = 0;
  }

  get count(): number {
    return this.enemies.length;
  }
}
