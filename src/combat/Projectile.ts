export type ProjectileOwner = "player" | "enemy";

export type Projectile = {
  id: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  damage: number;
  radius: number;
  owner: ProjectileOwner;
  active: boolean;
};

export type CreateProjectileOptions = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  damage?: number;
  radius?: number;
  owner: ProjectileOwner;
};

let nextProjectileId = 1;

export function createProjectile(
  options: CreateProjectileOptions
): Projectile {
  return {
    id: nextProjectileId++,
    x: options.x,
    y: options.y,
    velocityX: options.velocityX,
    velocityY: options.velocityY,
    damage: options.damage ?? 10,
    radius: options.radius ?? 4,
    owner: options.owner,
    active: true,
  };
}
