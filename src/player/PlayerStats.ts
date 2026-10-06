export type PlayerStats = {
  lives: number;
  maxLives: number;
  shield: number;
  maxShield: number;
  score: number;
  coins: number;
};

export function createPlayerStats(): PlayerStats {
  return {
    lives: 3,
    maxLives: 3,
    shield: 100,
    maxShield: 100,
    score: 0,
    coins: 0,
  };
}
