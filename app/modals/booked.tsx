import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import QrCodeS from "@/component/header/qrCode";
import { useRouter } from "expo-router";
import { CheckCircle, Clock, Bus, Hash, QrCode, Home } from "lucide-react-native";
import { useRideStore } from "@/store/ride.store";
import { useUserStore } from "@/store/user.store";
import { useQrState } from "@/store/qr.store";

const C = { black: "#111111", red: "#ff5a5f", white: "#f8f8ff", green: "#058c42" };

export default function Booked() {
  const router = useRouter();
  const { pickup } = useUserStore();
  const { dropoff } = useRideStore();
  const { setOpenQr } = useQrState();

  const time = "8:00 AM";

  return (
    <>
      <StatusBar style="light" />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        

        {/* ── Hero banner ── */}
        <View style={styles.heroBanner}>
          <View style={styles.blobTopRight} />
          <View style={styles.blobBottomLeft} />

          {/* Success ring */}
          <View style={styles.successRingOuter}>
            <View style={styles.successRingInner}>
              <CheckCircle color={C.white} size={40} strokeWidth={2} />
            </View>
          </View>

          <Text style={styles.heroEyebrow}>BOOKING CONFIRMED</Text>
          <Text style={styles.heroTitle}>Your ride{"\n"}is booked!</Text>
          <Text style={styles.heroSub}>You&apos;re all set for your journey</Text>
        </View>

        {/* ── Ticket card ── */}
        <View style={styles.ticket}>

          {/* Route section */}
          <View style={styles.routeSection}>
            <View style={styles.routePoint}>
              <View style={[styles.routeDot, { backgroundColor: C.red }]} />
              <View>
                <Text style={styles.routeLabel}>FROM</Text>
                <Text style={styles.routeCity}>{pickup}</Text>
              </View>
            </View>

            <View style={styles.routePoint}>
              <View style={[styles.routeDot, { backgroundColor: C.green }]} />
              <View>
                <Text style={styles.routeLabel}>TO</Text>
                <Text style={styles.routeCity}>{dropoff}</Text>
              </View>
            </View>
          </View>

          {/* Dashed divider */}
          <View style={styles.ticketDivider} />

          {/* Details grid */}
          <View style={styles.detailsGrid}>
            {[
              { icon: Clock,  label: "Departure", value: time,             accent: C.red   },
              { icon: Bus,    label: "Bus Type",   value: "Toyota Hiace X", accent: C.green },
              { icon: Hash,   label: "Bus Number", value: "GT-1234-24",     accent: C.red   },
            ].map((item) => (
              <View key={item.label} style={styles.detailItem}>
                <View style={[styles.detailIcon, { backgroundColor: item.accent + "18" }]}>
                  <item.icon color={item.accent} size={15} />
                </View>
                <Text style={styles.detailLabel}>{item.label}</Text>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Action buttons ── */}
        <TouchableOpacity
          style={styles.qrBtn}
          activeOpacity={0.85}
          onPress={() => { setOpenQr(true) }}
        >
          <QrCode color={C.white} size={20} />
          <Text style={styles.qrBtnText}>View QR Pass</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeBtn}
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/home")}
        >
          <Home color={C.black} size={18} />
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  content: {
    paddingBottom: 48,
  },

  // ── Hero ──
  heroBanner: {
    backgroundColor: C.black,
    paddingTop: 72,
    paddingBottom: 48,
    paddingHorizontal: 28,
    alignItems: "center",
    overflow: "hidden",
  },
  blobTopRight: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: C.red,
    opacity: 0.1,
  },
  blobBottomLeft: {
    position: "absolute",
    bottom: -50,
    left: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: C.green,
    opacity: 0.1,
  },
  successRingOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: C.green + "22",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: C.green + "55",
  },
  successRingInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: C.green,
    alignItems: "center",
    justifyContent: "center",
  },
  heroEyebrow: {
    color: C.red,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 10,
  },
  heroTitle: {
    color: C.white,
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: -1.5,
    lineHeight: 46,
    textAlign: "center",
    marginBottom: 10,
  },
  heroSub: {
    color: "rgba(248,248,255,0.45)",
    fontSize: 14,
    fontWeight: "500",
  },

  // ── Ticket ──
  ticket: {
    backgroundColor: C.white,
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    overflow: "visible",
    position: "relative",
  },

  // Notch cutouts (ticket effect)
  notch: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F2F2F7",
    top: "50%",
    marginTop: -14,
  },
  notchLeft:  { left:  -14 },
  notchRight: { right: -14 },

  // Route
  routeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  routeLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#AAA",
  },
  routeCity: {
    fontSize: 20,
    fontWeight: "800",
    color: C.black,
    letterSpacing: -0.3,
  },
  routeLine: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 8,
  },
  routeDash: {
    width: 6,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#DDD",
  },
  routeArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 8,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },

  // Divider
  ticketDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: "#E8E8EE",
    borderStyle: "dashed",
    marginBottom: 20,
  },

  // Details grid (2x2)
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  detailItem: {
    width: "47%",
    backgroundColor: "#F8F8FF",
    borderRadius: 14,
    padding: 12,
    gap: 4,
  },
  detailIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#AAA",
    textTransform: "uppercase",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "800",
    color: C.black,
  },

  // ── Buttons ──
  qrBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 20,
    height: 56,
    borderRadius: 18,
    backgroundColor: C.black,
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  qrBtnText: {
    color: C.white,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  homeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 20,
    marginTop: 12,
    height: 52,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#DDD",
    backgroundColor: C.white,
  },
  homeBtnText: {
    color: C.black,
    fontSize: 15,
    fontWeight: "700",
  },
});