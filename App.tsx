import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GameScreen } from "./src/game/GameScreen";
import { MenuScreen } from "./src/menu/MenuScreen";

const BEST_SCORE_KEY = "novastrike_best_score";
const COINS_KEY = "novastrike_coins";

export default function App() {
  const [screen, setScreen] = useState<"menu" | "game">("menu");
  const [bestScore, setBestScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [gameKey, setGameKey] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadSavedData() {
      try {
        const savedBest = await AsyncStorage.getItem(BEST_SCORE_KEY);
        const savedCoins = await AsyncStorage.getItem(COINS_KEY);

        if (savedBest !== null) {
          setBestScore(Number(savedBest) || 0);
        }

        if (savedCoins !== null) {
          setCoins(Number(savedCoins) || 0);
        }
      } catch (error) {
        console.warn("No se pudieron cargar los datos guardados.", error);
      } finally {
        setReady(true);
      }
    }

    loadSavedData();
  }, []);

  const handleScoreChange = (score: number) => {
    if (score <= bestScore) return;

    setBestScore(score);

    AsyncStorage.setItem(BEST_SCORE_KEY, String(score)).catch((error) => {
      console.warn("No se pudo guardar el récord.", error);
    });
  };

  const startGame = () => {
    setGameKey((current) => current + 1);
    setScreen("game");
  };

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#22D3EE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {screen === "menu" ? (
        <MenuScreen
          bestScore={bestScore}
          coins={coins}
          onPlay={startGame}
        />
      ) : (
        <GameScreen
          key={gameKey}
          onMainMenu={() => setScreen("menu")}
          onScoreChange={handleScoreChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#02030F" },
  loading: {
    flex: 1,
    backgroundColor: "#02030F",
    alignItems: "center",
    justifyContent: "center",
  },
});
