import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Animated,
  Pressable,
  Alert,
} from "react-native";
import { X, Lock, Eye, EyeOff, CheckCircle } from "lucide-react-native";
import { useRef, useState } from "react";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function ChangePasswordSheet({ visible, onClose }: Props) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showCon, setShowCon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const slideAnim = useRef(new Animated.Value(600)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  if (visible) {
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
      setCurrent("");
      setNext("");
      setConfirm("");
      setSuccess(false);
      onClose();
    });
  };

  const strengthScore = () => {
    let score = 0;
    if (next.length >= 8) score++;
    if (/[A-Z]/.test(next)) score++;
    if (/[0-9]/.test(next)) score++;
    if (/[^A-Za-z0-9]/.test(next)) score++;
    return score;
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", C.red, "#F0A500", "#3B82F6", C.green];
  const score = strengthScore();
  const passwordsMatch = next && confirm && next === confirm;

  const handleSave = () => {
    if (!current) return Alert.alert("Error", "Enter your current password.");
    if (next.length < 6)
      return Alert.alert(
        "Error",
        "New password must be at least 6 characters.",
      );
    if (next !== confirm)
      return Alert.alert("Error", "Passwords do not match.");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 60,
        friction: 10,
      }).start();
      setTimeout(() => handleClose(), 2200);
    }, 1400);
  };

  return (
    <Modal
      transparent
      visible={visible}
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
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>SECURITY</Text>
            <Text style={styles.title}>Change Password</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
            <X color="#888" size={18} />
          </TouchableOpacity>
        </View>
        <View style={styles.redRule} />

        {/* Fields */}
        <PasswordField
          label="Current Password"
          value={current}
          onChange={setCurrent}
          show={showCur}
          onToggle={() => setShowCur(!showCur)}
          accent={C.red}
        />

        <PasswordField
          label="New Password"
          value={next}
          onChange={setNext}
          show={showNew}
          onToggle={() => setShowNew(!showNew)}
          accent={C.black}
        />

        {/* Strength bar */}
        {next.length > 0 && (
          <View style={styles.strengthWrap}>
            <View style={styles.strengthBars}>
              {[1, 2, 3, 4].map((i) => (
                <View
                  key={i}
                  style={[
                    styles.strengthBar,
                    {
                      backgroundColor:
                        i <= score ? strengthColor[score] : "#E8E8EE",
                    },
                  ]}
                />
              ))}
            </View>
            <Text
              style={[styles.strengthLabel, { color: strengthColor[score] }]}
            >
              {strengthLabel[score]}
            </Text>
          </View>
        )}

        <PasswordField
          label="Confirm New Password"
          value={confirm}
          onChange={setConfirm}
          show={showCon}
          onToggle={() => setShowCon(!showCon)}
          accent={passwordsMatch ? C.green : C.black}
          rightCheck={!!passwordsMatch}
        />

        {/* Save */}
        <TouchableOpacity
          style={[
            styles.saveBtn,
            (!current || !next || !confirm || loading) && { opacity: 0.5 },
          ]}
          onPress={handleSave}
          activeOpacity={0.85}
          disabled={!current || !next || !confirm || loading}
        >
          <Text style={styles.saveBtnText}>
            {loading ? "Saving..." : "Update Password"}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Success overlay */}
      {success && (
        <View style={styles.successOverlay} pointerEvents="none">
          <Animated.View
            style={[styles.successCard, { transform: [{ scale: scaleAnim }] }]}
          >
            <View style={styles.successIcon}>
              <CheckCircle color={C.white} size={32} />
            </View>
            <Text style={styles.successTitle}>Password Updated!</Text>
            <Text style={styles.successSub}>
              Your password has been changed successfully.
            </Text>
          </Animated.View>
        </View>
      )}
    </Modal>
  );
}

// ── Reusable password input ──
function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
  accent,
  rightCheck = false,
}: {
  label: string;
  value: string;
  onChange: (t: string) => void;
  show: boolean;
  onToggle: () => void;
  accent: string;
  rightCheck?: boolean;
}) {
  return (
    <View style={pfStyles.wrap}>
      <Text style={pfStyles.label}>{label}</Text>
      <View
        style={[
          pfStyles.inputRow,
          { borderColor: value ? accent + "88" : "#E8E8EE" },
        ]}
      >
        <Lock
          color={value ? accent : "#CCC"}
          size={16}
          style={pfStyles.lockIcon}
        />
        <TextInput
          style={pfStyles.input}
          value={value}
          onChangeText={onChange}
          secureTextEntry={!show}
          placeholder="••••••••"
          placeholderTextColor="#CCC"
          autoCapitalize="none"
        />
        {rightCheck && value ? (
          <CheckCircle color={C.green} size={18} />
        ) : (
          <TouchableOpacity onPress={onToggle}>
            {show ? (
              <EyeOff color="#AAA" size={18} />
            ) : (
              <Eye color="#AAA" size={18} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const pfStyles = StyleSheet.create({
  wrap: { marginBottom: 16 },
  label: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#AAA",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F8F8FF",
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1.5,
  },
  lockIcon: { marginRight: 2 },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111111",
    paddingVertical: 14,
    letterSpacing: 2,
  },
});

const C_black = "#111111";
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  eyebrow: {
    color: C.red,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 4,
  },
  title: {
    color: C_black,
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
  redRule: {
    height: 3,
    width: 36,
    backgroundColor: C.red,
    borderRadius: 2,
    marginBottom: 24,
  },

  strengthWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: -8,
    marginBottom: 16,
  },
  strengthBars: { flexDirection: "row", gap: 4, flex: 1 },
  strengthBar: { flex: 1, height: 4, borderRadius: 2 },
  strengthLabel: {
    fontSize: 11,
    fontWeight: "800",
    width: 48,
    textAlign: "right",
  },

  saveBtn: {
    backgroundColor: C_black,
    borderRadius: 18,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: C_black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  saveBtnText: {
    color: C.white,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  successOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  successCard: {
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
  successIcon: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: C.green,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  successTitle: {
    color: C_black,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  successSub: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
