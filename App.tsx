import React from "react";
import { View, StyleSheet } from "react-native";

import { GameScreen } from "./src/game/GameScreen";

export default function App() {
  return (
      <View style={styles.container}>
            <GameScreen />
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
                                      });