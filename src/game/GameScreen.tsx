import React, { useRef, useState } from "react";
import { Canvas, Rect } from "@shopify/react-native-skia";

import { GAME_WIDTH, GAME_HEIGHT } from "./GameConfig";
import { StarField } from "../world/StarField";
import { Player } from "../player/Player";
import { PlayerController } from "../player/PlayerController";

export function GameScreen() {
  const controller = useRef(new PlayerController()).current;

    const [playerPosition, setPlayerPosition] = useState(
        controller.getPosition()
          );

            function movePlayer(dx: number, dy: number) {
                controller.move(dx, dy, 0.016);
                    setPlayerPosition(controller.getPosition());
                      }

                        return (
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

                                                                                                                                    <Player
                                                                                                                                            x={playerPosition.x}
                                                                                                                                                    y={playerPosition.y}
                                                                                                                                                          />
                                                                                                                                                              </Canvas>
                                                                                                                                                                );
                                                                                                                                                                }