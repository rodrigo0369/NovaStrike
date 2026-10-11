export type EnemyType = "scorpion";

export type Enemy = {
  id: number;
  type: EnemyType;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  health: number;
  maxHealth: number;
  points: number;
  active: boolean;
};

export type CreateEnemyOptions = {
  x: number;
  y?: number;
  speed?: number;
};

let nextEnemyId = 1;

export function createEnemy(
  options: CreateEnemyOptions
): Enemy {
  return {
    id: nextEnemyId++,
    type: "scorpion",
    x: options.x,
    y: options.y ?? -40,
    width: 48,
    height: 64,
    speed: options.speed ?? 100,
    health: 3,
    maxHealth: 3,
    points: 100,
    active: true,
  };
}
