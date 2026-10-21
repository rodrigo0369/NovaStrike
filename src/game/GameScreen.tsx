import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Canvas, Rect } from "@shopify/react-native-skia";

import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PLAYER,
  PROGRESSION,
} from "./GameConfig";

import { StarField } from "../world/StarField";
import { Player } from "../player/Player";
import { PlayerController } from "../player/PlayerController";
import { TouchControls } from "../ui/TouchControls";

import { ProjectileManager } from "../combat/ProjectileManager";
import { PlayerWeapon } from "../combat/PlayerWeapon";
import { ProjectileRenderer } from "../combat/ProjectileRenderer";
import type { Projectile } from "../combat/Projectile";

import { EnemyManager } from "../enemies/EnemyManager";
import { EnemyRenderer } from "../enemies/EnemyRenderer";
import type { Enemy } from "../enemies/Enemy";

type GameScreenProps = {
  onMainMenu: () => void;
  onScoreChange: (score: number) => void;
  onCoinsEarned: (amount: number) => void;
  selectedShip: string;
};

export function GameScreen({
  onMainMenu,
  onScoreChange,
  onCoinsEarned,
  selectedShip,
}: GameScreenProps) {
  const controller = useRef(new PlayerController()).current;
  const projectileManager = useRef(new ProjectileManager()).current;
  const playerWeapon = useRef(new PlayerWeapon()).current;
  const enemyManager = useRef(new EnemyManager()).current;

  const [playerPosition, setPlayerPosition] = useState(
    controller.getPosition()
  );
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(PLAYER.startLives);

  const livesRef = useRef(PLAYER.startLives);
  const invulnerableUntil = useRef(0);

  const level =
    Math.floor(score / PROGRESSION.pointsPerLevel) + 1;

  useEffect(() => {
    onScoreChange(score);
  }, [score, onScoreChange]);

  useEffect(() => {
    let animationFrame = 0;
    let lastTime = performance.now();

    const update = (currentTime: number) => {
      const deltaTime = Math.min(
        (currentTime - lastTime) / 1000,
        0.05
      );
      lastTime = currentTime;

      controller.update(deltaTime);

      const position = controller.getPosition();

      playerWeapon.update(
        deltaTime,
        position.x,
        position.y,
        projectileManager
      );

      projectileManager.update(deltaTime);
      enemyManager.update(
        deltaTime,
        projectileManager,
        position.x,
        position.y,
        level
      );

      const currentProjectiles =
        projectileManager.getProjectiles();
      const currentEnemies = enemyManager.getEnemies();

      // Los disparos dañan a los escorpiones.
      for (const projectile of currentProjectiles) {
        if (projectile.owner !== "player") continue;

        for (const enemy of currentEnemies) {
          const hitX =
            Math.abs(projectile.x - enemy.x) <=
            enemy.width / 2 + projectile.radius;

          const hitY =
            Math.abs(projectile.y - enemy.y) <=
            enemy.height / 2 + projectile.radius;

          if (hitX && hitY) {
            const pointsEarned = enemyManager.damageEnemy(
              enemy.id,
              projectile.damage
            );

            if (pointsEarned > 0) {
              setScore((currentScore) => currentScore + pointsEarned);
              onCoinsEarned(enemy.coins);
            }

            projectileManager.removeProjectile(projectile.id);
            break;
          }
        }
      }

      // Los proyectiles enemigos pueden golpear a la nave.
      for (const projectile of currentProjectiles) {
        if (projectile.owner !== "enemy") continue;

        // Un solo impacto puede quitar como máximo una vida.
        if (
          livesRef.current <= 0 ||
          currentTime < invulnerableUntil.current
        ) {
          break;
        }

        const hitX =
          Math.abs(position.x - projectile.x) <=
          PLAYER.width / 2 + projectile.radius;

        const hitY =
          Math.abs(position.y - projectile.y) <=
          PLAYER.height / 2 + projectile.radius;

        if (hitX && hitY) {
          projectileManager.removeProjectile(projectile.id);
          livesRef.current = Math.max(0, livesRef.current - 1);
          setLives(livesRef.current);
          invulnerableUntil.current = currentTime + 1500;
          break;
        }
      }

      // Detectar choque entre la nave y un enemigo.
      if (
        livesRef.current > 0 &&
        currentTime >= invulnerableUntil.current
      ) {
        for (const enemy of enemyManager.getEnemies()) {
          const hitX =
            Math.abs(position.x - enemy.x) <=
            (PLAYER.width + enemy.width) / 2;

          const hitY =
            Math.abs(position.y - enemy.y) <=
            (PLAYER.height + enemy.height) / 2;

          if (hitX && hitY) {
            // Eliminar al escorpión sin otorgar puntos.
            enemyManager.damageEnemy(enemy.id, enemy.health);

            // Perder una sola vida y activar protección temporal.
            livesRef.current = Math.max(0, livesRef.current - 1);
            setLives(livesRef.current);
            invulnerableUntil.current = currentTime + 1500;

            break;
          }
        }
      }

      setPlayerPosition(position);
      setProjectiles(projectileManager.getProjectiles());
      setEnemies(enemyManager.getEnemies());

      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [controller, playerWeapon, projectileManager, enemyManager]);

  return (
    <View style={styles.container}>
      <Canvas
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          backgroundColor: "#02030F",
        }}
      >
        <Rect
          x={0}
          y={0}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          color="#02030F"
        />

        <StarField />
        <EnemyRenderer enemies={enemies} />
        <ProjectileRenderer projectiles={projectiles} />

        <Player
          x={playerPosition.x}
          y={playerPosition.y}
          shipId={selectedShip}
        />
      </Canvas>

      <View style={styles.hud}>
        <Text style={styles.hudText}>PUNTOS: {score}</Text>
        <Text style={styles.hudText}>NIVEL: {level}</Text>
        <Text style={styles.hudText}>
          VIDAS: {"♥ ".repeat(lives)}{"♡ ".repeat(PLAYER.startLives - lives)}
        </Text>
      </View>

      {lives === 0 && (
        <View style={styles.gameOver}>
          <Text style={styles.gameOverTitle}>GAME OVER</Text>
          <Text style={styles.gameOverText}>
            PUNTOS FINALES: {score}
          </Text>
          <Text
            style={styles.menuButton}
            onPress={onMainMenu}
          >
            VOLVER AL MENÚ
          </Text>
        </View>
      )}

      {lives > 0 && (
        <TouchControls
          onMove={(dx, dy) => {
            controller.setDirection(dx, dy);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02030F",
    alignItems: "center",
    justifyContent: "center",
  },
  hud: {
    position: "absolute",
    top: 18,
    left: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "rgba(5, 12, 35, 0.88)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#38BDF8",
  },
  hudText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 2,
  },
  gameOver: {
    position: "absolute",
    alignSelf: "center",
    top: "40%",
    padding: 24,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#F43F5E",
    backgroundColor: "rgba(5, 12, 35, 0.95)",
    alignItems: "center",
  },
  gameOverTitle: {
    color: "#F43F5E",
    fontSize: 30,
    fontWeight: "bold",
  },
  gameOverText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 10,
  },
  menuButton: {
    color: "#67E8F9",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 22,
    paddingVertical: 10,
  },
});
