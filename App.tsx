
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GameScreen } from "./src/game/GameScreen";
import { MenuScreen } from "./src/menu/MenuScreen";
import { LoadingScreen } from "./src/loading/LoadingScreen";

const BEST_SCORE_KEY = "novastrike_best_score";
const COINS_KEY = "novastrike_coins";
const DIAMONDS_KEY = "novastrike_diamonds";
const UNLOCKED_SHIPS_KEY = "novastrike_unlocked_ships";
const SELECTED_SHIP_KEY = "novastrike_selected_ship";

const POINTS_PER_DIAMOND = 2000;

export default function App() {
  const [screen, setScreen] = useState<"menu" | "game">("menu");
  const [bestScore, setBestScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const [unlockedShips, setUnlockedShips] = useState<string[]>(["nova"]);
  const [selectedShip, setSelectedShip] = useState("nova");
  const [gameKey, setGameKey] = useState(0);
  const [ready, setReady] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const awardedMilestonesRef = useRef(0);

  useEffect(() => {
    let active = true;

    async function loadSavedData() {
      try {
        const [
          savedBest,
          savedCoins,
          savedDiamonds,
          savedShips,
          savedSelectedShip,
        ] = await Promise.all([
          AsyncStorage.getItem(BEST_SCORE_KEY),
          AsyncStorage.getItem(COINS_KEY),
          AsyncStorage.getItem(DIAMONDS_KEY),
          AsyncStorage.getItem(UNLOCKED_SHIPS_KEY),
          AsyncStorage.getItem(SELECTED_SHIP_KEY),
        ]);

        const loadedBest = Math.max(0, Number(savedBest) || 0);
        const loadedCoins = Math.max(0, Number(savedCoins) || 0);
        const loadedDiamonds = Math.max(0, Number(savedDiamonds) || 0);

        if (!active) return;

        setBestScore(loadedBest);
        setCoins(loadedCoins);
        setDiamonds(loadedDiamonds);

        if (savedShips !== null) {
          try {
            const parsed: unknown = JSON.parse(savedShips);

            if (
              Array.isArray(parsed) &&
              parsed.includes("nova") &&
              parsed.every((ship) => typeof ship === "string")
            ) {
              setUnlockedShips(parsed);
            }
          } catch {
            console.warn("No se pudieron leer las naves guardadas.");
          }
        }

        if (savedSelectedShip !== null) {
          setSelectedShip(savedSelectedShip);
        }
      } catch (error) {
        console.warn("No se pudieron cargar los datos guardados.", error);
      } finally {
        if (active) setReady(true);
      }
    }

    loadSavedData();

    return () => {
      active = false;
    };
  }, []);

  const handleScoreChange = useCallback((score: number) => {
    const safeScore = Math.max(0, Math.floor(score));
    const currentMilestone = Math.floor(
      safeScore / POINTS_PER_DIAMOND
    );

    const diamondsEarned =
      currentMilestone - awardedMilestonesRef.current;

    if (diamondsEarned > 0) {
      awardedMilestonesRef.current = currentMilestone;

      setDiamonds((currentDiamonds) => {
        const updatedDiamonds = currentDiamonds + diamondsEarned;

        AsyncStorage.setItem(
          DIAMONDS_KEY,
          String(updatedDiamonds)
        ).catch((error) => {
          console.warn("No se pudieron guardar los diamantes.", error);
        });

        return updatedDiamonds;
      });
    }

    setBestScore((previousBest) => {
      if (safeScore <= previousBest) {
        return previousBest;
      }

      AsyncStorage.setItem(
        BEST_SCORE_KEY,
        String(safeScore)
      ).catch((error) => {
        console.warn("No se pudo guardar el récord.", error);
      });

      return safeScore;
    });
  }, []);

  const handleCoinsEarned = useCallback((amount: number) => {
    if (amount <= 0) return;

    setCoins((currentCoins) => {
      const updatedCoins = currentCoins + amount;

      AsyncStorage.setItem(
        COINS_KEY,
        String(updatedCoins)
      ).catch((error) => {
        console.warn("No se pudieron guardar las monedas.", error);
      });

      return updatedCoins;
    });
  }, []);

  const selectShip = (shipId: string) => {
    if (!unlockedShips.includes(shipId)) return;

    setSelectedShip(shipId);

    AsyncStorage.setItem(
      SELECTED_SHIP_KEY,
      shipId
    ).catch((error) => {
      console.warn("No se pudo guardar la nave seleccionada.", error);
    });
  };

  const buyShip = (shipId: string, price: number) => {
    if (unlockedShips.includes(shipId)) {
      selectShip(shipId);
      return;
    }

    if (coins < price) {
      Alert.alert(
        "MONEDAS INSUFICIENTES",
        "Seguí jugando para conseguir más monedas."
      );
      return;
    }

    const remaining = coins - price;
    const updatedShips = [...unlockedShips, shipId];

    setCoins(remaining);
    setUnlockedShips(updatedShips);
    setSelectedShip(shipId);

    Promise.all([
      AsyncStorage.setItem(COINS_KEY, String(remaining)),
      AsyncStorage.setItem(
        UNLOCKED_SHIPS_KEY,
        JSON.stringify(updatedShips)
      ),
      AsyncStorage.setItem(SELECTED_SHIP_KEY, shipId),
    ]).catch((error) => {
      console.warn("No se pudo guardar la compra.", error);
    });

    Alert.alert(
      "¡NAVE DESBLOQUEADA!",
      "Ya podés volar con esta nave."
    );
  };

  const startGame = () => {
    awardedMilestonesRef.current = 0;
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
    return <LoadingScreen onFinish={() => setShowLoading(false)} />;
  }

  return (
    <View style={styles.container}>
      {screen === "menu" ? (
        <MenuScreen
          bestScore={bestScore}
          coins={coins}
          diamonds={diamonds}
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
  container: {
    flex: 1,
    backgroundColor: "#02030F",
  },
  loading: {
    flex: 1,
    backgroundColor: "#02030F",
    alignItems: "center",
    justifyContent: "center",
  },
});
