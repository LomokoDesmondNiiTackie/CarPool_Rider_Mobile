import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { AlertTriangle, Wallet } from "lucide-react-native";
import { useRef, useEffect } from "react";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

interface Props {
  balance: number;
  fee: number;
}

export default function InsufficientBalance({ balance, fee }: Props) {
  const router = useRouter();
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 8,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -8,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, [shakeAnim]);

  return (
    <View style={styles.screen}>
      <View style={styles.blobTopRight} />
      <View style={styles.blobBottomLeft} />

      <Animated.View
        style={[styles.wrap, { transform: [{ translateX: shakeAnim }] }]}
      >
        {/* Warning icon */}
        <View style={styles.warnIconOuter}>
          <View style={styles.warnIconInner}>
            <AlertTriangle color={C.white} size={36} strokeWidth={2} />
          </View>
        </View>

        <Text style={styles.eyebrow}>OOPS!</Text>
        <Text style={styles.title}>Insufficient{"\n"}Balance</Text>
        <View style={styles.redRule} />
        <Text style={styles.subtitle}>
          Your wallet balance is too low to complete this booking.
        </Text>

        {/* Balance comparison card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceCardRow}>
            <View style={styles.balanceCardItem}>
              <Text style={styles.balanceCardLabel}>YOUR BALANCE</Text>
              <Text style={[styles.balanceCardValue, { color: C.red }]}>
                GHC {balance.toFixed(2)}
              </Text>
            </View>
            <View style={styles.balanceCardDivider} />
            <View style={styles.balanceCardItem}>
              <Text style={styles.balanceCardLabel}>RIDE FEE</Text>
              <Text style={[styles.balanceCardValue, { color: C.green }]}>
                GHC {fee}
              </Text>
            </View>
          </View>

          <View style={styles.shortfallRow}>
            <Text style={styles.shortfallLabel}>You need</Text>
            <Text style={styles.shortfallValue}>
              GHC {(fee - balance).toFixed(2)} more
            </Text>
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.topUpBtn}
          onPress={() => router.push("/(tabs)/home")}
          activeOpacity={0.85}
        >
          <Wallet color={C.white} size={18} />
          <Text style={styles.topUpBtnText}>Top Up Wallet</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
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
  wrap: { alignItems: "flex-start" },

  warnIconOuter: {
    width: 90,
    height: 90,
    borderRadius: 26,
    backgroundColor: C.red + "18",
    borderWidth: 1.5,
    borderColor: C.red + "44",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  warnIconInner: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: C.red,
    alignItems: "center",
    justifyContent: "center",
  },

  eyebrow: {
    color: C.red,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 8,
  },
  title: {
    width: "50%",
    color: "#111111",
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
    marginBottom: 24,
  },

  balanceCard: {
    width: "100%",
    backgroundColor: C.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#111111",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 4,
  },
  balanceCardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  balanceCardItem: { alignItems: "center", gap: 4 },
  balanceCardLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#AAA",
    textTransform: "uppercase",
  },
  balanceCardValue: { fontSize: 22, fontWeight: "800" },
  balanceCardDivider: { width: 1, height: 40, backgroundColor: "#EBEBF0" },
  shortfallRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  shortfallLabel: { fontSize: 13, fontWeight: "600", color: "#888" },
  shortfallValue: { fontSize: 14, fontWeight: "800", color: C.red },

  topUpBtn: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#111111",
    borderRadius: 18,
    marginBottom: 12,
    shadowColor: "#111111",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  topUpBtnText: {
    color: C.white,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  homeBtn: {
    width: "100%",
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#DDD",
    backgroundColor: C.white,
  },
  homeBtnText: { color: "#111111", fontSize: 15, fontWeight: "700" },
});
