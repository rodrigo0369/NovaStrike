import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PLAYER as PLAYER_CONFIG,
} from "../game/GameConfig";

const PLAYER_ZONE_TOP = GAME_HEIGHT * 0.55;
const MOVEMENT_SMOOTHING = 12;

export type PlayerPosition = {
  x: number;
  y: number;
};

export class PlayerController {
  private position: PlayerPosition;
  private directionX = 0;
  private directionY = 0;

  constructor() {
    this.position = {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT - 100,
    };
  }

  getPosition(): PlayerPosition {
    return { ...this.position };
  }

  setDirection(dx: number, dy: number): void {
    this.directionX = dx;
    this.directionY = dy;
  }

  update(deltaTime: number): void {
    const smoothing = Math.min(
      1,
      MOVEMENT_SMOOTHING * deltaTime
    );

    this.position.x +=
      this.directionX * PLAYER_CONFIG.speed * smoothing;

    this.position.y +=
      this.directionY * PLAYER_CONFIG.speed * smoothing;

    this.clampToScreen();
  }

  move(dx: number, dy: number, deltaTime: number): void {
    this.position.x += dx * PLAYER_CONFIG.speed * deltaTime;
    this.position.y += dy * PLAYER_CONFIG.speed * deltaTime;
    this.clampToScreen();
  }

  setPosition(x: number, y: number): void {
    this.position.x = x;
    this.position.y = y;
    this.clampToScreen();
  }

  private clampToScreen(): void {
    const halfWidth = PLAYER_CONFIG.width / 2;
    const halfHeight = PLAYER_CONFIG.height / 2;

    this.position.x = Math.max(
      halfWidth,
      Math.min(GAME_WIDTH - halfWidth, this.position.x)
    );

    this.position.y = Math.max(
      PLAYER_ZONE_TOP + halfHeight,
      Math.min(GAME_HEIGHT - halfHeight, this.position.y)
    );
  }
}
