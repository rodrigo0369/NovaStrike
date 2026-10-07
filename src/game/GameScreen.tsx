import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Canvas, Rect } from "@shopify/react-native-skia";

import { GAME_WIDTH, GAME_HEIGHT } from "./GameConfig";
import { StarField } from "../world/StarField";
import { Player } from "../player/Player";
import { PlayerController } from "../player/PlayerController";
import { TouchControls } from "../ui/TouchControls";

export function GameScreen() {
  const controller = useRef(new PlayerController()).current;

    const direction = useRef({
        x: 0,
            y: 0,
              });

                const [playerPosition, setPlayerPosition] = useState(
                    controller.getPosition()
                      );

                        useEffect(() => {
                            let animationFrame: number;
                                let lastTime = performance.now();

                                    const update = (currentTime: number) => {
                                          const deltaTime = Math.min(
                                                  (currentTime - lastTime) / 1000,
                                                          0.05
                                                                );

                                                                      lastTime = currentTime;

                                                                            controller.move(
                                                                                    direction.current.x,
                                                                                            direction.current.y,
                                                                                                    deltaTime
                                                                                                          );

                                                                                                                setPlayerPosition(controller.getPosition());

                                                                                                                      animationFrame = requestAnimationFrame(update);
                                                                                                                          };

                                                                                                                              animationFrame = requestAnimationFrame(update);

                                                                                                                                  return () => {
                                                                                                                                        cancelAnimationFrame(animationFrame);
                                                                                                                                            };
                                                                                                                                              }, [controller]);

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

                                                                                                                                                                                                                                                                                                <Player
                                                                                                                                                                                                                                                                                                          x={playerPosition.x}
                                                                                                                                                                                                                                                                                                                    y={playerPosition.y}
                                                                                                                                                                                                                                                                                                                            />
                                                                                                                                                                                                                                                                                                                                  </Canvas>

                                                                                                                                                                                                                                                                                                                                        <TouchControls
                                                                                                                                                                                                                                                                                                                                                onMove={(dx, dy) => {
                                                                                                                                                                                                                                                                                                                                                          direction.current.x = dx;
                                                                                                                                                                                                                                                                                                                                                                    direction.current.y = dy;
                                                                                                                                                                                                                                                                                                                                                                            }}
                                                                                                                                                                                                                                                                                                                                                                                  />
                                                                                                                                                                                                                                                                                                                                                                                      </View>
                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                        const styles = StyleSheet.create({
                                                                                                                                                                                                                                                                                                                                                                                          container: {
                                                                                                                                                                                                                                                                                                                                                                                              flex: 1,
                                                                                                                                                                                                                                                                                                                                                                                                  backgroundColor: "#02030F",
                                                                                                                                                                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                                                                                                                                                                    });