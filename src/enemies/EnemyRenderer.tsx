import React from "react";
import {
  Circle,
  Group,
  Path,
} from "@shopify/react-native-skia";

import type { Enemy } from "./Enemy";

type EnemyRendererProps = {
  enemies: Enemy[];
};

export function EnemyRenderer({
  enemies,
}: EnemyRendererProps) {
  return (
    <Group>
      {enemies.map((enemy) => {
        const { x, y } = enemy;

        return (
          <Group key={enemy.id}>
            {/* Cola y aguijón */}
            <Path
              path={`
                M ${x + 12} ${y - 10}
                Q ${x + 30} ${y - 30} ${x + 14} ${y - 36}
                L ${x + 8} ${y - 29}
              `}
              color="#FF4D35"
              style="stroke"
              strokeWidth={6}
            />

            <Path
              path={`
                M ${x + 8} ${y - 35}
                L ${x + 17} ${y - 29}
                L ${x + 8} ${y - 23}
                Z
              `}
              color="#FFD166"
            />

            {/* Pinzas */}
            <Path
              path={`
                M ${x - 12} ${y + 4}
                L ${x - 26} ${y - 4}
                L ${x - 22} ${y + 13}
                L ${x - 13} ${y + 20}
                Z
              `}
              color="#B91C35"
            />

            <Path
              path={`
                M ${x + 12} ${y + 4}
                L ${x + 26} ${y - 4}
                L ${x + 22} ${y + 13}
                L ${x + 13} ${y + 20}
                Z
              `}
              color="#B91C35"
            />

            {/* Cuerpo blindado */}
            <Path
              path={`
                M ${x} ${y - 22}
                L ${x + 15} ${y - 5}
                L ${x + 13} ${y + 18}
                L ${x} ${y + 29}
                L ${x - 13} ${y + 18}
                L ${x - 15} ${y - 5}
                Z
              `}
              color="#F04438"
            />

            <Path
              path={`
                M ${x} ${y - 14}
                L ${x + 7} ${y + 1}
                L ${x} ${y + 19}
                L ${x - 7} ${y + 1}
                Z
              `}
              color="#FFB347"
            />

            {/* Núcleo brillante */}
            <Circle
              cx={x}
              cy={y + 1}
              r={4}
              color="#FFF0A6"
            />

            {/* Detalles de armadura */}
            <Path
              path={`
                M ${x - 12} ${y + 5}
                L ${x - 7} ${y + 12}
                M ${x + 12} ${y + 5}
                L ${x + 7} ${y + 12}
              `}
              color="#60152A"
              style="stroke"
              strokeWidth={3}
            />

            {/* Indicador de vida */}
            <Group>
              <Path
                path={`
                  M ${x - 18} ${y - 43}
                  L ${x + 18} ${y - 43}
                `}
                color="#3A1722"
                style="stroke"
                strokeWidth={4}
              />

              <Path
                path={`
                  M ${x - 18} ${y - 43}
                  L ${x - 18 + 36 * (enemy.health / enemy.maxHealth)} ${y - 43}
                `}
                color="#FF5C5C"
                style="stroke"
                strokeWidth={4}
              />
            </Group>
          </Group>
        );
      })}
    </Group>
  );
}
