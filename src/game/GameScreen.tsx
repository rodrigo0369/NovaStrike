import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Canvas, Rect } from "@shopify/react-native-skia";

import {
  GAME_WIDTH,
  GAME_HEIGHT,
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

export function GameScreen() {
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

  const level =
    Math.floor(score / PROGRESSION.pointsPerLevel) + 1;

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
      enemyManager.update(deltaTime);

      const currentProjectiles =
        projectileManager.getProjectiles();
      const currentEnemies = enemyManager.getEnemies();

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
            }

            projectileManager.removeProjectile(projectile.id);
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
        />
      </Canvas>

      <View style={styles.hud}>
        <Text style={styles.hudText}>PUNTOS: {score}</Text>
        <Text style={styles.hudText}>NIVEL: {level}</Text>
      </View>

      <TouchControls
        onMove={(dx, dy) => {
          controller.setDirection(dx, dy);
        }}
      />
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
    backgroundColor: "rgba(5, 12, 35, 0.82)",
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
});
