import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  MapPin,
  Calendar,
  Car,
  Wallet,
  CheckCircle,
  ChevronLeft,
} from "lucide-react-native";
import { useRideStore } from "@/store/ride.store";
import { useUserStore } from "@/store/user.store";
import InsufficientBalance from "@/component/book/Insufficientbalance";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

export default function Confirm() {
  const router = useRouter();
  const { rideType, dropoff, fee } = useRideStore();
  const { pickup, balance, setBalance } = useUserStore();

  // ── Guard: insufficient balance ──
  if (balance < fee) {
    return <InsufficientBalance balance={balance} fee={fee} />;
  }

  const details = [
    {
      icon: MapPin,
      label: "Route",
      value: `${pickup} → ${dropoff}`,
      accent: C.red,
    },
    {
      icon: Calendar,
      label: "Date",
      value: new Date().toDateString(),
      accent: C.red,
    },
    { icon: Car, label: "Ride Type", value: rideType, accent: C.green },
    { icon: Wallet, label: "Fee", value: `GHC ${fee}`, accent: C.green },
  ];

  const handleConfirm = () => {
    setBalance(balance - fee);
    router.push("/modals/booked");
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.screen}>
        <View style={styles.blobTopRight} />
        <View style={styles.blobBottomLeft} />

        <View style={styles.iconBadge}>
          <CheckCircle color={C.green} size={36} strokeWidth={1.8} />
        </View>

        <Text style={styles.eyebrow}>ALMOST THERE</Text>
        <Text style={styles.title}>Confirm{"\n"}Booking</Text>
        <View style={styles.redRule} />
        <Text style={styles.subtitle}>
          Please review your ride details before confirming.
        </Text>

        <View style={styles.card}>
          {details.map((item, i) => (
            <View
              key={item.label}
              style={[
                styles.row,
                i === details.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View
                style={[
                  styles.rowIcon,
                  { backgroundColor: item.accent + "18" },
                ]}
              >
                <item.icon color={item.accent} size={16} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={styles.rowValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Remaining balance preview */}
        <View style={styles.balanceCheckRow}>
          <Text style={styles.balanceCheckLabel}>Balance after booking</Text>
          <Text style={[styles.balanceCheckValue, { color: C.green }]}>
            GHC {(balance - fee).toFixed(2)}
          </Text>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <ChevronLeft color={C.black} size={18} />
            <Text style={styles.btnBackText}>Go Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnConfirm}
            onPress={handleConfirm}
            activeOpacity={0.85}
          >
            <CheckCircle color={C.white} size={18} />
            <Text style={styles.btnConfirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 24,
    justifyContent: "center",
    overflow: "hidden",
  },
  blobTopRight: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: C.red,
    opacity: 0.06,
  },
  blobBottomLeft: {
    position: "absolute",
    bottom: -60,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: C.green,
    opacity: 0.07,
  },
  iconBadge: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: C.green + "18",
    borderWidth: 1.5,
    borderColor: C.green + "44",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
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
    marginBottom: 14,
  },
  redRule: {
    height: 3,
    width: 36,
    backgroundColor: C.red,
    borderRadius: 2,
    marginBottom: 14,
  },
  subtitle: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 28,
  },

  card: {
    backgroundColor: C.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 16,
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: { flex: 1, gap: 2 },
  rowLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#AAA",
    textTransform: "uppercase",
  },
  rowValue: { fontSize: 14, fontWeight: "700", color: C.black },

  balanceCheckRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  balanceCheckLabel: { fontSize: 13, color: "#888", fontWeight: "500" },
  balanceCheckValue: { fontSize: 14, fontWeight: "800" },

  btnRow: { flexDirection: "row", gap: 12 },
  btnBack: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 54,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#DDD",
    backgroundColor: C.white,
  },
  btnBackText: { color: C.black, fontSize: 15, fontWeight: "700" },
  btnConfirm: {
    flex: 1.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 54,
    borderRadius: 16,
    backgroundColor: C.black,
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  btnConfirmText: {
    color: C.white,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
