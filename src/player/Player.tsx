import React from "react";
import { Path } from "@shopify/react-native-skia";

import {
  PLAYER as PLAYER_CONFIG,
  } from "../game/GameConfig";

  type PlayerProps = {
    x: number;
      y: number;
      };

      export function Player({ x, y }: PlayerProps) {
        const path = `
            M ${x} ${y - PLAYER_CONFIG.height / 2}
                L ${x - PLAYER_CONFIG.width / 2} ${y + PLAYER_CONFIG.height / 2}
                    L ${x} ${y + 6}
                        L ${x + PLAYER_CONFIG.width / 2} ${y + PLAYER_CONFIG.height / 2}
                            Z
                              `;

                                return (
                                    <Path
                                          path={path}
                                                color="#00E5FF"
                                                    />
                                                      );
                                                      }