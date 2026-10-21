import React, { useMemo } from "react";
import { Circle, Group } from "@shopify/react-native-skia";

import {
  GAME_WIDTH,
  GAME_HEIGHT,
  WORLD,
} from "../game/GameConfig";

type Star = {
  x: number;
  y: number;
  radius: number;
  color: string;
};

export function StarField() {
  const stars = useMemo<Star[]>(() => {
    const count = Math.max(WORLD.starCount * 3, 180);

    return Array.from({ length: count }, (_, index) => {
      // Distribución seudoaleatoria estable por toda la pantalla.
      const seedX = Math.sin((index + 1) * 127.1) * 43758.5453;
      const seedY = Math.sin((index + 1) * 269.5) * 22578.1459;
      const seedSize = Math.sin((index + 1) * 78.233) * 19341.357;

      const fractionX = seedX - Math.floor(seedX);
      const fractionY = seedY - Math.floor(seedY);
      const fractionSize = seedSize - Math.floor(seedSize);

      const radius =
        fractionSize > 0.94 ? 2.1 :
        fractionSize > 0.70 ? 1.4 :
        0.8;

      const color =
        fractionSize > 0.94 ? "#C9F7FF" :
        fractionSize > 0.78 ? "#9CDFFF" :
        "#FFFFFF";

      return {
        x: fractionX * GAME_WIDTH,
        y: fractionY * GAME_HEIGHT,
        radius,
        color,
      };
    });
  }, []);

  return (
    <Group>
      {stars.map((star, index) => (
        <Circle
          key={index}
          cx={star.x}
          cy={star.y}
          r={star.radius}
          color={star.color}
          opacity={star.radius > 2 ? 0.95 : 0.7}
        />
      ))}
    </Group>
  );
}
