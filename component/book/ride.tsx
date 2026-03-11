import { View, Text, StyleSheet } from "react-native";
import RideType from "./button";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

const rides = [
  {
    rideType: "Morning",
    time: "6:30 AM – 9:00 AM",
    accent: C.red,
  },
  {
    rideType: "Evening",
    time: "4:30 PM – 7:00 PM",
    accent: C.green,
  },
];

export default function BookRide() {
  return (
    <View
      style={styles.screen}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Secure Your Spot Now</Text>
        <View style={styles.redRule} />
      </View>

      {/* Ride Cards */}
      <View style={styles.cards}>
        {rides.map((ride) => (
          <RideType
            key={ride.rideType}
            rideType={ride.rideType}
            time={ride.time}
            accent={ride.accent}
          />
        ))}
      </View>

      <Text style={styles.footnote}>
        ● Rides depart on schedule. Book early to guarantee your seat.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F8FF"
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 32,
  },
  eyebrow: {
    color: C.red,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 8,
  },
  title: {
    color: C.black,
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: -1,
    lineHeight: 44,
    marginBottom: 16,
  },
  redRule: {
    height: 3,
    width: 40,
    backgroundColor: C.red,
    borderRadius: 2,
  },
  cards: {
    gap: 16,
    marginBottom: 28,
  },
  footnote: {
    color: "#999",
    fontSize: 12,
    letterSpacing: 0.2,
    textAlign: "center",
  },
});