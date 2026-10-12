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
  onPlay: () => void;
};

export function MenuScreen({ bestScore, coins, onPlay }: Props) {
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
      <Text style={styles.tagline}>LA GALAXIA TE ESTÁ ESPERANDO</Text>

      <View style={styles.hero}>
        <Text style={styles.ship}>✦</Text>
        <Text style={styles.heroTitle}>PREPARA TU NAVE</Text>
        <Text style={styles.heroSubtitle}>
          Explora. Sobrevive. Conquista.
        </Text>
      </View>

      {section === "home" && (
        <>
          {button("▶  JUGAR", "Comenzar una nueva partida", onPlay, "#075985")}
          {button(
            "Ⅱ  CONTINUAR",
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
              <Text style={styles.statIcon}>🏆</Text>
              <Text style={styles.statLabel}>RÉCORD</Text>
              <Text style={styles.statValue}>{bestScore}</Text>
            </View>
          </View>

          {button("🛒  TIENDA", "Naves, armas y mejoras", () =>
            setSection("shop")
          )}
          {button("⚙  AJUSTES", "Opciones de juego", () =>
            setSection("settings")
          )}
        </>
      )}

      {section === "shop" && (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>TIENDA GALÁCTICA</Text>
          <Text style={styles.panelText}>
            Tus monedas: {coins}
          </Text>
          <Text style={styles.panelText}>
            🚀 Naves especiales — próximamente
          </Text>
          <Text style={styles.panelText}>
            ⚡ Armas mejoradas — próximamente
          </Text>
          <Text style={styles.panelText}>
            🛡️ Escudos y mejoras — próximamente
          </Text>
          <Text style={styles.note}>
            Primero construiremos el sistema de monedas y compras.
          </Text>
          {button("VOLVER", "Regresar al menú", () =>
            setSection("home")
          )}
        </View>
      )}

      {section === "settings" && (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>AJUSTES</Text>
          <Text style={styles.panelText}>🎵 Música: próximamente</Text>
          <Text style={styles.panelText}>🔊 Sonido: próximamente</Text>
          <Text style={styles.panelText}>
            🎮 Controles táctiles: activos
          </Text>
          {button("VOLVER", "Regresar al menú", () =>
            setSection("home")
          )}
        </View>
      )}

      <Text style={styles.footer}>NOVASTRIKE • VERSIÓN 1.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#02030F" },
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
  logoAccent: { color: "#22D3EE" },
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
  ship: { color: "#67E8F9", fontSize: 42 },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 4,
  },
  heroSubtitle: { color: "#94A3B8", fontSize: 12, marginTop: 5 },
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
  stats: { flexDirection: "row", gap: 10, marginBottom: 10 },
  statCard: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    backgroundColor: "#101A30",
    borderWidth: 1,
    borderColor: "#243B55",
  },
  statIcon: { fontSize: 23 },
  statLabel: {
    color: "#94A3B8",
    fontSize: 10,
    marginTop: 4,
    fontWeight: "bold",
  },
  statValue: {
    color: "#FDE68A",
    fontSize: 21,
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
  panelText: { color: "#FFFFFF", fontSize: 14, marginVertical: 8 },
  note: { color: "#94A3B8", fontSize: 12, marginVertical: 12 },
  footer: {
    color: "#475569",
    fontSize: 10,
    textAlign: "center",
    marginTop: 18,
  },
});
