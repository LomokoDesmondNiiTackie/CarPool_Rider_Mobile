import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronRight, Shield } from "lucide-react-native";
import { useState } from "react";
import LogoutRow from "./Logoutrow";
import ChangePasswordSheet from "./Changepasswordsheet";

const C = { black: "#111111", red: "#ff5a5f", white: "#f8f8ff", green: "#058c42" };

interface Props {
  icon: any;
  label: string;
  accent?: string;
  danger?: boolean;
  onPress?: () => void;
}

// ── Generic link row ──
export function LinkRow({ icon: Icon, label, accent = C.red, danger = false, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.icon, { backgroundColor: accent + "18" }]}>
        <Icon color={accent} size={16} />
      </View>
      <Text style={[styles.label, { color: danger ? C.red : C.black }]}>{label}</Text>
      <ChevronRight color="#CCC" size={16} />
    </TouchableOpacity>
  );
}

// ── Pre-wired account section ──
export default function AccountLinks() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* Change Password */}
      <LinkRow
        icon={Shield}
        label="Change Password"
        accent={C.red}
        onPress={() => setShowPassword(true)}
      />

      {/* Logout */}
      <LogoutRow />

      {/* Password sheet */}
      <ChangePasswordSheet
        visible={showPassword}
        onClose={() => setShowPassword(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  icon: {
    width: 36, height: 36, borderRadius: 11,
    alignItems: "center", justifyContent: "center",
  },
  label: {
    flex: 1, fontSize: 14, fontWeight: "700", color: C.black,
  },
});