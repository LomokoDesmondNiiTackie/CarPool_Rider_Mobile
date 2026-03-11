import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useRideStore } from "@/store/ride.store";

const C = { black: "#111111", red: "#ff5a5f", white: "#f8f8ff", green: "#058c42" };

interface DropOffProps {
  text: string;
  isPreferred?: boolean;
  subtitle?: string;
}

export default function DropOff({ text, isPreferred = false, subtitle }: DropOffProps) {
  const router = useRouter();
  const { setDropoff } = useRideStore();

  const useDropoff = () => {
    setDropoff(text)
    router.push("/modals/confirm")
  }

  return (
    <TouchableOpacity
      style={[styles.card, isPreferred && styles.cardPreferred]}
      onPress={useDropoff }
      activeOpacity={0.82}
    >
      {/* Icon */}
      <View style={[styles.iconWrap, { backgroundColor: isPreferred ? C.green + "22" : "#F0F0F5" }]}>
        <Ionicons
          name={isPreferred ? "star" : "location-outline"}
          color={isPreferred ? C.green : "#888"}
          size={18}
        />
      </View>

      {/* Text */}
      <View style={styles.textBlock}>
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={1}>{text}</Text>
          {isPreferred && (
            <View style={styles.preferredBadge}>
              <Text style={styles.preferredBadgeText}>Preferred</Text>
            </View>
          )}
        </View>
        {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
      </View>

      {/* Arrow */}
      <View style={[styles.arrow, { borderColor: isPreferred ? C.green + "55" : "#E0E0E0" }]}>
        <Ionicons name="chevron-forward" color={isPreferred ? C.green : "#CCC"} size={16} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    borderWidth: 1.5,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardPreferred: {
    borderColor: C.green + "55",
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  textBlock: {
    flex: 1,
    gap: 3,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
    flexShrink: 1,
  },
  subtitle: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  preferredBadge: {
    backgroundColor: C.green + "22",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: C.green + "44",
  },
  preferredBadgeText: {
    color: C.green,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  arrow: {
    width: 30,
    height: 30,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});