import React from "react";
import { Circle, Group, Path } from "@shopify/react-native-skia";
import type { Enemy } from "./Enemy";

type EnemyRendererProps = {
  enemies: Enemy[];
};

export function EnemyRenderer({ enemies }: EnemyRendererProps) {
  return (
    <Group>
      {enemies.map((enemy) => {
        const { x, y, type } = enemy;

        if (type === "boss") {
          return (
            <Group key={enemy.id}>
              <Path
                path={`M ${x} ${y - 42} L ${x - 48} ${y - 12} L ${x - 38} ${y + 28} L ${x - 15} ${y + 18} L ${x} ${y + 42} L ${x + 15} ${y + 18} L ${x + 38} ${y + 28} L ${x + 48} ${y - 12} Z`}
                color="#6D28D9"
              />
              <Path
                path={`M ${x - 42} ${y - 12} L ${x - 20} ${y + 2} L ${x - 14} ${y + 20} M ${x + 42} ${y - 12} L ${x + 20} ${y + 2} L ${x + 14} ${y + 20}`}
                color="#F0ABFC"
                style="stroke"
                strokeWidth={5}
              />
              <Path
                path={`M ${x} ${y - 28} L ${x - 16} ${y} L ${x} ${y + 24} L ${x + 16} ${y} Z`}
                color="#C084FC"
              />
              <Circle cx={x} cy={y} r={9} color="#FFFFFF" />
              <Path
                path={`M ${x - 45} ${y - 52} L ${x + 45} ${y - 52}`}
                color="#451A03"
                style="stroke"
                strokeWidth={5}
              />
              <Path
                path={`M ${x - 45} ${y - 52} L ${x - 45 + 90 * enemy.health / enemy.maxHealth} ${y - 52}`}
                color="#F43F5E"
                style="stroke"
                strokeWidth={5}
              />
            </Group>
          );
        }

        if (type === "zigzag") {
          return (
            <Group key={enemy.id}>
              <Path
                path={`M ${x} ${y - 25} L ${x - 24} ${y + 3} L ${x - 8} ${y + 15} L ${x} ${y + 27} L ${x + 8} ${y + 15} L ${x + 24} ${y + 3} Z`}
                color="#7C3AED"
              />
              <Path
                path={`M ${x - 6} ${y - 12} L ${x} ${y + 12} L ${x + 6} ${y - 12} Z`}
                color="#E9D5FF"
              />
              <Circle cx={x} cy={y + 1} r={4} color="#FFFFFF" />
            </Group>
          );
        }

        if (type === "charger") {
          return (
            <Group key={enemy.id}>
              <Path
                path={`M ${x} ${y - 28} L ${x - 19} ${y + 16} L ${x} ${y + 8} L ${x + 19} ${y + 16} Z`}
                color="#EA580C"
              />
              <Path
                path={`M ${x} ${y - 16} L ${x - 7} ${y + 7} L ${x} ${y + 2} L ${x + 7} ${y + 7} Z`}
                color="#FDE68A"
              />
            </Group>
          );
        }

        return (
          <Group key={enemy.id}>
            <Path
              path={`M ${x + 12} ${y - 10} Q ${x + 30} ${y - 30} ${x + 14} ${y - 36} L ${x + 8} ${y - 29}`}
              color="#FF4D35"
              style="stroke"
              strokeWidth={6}
            />
            <Path
              path={`M ${x - 12} ${y + 4} L ${x - 26} ${y - 4} L ${x - 22} ${y + 13} L ${x - 13} ${y + 20} Z M ${x + 12} ${y + 4} L ${x + 26} ${y - 4} L ${x + 22} ${y + 13} L ${x + 13} ${y + 20} Z`}
              color="#B91C35"
            />
            <Path
              path={`M ${x} ${y - 22} L ${x + 15} ${y - 5} L ${x + 13} ${y + 18} L ${x} ${y + 29} L ${x - 13} ${y + 18} L ${x - 15} ${y - 5} Z`}
              color="#F04438"
            />
            <Path
              path={`M ${x} ${y - 14} L ${x + 7} ${y + 1} L ${x} ${y + 19} L ${x - 7} ${y + 1} Z`}
              color="#FFB347"
            />
            <Circle cx={x} cy={y + 1} r={4} color="#FFF0A6" />
            <Path
              path={`M ${x - 18} ${y - 43} L ${x + 18} ${y - 43}`}
              color="#3A1722"
              style="stroke"
              strokeWidth={4}
            />
            <Path
              path={`M ${x - 18} ${y - 43} L ${x - 18 + 36 * enemy.health / enemy.maxHealth} ${y - 43}`}
              color="#FF5C5C"
              style="stroke"
              strokeWidth={4}
            />
          </Group>
        );
      })}
    </Group>
  );
}
