import { Link } from "expo-router";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        <View style={styles.glowTopRight} />
        <View style={styles.glowBottomLeft} />
        <Text style={styles.eyebrow}>CREATIVE STUDIO</Text>
        <Text style={styles.title}>Make every photo more fun.</Text>
        <Text style={styles.description}>
          FIPP helps you build playful image edits with expressive stickers in a
          clean, focused workflow.
        </Text>

        <View style={styles.statRow}>
          <View style={styles.statPill}>
            <Text style={styles.statValue}>3 Steps</Text>
            <Text style={styles.statLabel}>Pick, Decorate, Save</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.statValue}>Fast</Text>
            <Text style={styles.statLabel}>Built for quick edits</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Why FIPP</Text>
        <Text style={styles.sectionBody}>
          Designed for creators who want a lightweight editor that feels modern,
          responsive, and distraction-free.
        </Text>
      </View>

      <View style={styles.featuresCard}>
        <Text style={styles.sectionTitle}>What You Can Do</Text>

        <View style={styles.featureItem}>
          <View style={styles.featureDot} />
          <Text style={styles.featureText}>
            Import photos from your library
          </Text>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.featureDot} />
          <Text style={styles.featureText}>Add draggable emoji stickers</Text>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.featureDot} />
          <Text style={styles.featureText}>
            Save edited images directly to your device
          </Text>
        </View>

        <Link href="/" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Start Creating</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#111317",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    gap: 16,
  },
  heroCard: {
    backgroundColor: "#1a1f27",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#2c3440",
    padding: 22,
    overflow: "hidden",
  },
  glowTopRight: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    right: -60,
    top: -40,
    backgroundColor: "rgba(255, 211, 61, 0.16)",
  },
  glowBottomLeft: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    left: -65,
    bottom: -85,
    backgroundColor: "rgba(99, 182, 255, 0.14)",
  },
  eyebrow: {
    color: "#ffd33d",
    fontSize: 12,
    letterSpacing: 1.4,
    fontWeight: "700",
    marginBottom: 8,
    fontFamily: Platform.select({
      ios: "Avenir Next",
      android: "sans-serif-medium",
      default: "Segoe UI",
    }),
  },
  title: {
    color: "#f5f7fb",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "700",
    marginBottom: 10,
    fontFamily: Platform.select({
      ios: "Avenir Next",
      android: "sans-serif",
      default: "Segoe UI",
    }),
  },
  description: {
    color: "#c6cfdb",
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 18,
    fontFamily: Platform.select({
      ios: "Avenir Next",
      android: "sans-serif",
      default: "Segoe UI",
    }),
  },
  statRow: {
    flexDirection: "row",
    gap: 10,
  },
  statPill: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  statValue: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 3,
  },
  statLabel: {
    color: "#b7c2d2",
    fontSize: 12,
  },
  sectionCard: {
    backgroundColor: "#161b22",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#28313d",
  },
  featuresCard: {
    backgroundColor: "#161b22",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#28313d",
  },
  sectionTitle: {
    color: "#f6f8fc",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    fontFamily: Platform.select({
      ios: "Avenir Next",
      android: "sans-serif-medium",
      default: "Segoe UI",
    }),
  },
  sectionBody: {
    color: "#b4becc",
    fontSize: 15,
    lineHeight: 22,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffd33d",
    marginRight: 10,
  },
  featureText: {
    flex: 1,
    color: "#d5ddeb",
    fontSize: 15,
    lineHeight: 21,
  },
  primaryButton: {
    marginTop: 18,
    backgroundColor: "#ffd33d",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#f2c31e",
    paddingVertical: 13,
  },
  primaryButtonText: {
    color: "#111317",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
