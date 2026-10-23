
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

type Props = {
  bestScore: number;
  coins: number;
  diamonds: number;
  onPlay: () => void;
  unlockedShips: string[];
  selectedShip: string;
  onBuyShip: (shipId: string, price: number) => void;
  onSelectShip: (shipId: string) => void;
};

export function MenuScreen({
  bestScore,
  coins,
  diamonds,
  onPlay,
  unlockedShips,
  selectedShip,
  onBuyShip,
  onSelectShip,
}: Props) {
  const [section, setSection] = useState("home");

  const button = (
    label: string,
    subtitle: string,
    action: () => void,
    color = "#12344A"
  ) => (
    <TouchableOpacity
      key={label}
      style={[styles.button, { backgroundColor: color }]}
      onPress={action}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonTitle}>{label}</Text>
      <Text style={styles.buttonSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.screen}
    >
      <Text style={styles.eyebrow}>SPACE COMBAT • MOBILE</Text>

      <Text style={styles.logo}>
        NOVA<Text style={styles.logoAccent}>STRIKE</Text>
      </Text>

      <Text style={styles.tagline}>
        LA GALAXIA TE ESTÁ ESPERANDO
      </Text>

      <View style={styles.hero}>
        <Text style={styles.ship}>✦</Text>
        <Text style={styles.heroTitle}>PREPARA TU NAVE</Text>
        <Text style={styles.heroSubtitle}>
          Explora. Sobrevive. Conquista.
        </Text>
      </View>

      {section === "home" && (
        <>
          {button(
            "▶ JUGAR",
            "Comenzar una nueva partida",
            onPlay,
            "#075985"
          )}

          {button(
            "Ⅱ CONTINUAR",
            "Retomar una partida guardada",
            () =>
              Alert.alert(
                "CONTINUAR",
                "El guardado de partidas todavía está en desarrollo. ¡Pronto podrás retomar tu aventura!"
              )
          )}

          <View style={styles.stats}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🪙</Text>
              <Text style={styles.statLabel}>MONEDAS</Text>
              <Text style={styles.statValue}>{coins}</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statIcon}>💎</Text>
              <Text style={styles.statLabel}>DIAMANTES</Text>
              <Text style={styles.diamondValue}>{diamonds}</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🏆</Text>
              <Text style={styles.statLabel}>RÉCORD</Text>
              <Text style={styles.statValue}>{bestScore}</Text>
            </View>
          </View>

          {button(
            "🛒 TIENDA",
            "Naves, armas y mejoras",
            () => setSection("shop")
          )}

          {button(
            "⚙ AJUSTES",
            "Opciones de juego",
            () => setSection("settings")
          )}
        </>
      )}

      {section === "shop" && (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>TIENDA GALÁCTICA</Text>

          <Text style={styles.panelText}>
            🪙 SALDO: {coins} monedas
          </Text>

          <Text style={styles.panelText}>
            💎 DIAMANTES: {diamonds}
          </Text>

          <View style={styles.shipCard}>
            <Text style={[styles.shipPreview, { color: "#22D3EE" }]}>
              ▲
            </Text>
            <Text style={styles.shipName}>NOVA</Text>
            <Text style={styles.panelText}>
              Nave equilibrada • Gratis
            </Text>

            {button(
              selectedShip === "nova" ? "✓ EQUIPADA" : "EQUIPAR",
              "Nave inicial",
              () => onSelectShip("nova"),
              "#075985"
            )}
          </View>

          <View style={styles.shipCard}>
            <Text style={[styles.shipPreview, { color: "#38BDF8" }]}>
              ◆
            </Text>
            <Text style={styles.shipName}>PHANTOM</Text>
            <Text style={styles.panelText}>
              Diseño azul • 50 monedas
            </Text>

            {button(
              selectedShip === "phantom"
                ? "✓ EQUIPADA"
                : unlockedShips.includes("phantom")
                  ? "EQUIPAR"
                  : "🪙 COMPRAR · 50",
              unlockedShips.includes("phantom")
                ? "Ya es tuya"
                : "Desbloqueá esta nave",
              () =>
                unlockedShips.includes("phantom")
                  ? onSelectShip("phantom")
                  : onBuyShip("phantom", 50),
              "#164E63"
            )}
          </View>

          <View style={styles.shipCard}>
            <Text style={[styles.shipPreview, { color: "#C084FC" }]}>
              ✦
            </Text>
            <Text style={styles.shipName}>NEBULA</Text>
            <Text style={styles.panelText}>
              Diseño violeta • 100 monedas
            </Text>

            {button(
              selectedShip === "nebula"
                ? "✓ EQUIPADA"
                : unlockedShips.includes("nebula")
                  ? "EQUIPAR"
                  : "🪙 COMPRAR · 100",
              unlockedShips.includes("nebula")
                ? "Ya es tuya"
                : "Desbloqueá esta nave",
              () =>
                unlockedShips.includes("nebula")
                  ? onSelectShip("nebula")
                  : onBuyShip("nebula", 100),
              "#4C1D95"
            )}
          </View>

          <Text style={styles.note}>
            Las naves compradas se guardan en este dispositivo.
          </Text>

          {button(
            "VOLVER",
            "Regresar al menú",
            () => setSection("home")
          )}
        </View>
      )}

      {section === "settings" && (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>AJUSTES</Text>

          <Text style={styles.panelText}>
            🎵 Música: próximamente
          </Text>

          <Text style={styles.panelText}>
            🔊 Sonido: próximamente
          </Text>

          <Text style={styles.panelText}>
            🎮 Controles táctiles: activos
          </Text>

          {button(
            "VOLVER",
            "Regresar al menú",
            () => setSection("home")
          )}
        </View>
      )}

      <Text style={styles.footer}>
        NOVASTRIKE • VERSIÓN 1.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#02030F",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 45,
    paddingBottom: 30,
    alignItems: "stretch",
  },
  eyebrow: {
    color: "#67E8F9",
    textAlign: "center",
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: "bold",
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 8,
    letterSpacing: 1,
  },
  logoAccent: {
    color: "#22D3EE",
  },
  tagline: {
    color: "#94A3B8",
    textAlign: "center",
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 5,
    marginBottom: 22,
  },
  hero: {
    height: 145,
    borderWidth: 1,
    borderColor: "#164E63",
    borderRadius: 18,
    backgroundColor: "#07172C",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  ship: {
    color: "#67E8F9",
    fontSize: 42,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 4,
  },
  heroSubtitle: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    minHeight: 62,
    borderWidth: 1,
    borderColor: "#164E63",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonSubtitle: {
    color: "#BAE6FD",
    fontSize: 11,
    marginTop: 3,
  },
  stats: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  statCard: {
    flex: 1,
    minWidth: 0,
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 2,
    alignItems: "center",
    backgroundColor: "#101A30",
    borderWidth: 1,
    borderColor: "#243B55",
  },
  statIcon: {
    fontSize: 23,
  },
  statLabel: {
    color: "#94A3B8",
    fontSize: 9,
    marginTop: 4,
    fontWeight: "bold",
    textAlign: "center",
  },
  statValue: {
    color: "#FDE68A",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 3,
  },
  diamondValue: {
    color: "#67E8F9",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 3,
  },
  panel: {
    backgroundColor: "#0B172A",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#164E63",
    padding: 16,
    marginTop: 8,
  },
  panelTitle: {
    color: "#67E8F9",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
  },
  panelText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginVertical: 8,
  },
  shipCard: {
    backgroundColor: "#101A30",
    borderWidth: 1,
    borderColor: "#243B55",
    borderRadius: 12,
    padding: 12,
    marginVertical: 7,
  },
  shipPreview: {
    fontSize: 42,
    textAlign: "center",
  },
  shipName: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },
  note: {
    color: "#94A3B8",
    fontSize: 12,
    marginVertical: 12,
  },
  footer: {
    color: "#475569",
    fontSize: 10,
    textAlign: "center",
    marginTop: 18,
  },
});
