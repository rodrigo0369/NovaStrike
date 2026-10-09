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
};

export function StarField() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: WORLD.starCount }, (_, index) => ({
      x: (index * 97) % GAME_WIDTH,
      y: (index * 151) % GAME_HEIGHT,
      radius: index % 3 === 0 ? 2 : 1,
    }));
  }, []);

  return (
    <Group>
      {stars.map((star, index) => (
        <Circle
          key={index}
          cx={star.x}
          cy={star.y}
          r={star.radius}
          color="#FFFFFF"
        />
      ))}
    </Group>
  );
}
