import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const C = { black: "#111111", red: "#ff5a5f", white: "#f8f8ff", green: "#058c42" };

export default function Back() {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => router.back()} activeOpacity={0.8}>
      <Ionicons name="arrow-back" color={C.white} size={18} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: C.black,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: C.red + "55",
  },
});