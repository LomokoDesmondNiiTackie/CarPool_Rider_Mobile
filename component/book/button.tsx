import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Sun, Moon, Clock } from "lucide-react-native";
import { useRideStore } from "@/store/ride.store";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

interface RideTypeProps {
  rideType: string;
  time?: string;
  price?: string;
  
  accent?: string;
}

export default function RideType({
  rideType,
  time = "6:30 AM",
  accent = C.red,
}: RideTypeProps) {
  const isMorning = rideType.toLowerCase().includes("morning");
  const Icon = isMorning ? Sun : Moon;
  const { setRideType } = useRideStore();

  const useRideType = () => {
    setRideType(rideType);
    router.push("/modals/destination")
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={useRideType}
      activeOpacity={0.88}
    >
      {/* Left accent bar */}
      <View style={[styles.accentBar, { backgroundColor: accent }]} />

      {/* Icon badge */}
      <View style={[styles.iconWrap, { backgroundColor: accent + "22" }]}>
        <Icon color={accent} size={22} />
      </View>

      {/* Main content */}
      <View style={styles.body}>
        <View style={styles.topRow}>
          <Text style={styles.rideTitle}>{rideType} Ride</Text>
        </View>

        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Clock color="#aaa" size={13} />
            <Text style={styles.metaText}>{time}</Text>
          </View>
        </View>
      </View>

      {/* Arrow */}
      <View style={[styles.arrow, { backgroundColor: accent + "18", borderColor: accent + "55" }]}>
        <Text style={[styles.arrowText, { color: accent }]}>→</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.white,
    borderRadius: 20,
    padding: 18,
    paddingLeft: 22,
    gap: 14,
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    overflow: "hidden",
  },
  accentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    gap: 8,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rideTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: C.black,
    letterSpacing: 0.2,
  },
  price: {
    fontSize: 15,
    fontWeight: "800",
  },
  meta: {
    gap: 4,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },
  arrow: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: {
    fontSize: 16,
    fontWeight: "700",
  },
});