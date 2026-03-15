import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>
      <Link href="/" style={styles.button}>
        Go back to Home screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3879c8",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    fontSize: 20,
    color: "#fff",
    borderColor: "#cacfc9",
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
});
