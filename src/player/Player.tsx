import React from "react";
import { Group, Path } from "@shopify/react-native-skia";
import { PLAYER as PLAYER_CONFIG } from "../game/GameConfig";

type PlayerProps = {
  x: number;
  y: number;
  shipId?: string;
};

export function Player({ x, y, shipId = "nova" }: PlayerProps) {
  const scale = 1;
  const isPhantom = shipId === "phantom";
  const isNebula = shipId === "nebula";

  const hull = isPhantom ? "#B9F2FF" : isNebula ? "#E9D5FF" : "#CFFAFE";
  const accent = isPhantom ? "#0284C7" : isNebula ? "#9333EA" : "#0891B2";
  const glow = isPhantom ? "#38BDF8" : isNebula ? "#D946EF" : "#22D3EE";

  const body = isPhantom
    ? `M ${x} ${y - 29} L ${x - 8} ${y - 12} L ${x - 10} ${y + 13} L ${x} ${y + 23} L ${x + 10} ${y + 13} L ${x + 8} ${y - 12} Z`
    : isNebula
    ? `M ${x} ${y - 27} L ${x - 12} ${y - 8} L ${x - 11} ${y + 15} L ${x} ${y + 24} L ${x + 11} ${y + 15} L ${x + 12} ${y - 8} Z`
    : `M ${x} ${y - 29} L ${x - 9} ${y - 8} L ${x - 7} ${y + 17} L ${x} ${y + 23} L ${x + 7} ${y + 17} L ${x + 9} ${y - 8} Z`;

  const wings = isPhantom
    ? `M ${x - 5} ${y - 9} L ${x - 21} ${y + 2} L ${x - 15} ${y + 7} L ${x - 9} ${y + 5} Z M ${x + 5} ${y - 9} L ${x + 21} ${y + 2} L ${x + 15} ${y + 7} L ${x + 9} ${y + 5} Z`
    : isNebula
    ? `M ${x - 7} ${y - 7} L ${x - 23} ${y + 5} L ${x - 20} ${y + 15} L ${x - 8} ${y + 10} Z M ${x + 7} ${y - 7} L ${x + 23} ${y + 5} L ${x + 20} ${y + 15} L ${x + 8} ${y + 10} Z`
    : `M ${x - 6} ${y - 7} L ${x - 21} ${y + 9} L ${x - 10} ${y + 7} L ${x - 5} ${y + 13} Z M ${x + 6} ${y - 7} L ${x + 21} ${y + 9} L ${x + 10} ${y + 7} L ${x + 5} ${y + 13} Z`;

  const engines = isNebula
    ? `M ${x - 12} ${y + 8} L ${x - 7} ${y + 8} L ${x - 8} ${y + 21} Z M ${x - 2} ${y + 14} L ${x + 2} ${y + 14} L ${x} ${y + 27} Z M ${x + 7} ${y + 8} L ${x + 12} ${y + 8} L ${x + 8} ${y + 21} Z`
    : `M ${x - 8} ${y + 12} L ${x - 3} ${y + 12} L ${x - 5} ${y + 25} Z M ${x + 3} ${y + 12} L ${x + 8} ${y + 12} L ${x + 5} ${y + 25} Z`;

  const cockpit = isNebula
    ? `M ${x} ${y - 20} L ${x - 5} ${y - 7} L ${x} ${y + 1} L ${x + 5} ${y - 7} Z`
    : `M ${x} ${y - 21} L ${x - 4} ${y - 7} L ${x} ${y - 2} L ${x + 4} ${y - 7} Z`;

  return (
    <Group>
      <Path path={engines} color={glow} />
      <Path path={wings} color={accent} />
      <Path path={body} color={hull} />
      <Path path={cockpit} color={glow} />
      <Path
        path={`M ${x} ${y - 25} L ${x} ${y - 5}`}
        color="#FFFFFF"
        style="stroke"
        strokeWidth={1.5}
      />
      <Path
        path={`M ${x - 12} ${y + 5} L ${x - 8} ${y + 2} M ${x + 12} ${y + 5} L ${x + 8} ${y + 2}`}
        color={hull}
        style="stroke"
        strokeWidth={1.5}
      />
    </Group>
  );
}
