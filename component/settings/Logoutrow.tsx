import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
} from "react-native";
import { LogOut, X, AlertTriangle } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/auth.store";
import { useState, useRef } from "react";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

export default function LogoutRow() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const [visible, setVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openDialog = () => {
    setVisible(true);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 65,
        friction: 10,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDialog = (cb?: () => void) => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      cb?.();
    });
  };

  const handleConfirm = () => {
    closeDialog(() => {
      logout();
      router.replace("/auth/login");
    });
  };

  return (
    <>
      {/* Row trigger */}
      <TouchableOpacity
        style={styles.row}
        onPress={openDialog}
        activeOpacity={0.7}
      >
        <View style={styles.icon}>
          <LogOut color={C.red} size={16} />
        </View>
        <Text style={styles.label}>Log Out</Text>
      </TouchableOpacity>

      {/* Custom dialog */}
      <Modal
        transparent
        visible={visible}
        animationType="none"
        statusBarTranslucent
      >
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <Pressable style={{ flex: 1 }} onPress={() => closeDialog()} />
        </Animated.View>

        {/* Card */}
        <View style={styles.centered}>
          <Animated.View
            style={[
              styles.card,
              { transform: [{ scale: scaleAnim }], opacity: fadeAnim },
            ]}
          >
            {/* Close button */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => closeDialog()}
            >
              <X color="#AAA" size={16} />
            </TouchableOpacity>

            {/* Icon */}
            <View style={styles.iconWrapOuter}>
              <View style={styles.iconWrapInner}>
                <AlertTriangle color={C.white} size={28} strokeWidth={2} />
              </View>
            </View>

            {/* Text */}
            <Text style={styles.dialogEyebrow}>CONFIRM ACTION</Text>
            <Text style={styles.dialogTitle}>Log Out?</Text>
            <View style={styles.redRule} />
            <Text style={styles.dialogSub}>
              Are you sure you want to log out of your Carpool account?
            </Text>

            {/* Buttons */}
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => closeDialog()}
                activeOpacity={0.8}
              >
                <Text style={styles.btnCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnConfirm}
                onPress={handleConfirm}
                activeOpacity={0.85}
              >
                <LogOut color={C.white} size={16} />
                <Text style={styles.btnConfirmText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  // Row
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: C.red + "18",
    alignItems: "center",
    justifyContent: "center",
  },
  label: { flex: 1, fontSize: 14, fontWeight: "700", color: C.red },

  // Modal
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  centered: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  card: {
    width: "100%",
    backgroundColor: C.white,
    borderRadius: 28,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 16,
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },

  // Icon
  iconWrapOuter: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: C.red + "18",
    borderWidth: 1.5,
    borderColor: C.red + "44",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconWrapInner: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: C.red,
    alignItems: "center",
    justifyContent: "center",
  },

  // Text
  dialogEyebrow: {
    color: C.red,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 6,
  },
  dialogTitle: {
    color: C.black,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  redRule: {
    height: 3,
    width: 32,
    backgroundColor: C.red,
    borderRadius: 2,
    marginBottom: 12,
  },
  dialogSub: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 28,
  },

  // Buttons
  btnRow: { flexDirection: "row", gap: 12, width: "100%" },
  btnCancel: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#DDD",
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
  },
  btnCancelText: { color: C.black, fontSize: 15, fontWeight: "700" },
  btnConfirm: {
    flex: 1.3,
    height: 52,
    borderRadius: 16,
    backgroundColor: C.red,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    shadowColor: C.red,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  btnConfirmText: { color: C.white, fontSize: 15, fontWeight: "800" },
});
