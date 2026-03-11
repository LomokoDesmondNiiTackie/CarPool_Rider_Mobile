import { View, Text, StyleSheet } from 'react-native';

const C = { black: "#111111", red: "#ff5a5f", white: "#f8f8ff", green: "#058c42" };

// ── Section ──
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

export function Divider() {
  return <View style={styles.divider} />;
}



const styles = StyleSheet.create({
  
  // Section
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#AAA",
    marginBottom: 10,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: C.white,
    borderRadius: 18,
    paddingHorizontal: 16,
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginLeft: 48,
  },

  version: {
    textAlign: "center",
    color: "#CCC",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
  },
});