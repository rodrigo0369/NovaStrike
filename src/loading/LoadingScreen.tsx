import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from "react-native";

type LoadingScreenProps = {
  onFinish: () => void;
};

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: 2600,
      useNativeDriver: false,
    });

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0.45,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start(({ finished }) => {
      if (finished) onFinish();
    });
    pulse.start();

    return () => {
      animation.stop();
      pulse.stop();
    };
  }, [glow, onFinish, progress]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.stars}>
        {Array.from({ length: 48 }, (_, index) => (
          <View
            key={index}
            style={[
              styles.star,
              {
                left: `${(index * 37 + 11) % 100}%`,
                top: `${(index * 61 + 7) % 100}%`,
                opacity: 0.25 + ((index * 13) % 70) / 100,
                width: index % 7 === 0 ? 3 : 2,
                height: index % 7 === 0 ? 3 : 2,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.planet} />
      <View style={styles.content}>
        <Animated.Text style={[styles.ship, { opacity: glow }]}>
          ✦
        </Animated.Text>

        <Text style={styles.title}>NOVA</Text>
        <Text style={styles.titleAccent}>STRIKE</Text>
        <Text style={styles.subtitle}>DEFENDE LA GALAXIA</Text>

        <View style={styles.shipIcon}>
          <Text style={styles.shipEmoji}>▲</Text>
          <View style={styles.shipGlow} />
        </View>

        <Text style={styles.loadingText}>PREPARANDO LA MISIÓN...</Text>

        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, { width: progressWidth }]}
          />
        </View>
      </View>

      <Text style={styles.credit}>CREATED BY RODRIGO IRALA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02030F",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  stars: {
    ...StyleSheet.absoluteFill,
  },
  star: {
    position: "absolute",
    backgroundColor: "#C4F5FF",
    borderRadius: 4,
  },
  planet: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    top: "16%",
    right: "-35%",
    backgroundColor: "#111B48",
    borderWidth: 2,
    borderColor: "#164E83",
    opacity: 0.7,
  },
  content: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  ship: {
    color: "#67E8F9",
    fontSize: 46,
    marginBottom: 6,
    textShadowColor: "#22D3EE",
    textShadowRadius: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: 8,
  },
  titleAccent: {
    color: "#22D3EE",
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: 8,
    marginTop: -8,
    textShadowColor: "#0891B2",
    textShadowRadius: 18,
  },
  subtitle: {
    color: "#A5B4FC",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 4,
    marginTop: 12,
  },
  shipIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 130,
    marginTop: 45,
    marginBottom: 35,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: "#164E83",
    backgroundColor: "rgba(8, 47, 73, 0.35)",
  },
  shipEmoji: {
    color: "#67E8F9",
    fontSize: 72,
    textShadowColor: "#22D3EE",
    textShadowRadius: 22,
  },
  shipGlow: {
    position: "absolute",
    bottom: 20,
    width: 42,
    height: 3,
    borderRadius: 4,
    backgroundColor: "#22D3EE",
  },
  loadingText: {
    color: "#BAE6FD",
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 13,
  },
  progressTrack: {
    width: "82%",
    height: 5,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#132943",
    borderWidth: 1,
    borderColor: "#164E83",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#22D3EE",
  },
  credit: {
    position: "absolute",
    bottom: 28,
    color: "#94A3B8",
    fontSize: 10,
    letterSpacing: 2,
  },
});
