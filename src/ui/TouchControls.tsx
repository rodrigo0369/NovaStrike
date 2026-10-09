import React, { useRef } from "react";
import {
  PanResponder,
  StyleSheet,
  View,
} from "react-native";

type TouchControlsProps = {
  onMove: (dx: number, dy: number) => void;
};

export function TouchControls({
  onMove,
}: TouchControlsProps) {
  const lastX = useRef(0);
  const lastY = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (event) => {
        lastX.current = event.nativeEvent.pageX;
        lastY.current = event.nativeEvent.pageY;
      },

      onPanResponderMove: (event) => {
        const currentX = event.nativeEvent.pageX;
        const currentY = event.nativeEvent.pageY;

        const deltaX = currentX - lastX.current;
        const deltaY = currentY - lastY.current;

        lastX.current = currentX;
        lastY.current = currentY;

        const sensitivity = 0.06;

        onMove(
          Math.max(-1, Math.min(1, deltaX * sensitivity)),
          Math.max(-1, Math.min(1, deltaY * sensitivity))
        );
      },

      onPanResponderRelease: () => {
        onMove(0, 0);
      },

      onPanResponderTerminate: () => {
        onMove(0, 0);
      },
    })
  ).current;

  return (
    <View
      {...panResponder.panHandlers}
      style={StyleSheet.absoluteFill}
    />
  );
}
