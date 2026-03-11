import { View, TextInput, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const C = { black: "#111111", red: "#ff5a5f", white: "#f8f8ff", green: "#058c42" };

export default function Search({ value, onChange }: { value?: string; onChange?: (t: string) => void }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" color={"#AAA"} size={18} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search destinations..."
        placeholderTextColor="#AAA"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.white,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E8E8EE",
    paddingHorizontal: 14,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#111111",
    fontWeight: "500",
  },
});