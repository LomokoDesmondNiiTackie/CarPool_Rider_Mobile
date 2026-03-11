import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import { useWalletStore } from "@/store/wallet.store";
import { useUserStore } from "@/store/user.store";
import TopUpSheet from "./Topupsheet";
import TopUpSuccess from "./Topupsuccess";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

export default function Wallet() {
  const open = useWalletStore((state) => state.openTopUp);
  const { setShowSuccess } = useWalletStore();
  const { balance, setBalance } = useUserStore();

  const [lastAmount, setLastAmount] = useState("");

  const adaEquivalent = (balance * 0.0048).toFixed(4);

  const handleSuccess = (amount: string) => {
    setBalance(balance + parseFloat(amount));
    setLastAmount(amount);
    setShowSuccess(true);
  };

  return (
    <View style={styles.screen}>
      {/* ── WALLET CARD ── */}
      <LinearGradient
        colors={["#1c1c1c", C.black, "#0a0a0a"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.blobRed} />
        <View style={styles.blobGreen} />

        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>MY WALLET</Text>
            <Text style={styles.cardSub}>Carpool Balance</Text>
          </View>
          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeTxt}>Active</Text>
          </View>
        </View>

        <View style={styles.redRule} />

        <View style={styles.balanceBlock}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.currencyTag}>GHC</Text>
            <Text style={styles.amountText}>
              {balance.toLocaleString("en-GH", { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={styles.balanceFooter}>
            <Text style={styles.adaLine}>◈ ≈ {adaEquivalent} ADA</Text>
            <Pressable style={styles.topUpBtn} onPress={open}>
              <View style={styles.topUpIconWrap}>
                <Plus color={C.white} size={14} />
              </View>
              <Text style={styles.topUpLabel}>Top Up</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      {/* ── TOP UP SHEET ── */}
      <TopUpSheet onSuccess={handleSuccess} />

      {/* ── SUCCESS TOAST ── */}
      <TopUpSuccess amount={lastAmount} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {},
  card: {
    borderRadius: 28,
    padding: 26,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 14,
  },
  blobRed: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: C.red,
    opacity: 0.09,
  },
  blobGreen: {
    position: "absolute",
    bottom: -40,
    left: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: C.green,
    opacity: 0.09,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  cardTitle: {
    color: C.red,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 3,
  },
  cardSub: {
    color: "rgba(248,248,255,0.38)",
    fontSize: 15,
    marginTop: 3,
    letterSpacing: 0.4,
  },
  activeBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: C.green + "55",
    backgroundColor: C.green + "18",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.green,
    marginRight: 5,
  },
  activeTxt: { color: C.green, fontSize: 15, fontWeight: "700" },
  redRule: {
    height: 2,
    width: "30%",
    backgroundColor: C.red,
    borderRadius: 2,
    opacity: 0.7,
    marginBottom: 22,
  },
  balanceBlock: {},
  balanceLabel: {
    color: "rgba(248,248,255,0.38)",
    fontSize: 15,
    letterSpacing: 1.4,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  balanceRow: { flexDirection: "row", alignItems: "flex-end", gap: 6 },
  currencyTag: {
    color: "rgba(248,248,255,0.45)",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 8,
  },
  amountText: {
    color: C.white,
    fontSize: 52,
    fontWeight: "800",
    letterSpacing: -2,
    lineHeight: 58,
  },
  adaLine: {
    color: "rgba(248,248,255,0.32)",
    fontSize: 15,
    letterSpacing: 0.4,
  },
  balanceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  topUpBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: C.red + "22",
    borderWidth: 1,
    borderColor: C.red + "55",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  topUpIconWrap: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: C.red,
    alignItems: "center",
    justifyContent: "center",
  },
  topUpLabel: {
    color: C.red,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
