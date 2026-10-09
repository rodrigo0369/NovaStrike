import React from "react";
import {
  Circle,
  Group,
} from "@shopify/react-native-skia";

import type { Projectile } from "./Projectile";

type ProjectileRendererProps = {
  projectiles: Projectile[];
};

export function ProjectileRenderer({
  projectiles,
}: ProjectileRendererProps) {
  return (
    <Group>
      {projectiles.map((projectile) => (
        <Circle
          key={projectile.id}
          cx={projectile.x}
          cy={projectile.y}
          r={projectile.radius}
          color={
            projectile.owner === "player"
              ? "#00E5FF"
              : "#FF3D71"
          }
        />
      ))}
    </Group>
  );
}
