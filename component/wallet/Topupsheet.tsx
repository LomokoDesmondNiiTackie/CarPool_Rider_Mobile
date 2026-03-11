import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import {
  X,
  CreditCard,
  Smartphone,
  Building2,
} from "lucide-react-native";
import { useRef, useState } from "react";
import { useWalletStore } from "@/store/wallet.store";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

const METHODS = [
  { id: "momo", label: "Mobile Money", icon: Smartphone, accent: C.green },
  { id: "card", label: "Card", icon: CreditCard, accent: C.red },
  { id: "bank", label: "Bank Transfer", icon: Building2, accent: C.black },
];

const QUICK_AMOUNTS = ["20", "50", "100", "200"];

interface Props {
  onSuccess: (amount: string) => void;
}

export default function TopUpSheet({ onSuccess }: Props) {
  const { showTopUp } = useWalletStore();
  const close = useWalletStore((state) => state.closeTopUp);
  
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("momo");
  const [loading, setLoading] = useState(false);

  const slideAnim = useRef(new Animated.Value(600)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animate in when visible changes to true
  if (showTopUp) {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start();
  }

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 600,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAmount("");
      close();
    });
  };

  const handleConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleClose();
      setTimeout(() => onSuccess(amount), 200);
    }, 1400);
  };

  return (
    <Modal
      transparent
      visible={showTopUp}
      animationType="none"
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <Pressable style={{ flex: 1 }} onPress={handleClose} />
      </Animated.View>

      {/* Sheet */}
      <Animated.View
        style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.sheetHeader}>
          <View>
            <Text style={styles.sheetEyebrow}>ADD FUNDS</Text>
            <Text style={styles.sheetTitle}>Top Up Wallet</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
            <X color="#888" size={18} />
          </TouchableOpacity>
        </View>
        <View style={styles.sheetRedRule} />

        {/* Amount input */}
        <Text style={styles.inputLabel}>ENTER AMOUNT (GHC)</Text>
        <View style={styles.amountInputWrap}>
          <Text style={styles.inputCurrency}>GHC</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={(t) => setAmount(t.replace(/[^0-9.]/g, ""))}
            placeholder="0.00"
            placeholderTextColor="#CCC"
            keyboardType="decimal-pad"
          />
        </View>

        {/* Quick amounts */}
        <View style={styles.quickRow}>
          {QUICK_AMOUNTS.map((q) => (
            <TouchableOpacity
              key={q}
              style={[styles.quickBtn, amount === q && styles.quickBtnActive]}
              onPress={() => setAmount(q)}
            >
              <Text
                style={[
                  styles.quickText,
                  amount === q && styles.quickTextActive,
                ]}
              >
                +{q}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment method */}
        <Text style={styles.inputLabel}>PAYMENT METHOD</Text>
        <View style={styles.methodRow}>
          {METHODS.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[
                styles.methodBtn,
                method === m.id && {
                  borderColor: m.accent,
                  backgroundColor: m.accent + "12",
                },
              ]}
              onPress={() => setMethod(m.id)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.methodIcon,
                  { backgroundColor: m.accent + "18" },
                ]}
              >
                <m.icon color={m.accent} size={16} />
              </View>
              <Text
                style={[
                  styles.methodLabel,
                  method === m.id && { color: m.accent },
                ]}
              >
                {m.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Confirm */}
        <TouchableOpacity
          style={[styles.confirmBtn, (!amount || loading) && { opacity: 0.5 }]}
          onPress={handleConfirm}
          activeOpacity={0.85}
          disabled={!amount || loading}
        >
          <Text style={styles.confirmText}>
            {loading ? "Processing..." : `Add GHC ${amount || "0.00"}`}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: C.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 44,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DDD",
    alignSelf: "center",
    marginBottom: 20,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  sheetEyebrow: {
    color: C.red,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 4,
  },
  sheetTitle: {
    color: C.black,
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  sheetRedRule: {
    height: 3,
    width: 36,
    backgroundColor: C.red,
    borderRadius: 2,
    marginBottom: 24,
  },

  inputLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#AAA",
    marginBottom: 10,
  },
  amountInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F5F5FA",
    borderRadius: 16,
    paddingHorizontal: 18,
    borderWidth: 1.5,
    borderColor: "#EBEBF0",
    marginBottom: 14,
  },
  inputCurrency: { fontSize: 16, fontWeight: "700", color: "#AAA" },
  amountInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: "800",
    color: C.black,
    paddingVertical: 14,
  },

  quickRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  quickBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  quickBtnActive: { borderColor: C.red, backgroundColor: C.red + "12" },
  quickText: { fontSize: 13, fontWeight: "700", color: "#888" },
  quickTextActive: { color: C.red },

  methodRow: { flexDirection: "row", gap: 10, marginBottom: 28 },
  methodBtn: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E8E8EE",
    backgroundColor: "#FAFAFA",
  },
  methodIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  methodLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#888",
    textAlign: "center",
  },

  confirmBtn: {
    backgroundColor: C.black,
    borderRadius: 18,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  confirmText: {
    color: C.white,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
