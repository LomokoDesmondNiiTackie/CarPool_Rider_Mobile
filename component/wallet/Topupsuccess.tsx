import { View, Text, StyleSheet, Animated } from "react-native";
import { CheckCircle } from "lucide-react-native";
import { useRef, useEffect } from "react";
import { useWalletStore } from "@/store/wallet.store";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

interface Props {
  amount: string;
}

export default function TopUpSuccess({  amount }: Props) {
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const { showSuccess, setShowSuccess } = useWalletStore();

  useEffect(() => {
    if (!showSuccess) return;
    scaleAnim.setValue(0.7);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start();
    const timer = setTimeout(() => {
      Animated.timing(scaleAnim, {
        toValue: 0.7,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowSuccess(false));
    }, 2800);
    return () => clearTimeout(timer);
  }, [showSuccess, setShowSuccess, scaleAnim]);

  if (!showSuccess) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <Animated.View
        style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
      >
        <View style={styles.iconWrap}>
          <CheckCircle color={C.white} size={32} />
        </View>
        <Text style={styles.title}>Top Up Successful!</Text>
        <Text style={styles.sub}>GHC {amount} added to your wallet</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: C.white,
    borderRadius: 28,
    padding: 36,
    alignItems: "center",
    gap: 12,
    width: "78%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: C.green,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  title: {
    color: C.black,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  sub: { color: "#888", fontSize: 14, fontWeight: "500", textAlign: "center" },
});
