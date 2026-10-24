import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GameScreen } from "./src/game/GameScreen";
import { MenuScreen } from "./src/menu/MenuScreen";
import { LoadingScreen } from "./src/loading/LoadingScreen";

const BEST_SCORE_KEY = "novastrike_best_score";
const COINS_KEY = "novastrike_coins";
const UNLOCKED_SHIPS_KEY = "novastrike_unlocked_ships";
const SELECTED_SHIP_KEY = "novastrike_selected_ship";

export default function App() {
  const [screen, setScreen] = useState<"menu" | "game">("menu");
  const [bestScore, setBestScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [unlockedShips, setUnlockedShips] = useState<string[]>(["nova"]);
  const [selectedShip, setSelectedShip] = useState("nova");
  const [gameKey, setGameKey] = useState(0);
  const [ready, setReady] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    async function loadSavedData() {
      try {
        const savedBest = await AsyncStorage.getItem(BEST_SCORE_KEY);
        const savedCoins = await AsyncStorage.getItem(COINS_KEY);
        const savedShips = await AsyncStorage.getItem(UNLOCKED_SHIPS_KEY);
        const savedSelectedShip = await AsyncStorage.getItem(SELECTED_SHIP_KEY);

        if (savedBest !== null) {
          setBestScore(Number(savedBest) || 0);
        }

        if (savedCoins !== null) {
          setCoins(Number(savedCoins) || 0);
        }
        if (savedShips !== null) {
          try {
            const parsed = JSON.parse(savedShips);
            if (Array.isArray(parsed) && parsed.includes("nova")) setUnlockedShips(parsed);
          } catch { console.warn("No se pudieron leer las naves guardadas."); }
        }
        if (savedSelectedShip !== null) setSelectedShip(savedSelectedShip);
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

  const handleCoinsEarned = (amount: number) => {
    setCoins((currentCoins) => {
      const updatedCoins = currentCoins + amount;
      AsyncStorage.setItem(COINS_KEY, String(updatedCoins)).catch((error) => {
        console.warn("No se pudieron guardar las monedas.", error);
      });
      return updatedCoins;
    });
  };

  const buyShip = (shipId: string, price: number) => {
    if (unlockedShips.includes(shipId)) {
      selectShip(shipId);
      return;
    }
    if (coins < price) {
      Alert.alert("MONEDAS INSUFICIENTES", "Seguí jugando para conseguir más monedas.");
      return;
    }
    const remaining = coins - price;
    const updatedShips = [...unlockedShips, shipId];
    setCoins(remaining);
    setUnlockedShips(updatedShips);
    setSelectedShip(shipId);
    Promise.all([
      AsyncStorage.setItem(COINS_KEY, String(remaining)),
      AsyncStorage.setItem(UNLOCKED_SHIPS_KEY, JSON.stringify(updatedShips)),
      AsyncStorage.setItem(SELECTED_SHIP_KEY, shipId),
    ]).catch((error) => console.warn("No se pudo guardar la compra.", error));
    Alert.alert("¡NAVE DESBLOQUEADA!", "Ya podés volar con esta nave.");
  };

  const selectShip = (shipId: string) => {
    if (!unlockedShips.includes(shipId)) return;
    setSelectedShip(shipId);
    AsyncStorage.setItem(SELECTED_SHIP_KEY, shipId).catch((error) => {
      console.warn("No se pudo guardar la nave seleccionada.", error);
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

  if (showLoading) {
    return (
      <LoadingScreen onFinish={() => setShowLoading(false)} />
    );
  }

  return (
    <View style={styles.container}>
      {screen === "menu" ? (
        <MenuScreen
          bestScore={bestScore}
          coins={coins}
          unlockedShips={unlockedShips}
          selectedShip={selectedShip}
          onBuyShip={buyShip}
          onSelectShip={selectShip}
          onPlay={startGame}
        />
      ) : (
        <GameScreen
          key={gameKey}
          onMainMenu={() => setScreen("menu")}
          onScoreChange={handleScoreChange}
          onCoinsEarned={handleCoinsEarned}
          selectedShip={selectedShip}
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
