import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Phone, MapPin, Navigation,Shield } from 'lucide-react-native';
import { useState } from 'react';
import EditableField from '@/component/settings/editableField';
import { LinkRow } from '@/component/settings/linkRow';
import { Section, Divider } from '@/component/settings/sectionDivider';
import LogoutRow from '@/component/settings/Logoutrow';
import ChangePasswordSheet from '@/component/settings/Changepasswordsheet';
import { useUserStore } from '@/store/user.store';

const C = { black: "#111111", red: "#ff5a5f", white: "#f8f8ff", green: "#058c42" };

export default function SettingsPage() {
  const {
    fullname, email, phone, pickup, dropoff,
    setFullName, setEmail, setPhone, setPickUp, setDropOff,
  } = useUserStore();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.screen}>

      {/* ── Fixed header (does not scroll) ── */}
      <View style={styles.header}>
        <Text style={styles.eyebrow}>ACCOUNT</Text>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.redRule} />
      </View>

      {/* ── Fixed avatar row (does not scroll) ── */}
      <View style={styles.avatarRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitials}>
            {fullname.split(" ").map((n) => n[0]).join("")}
          </Text>
        </View>
        <View>
          <Text style={styles.avatarName}>{fullname}</Text>
          <Text style={styles.avatarEmail}>{email}</Text>
          <View style={styles.avatarBadge}>
            <View style={styles.avatarBadgeDot} />
            <Text style={styles.avatarBadgeText}>Active rider</Text>
          </View>
        </View>
      </View>

      {/* ── Scrollable content ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Personal Info */}
        <Section title="PERSONAL INFO">
          <EditableField icon={User}  label="Full Name" value={fullname} accent={C.red}   setValue={setFullName} />
          <Divider />
          <EditableField icon={Mail}  label="Email"     value={email}    accent={C.red}   setValue={setEmail}    keyboardType="email-address" />
          <Divider />
          <EditableField icon={Phone} label="Phone"     value={phone}    accent={C.red}   setValue={setPhone}    keyboardType="phone-pad" />
        </Section>

        {/* Preferred Locations */}
        <Section title="PREFERRED LOCATIONS">
          <EditableField icon={MapPin}     label="Pickup Point"   value={pickup}  accent={C.green} setValue={setPickUp} />
          <Divider />
          <EditableField icon={Navigation} label="Drop-off Point" value={dropoff} accent={C.green} setValue={setDropOff} />
        </Section>

        {/* Account */}
        <Section title="ACCOUNT">
          <LinkRow
            icon={Shield}
            label="Change Password"
            accent={C.red}
            onPress={() => setShowPassword(true)}
          />
          <Divider />
          <LogoutRow />
        </Section>

        <Text style={styles.version}>Carpool Rider v1.0.0</Text>
      </ScrollView>

      {/* ── Change password sheet (rendered outside scroll) ── */}
      <ChangePasswordSheet
        visible={showPassword}
        onClose={() => setShowPassword(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scroll: {
    paddingBottom: 120,
  },

  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: C.white,
  },
  eyebrow: {
    color: C.red,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 6,
  },
  title: {
    color: C.black,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.8,
    marginBottom: 12,
  },
  redRule: {
    height: 3,
    width: 36,
    backgroundColor: C.red,
    borderRadius: 2,
  },

  // Avatar
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: C.white,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBF0",
    marginBottom: 24,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: C.red,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    color: C.white,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1,
  },
  avatarName:  { fontSize: 17, fontWeight: "800", color: C.black, marginBottom: 2 },
  avatarEmail: { fontSize: 12, color: "#888", marginBottom: 6 },
  avatarBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: C.green + "18",
    borderWidth: 1,
    borderColor: C.green + "44",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  avatarBadgeDot:  { width: 6, height: 6, borderRadius: 3, backgroundColor: C.green },
  avatarBadgeText: { color: C.green, fontSize: 10, fontWeight: "800" },

  version: {
    textAlign: "center",
    color: "#CCC",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
  },
});