export type EnemyType = "scorpion" | "zigzag" | "charger" | "boss";

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
  coins: number;
  active: boolean;
  age: number;
  originX: number;
  phase: number;
  fireTimer: number;
};

export type CreateEnemyOptions = {
  x: number;
  y?: number;
  speed?: number;
  type?: EnemyType;
};

let nextEnemyId = 1;

export function createEnemy(options: CreateEnemyOptions): Enemy {
  const type = options.type ?? "scorpion";
  const boss = type === "boss";
  const health = boss ? 30 : type === "charger" ? 2 : 3;

  return {
    id: nextEnemyId++,
    type,
    x: options.x,
    y: options.y ?? (boss ? -75 : -40),
    width: boss ? 100 : 48,
    height: boss ? 100 : 64,
    speed: options.speed ?? (boss ? 48 : type === "charger" ? 145 : 100),
    health,
    maxHealth: health,
    points: boss ? 500 : 100,
    coins: boss ? 5 : 1,
    active: true,
    age: 0,
    originX: options.x,
    phase: Math.random() * Math.PI * 2,
    fireTimer: 0.8 + Math.random() * 1.2,
  };
}
