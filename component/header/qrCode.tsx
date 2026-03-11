import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Pressable, } from "react-native";
import { QrCodeIcon, X, } from "lucide-react-native";
import { useRef } from "react";
import QRCode from "react-native-qrcode-svg";
import { useUserStore } from "@/store/user.store";
import { useRideStore } from "@/store/ride.store";
import { useQrState } from "@/store/qr.store";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

export default function QrCodeS() {
  const slideAnim = useRef(new Animated.Value(400)).current;
  const { fullname } = useUserStore();
  const { pickup, dropoff } = useRideStore();
  const { token, openQr, setOpenQr } = useQrState();

  const openSheet = () => {
    setOpenQr(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  };
  
  const closeSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 260,
      useNativeDriver: true,
    }).start(() => setOpenQr(false));
  };

  return (
    <>
      {/* QR Icon Trigger Button */}
      <TouchableOpacity style={styles.triggerBtn} onPress={openSheet} activeOpacity={0.8}>
        <View style={styles.triggerInner}>
          <QrCodeIcon color={C.white} size={22} />
        </View>
      </TouchableOpacity>

      {/* Bottom Sheet Modal */}
      <Modal transparent visible={openQr} animationType="none" statusBarTranslucent>
        {/* Backdrop */}
        <Pressable style={styles.backdrop} onPress={closeSheet} />

        {/* Sheet */}
        <Animated.View
          style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
        >
          {/* Handle */}
          <View style={styles.handle} />

          {/* Close button */}
          <TouchableOpacity style={styles.closeBtn} onPress={closeSheet}>
            <X color="#888" size={18} />
          </TouchableOpacity>

          {/* Header */}
          <Text style={styles.sheetEyebrow}>YOUR PASS</Text>
          <Text style={styles.sheetTitle}>Scan to Board</Text>
          <View style={styles.redRule} />

          {/* QR Code */}
          <View style={styles.qrWrapper}>
            <View style={styles.qrInner}>
              <QRCode
                value={token}
                size={180}
                color={C.black}
                backgroundColor={C.white}
              />
            </View>
            {/* Corner accents */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
          </View>

          {/* Status */}
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Valid for today&apos;s ride</Text>
          </View>

          {/* Divider */}
          <View style={styles.dottedDivider} />

          {/* Info row */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>PASSENGER</Text>
              <Text style={styles.infoValue}>{fullname}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>ROUTE</Text>
              <Text style={styles.infoValue}>{pickup} →{dropoff}</Text>
            </View>
            
          </View>

        </Animated.View>
      </Modal>
    </>
  );
}

const CORNER_SIZE = 20;
const CORNER_THICKNESS = 3;

const styles = StyleSheet.create({
  // Trigger
  triggerBtn: {
    shadowColor: C.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  triggerInner: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: C.black,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: C.red + "55",
  },

  // Backdrop
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  // Sheet
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: C.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 28,
    paddingBottom: 44,
    paddingTop: 16,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DDD",
    marginBottom: 16,
  },
  closeBtn: {
    position: "absolute",
    top: 20,
    right: 24,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },

  sheetEyebrow: {
    color: C.red,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 6,
  },
  sheetTitle: {
    color: C.black,
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  redRule: {
    height: 3,
    width: 36,
    backgroundColor: C.red,
    borderRadius: 2,
    marginBottom: 28,
  },

  // QR
  qrWrapper: {
    position: "relative",
    padding: 8,
    marginBottom: 20,
  },
  qrInner: {
    padding: 16,
    backgroundColor: C.white,
    borderRadius: 16,
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  corner: {
    position: "absolute",
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: C.red,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_THICKNESS,
    borderLeftWidth: CORNER_THICKNESS,
    borderTopLeftRadius: 6,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_THICKNESS,
    borderRightWidth: CORNER_THICKNESS,
    borderTopRightRadius: 6,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_THICKNESS,
    borderLeftWidth: CORNER_THICKNESS,
    borderBottomLeftRadius: 6,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_THICKNESS,
    borderRightWidth: CORNER_THICKNESS,
    borderBottomRightRadius: 6,
  },

  // Status
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 24,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.green,
  },
  statusText: {
    color: C.green,
    fontSize: 13,
    fontWeight: "700",
  },

  // Dotted divider
  dottedDivider: {
    width: "100%",
    height: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    marginBottom: 20,
  },

  // Info row
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 28,
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  infoDivider: {
    width: 1,
    backgroundColor: "#E0E0E0",
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: "#AAA",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "800",
    color: C.black,
  },

  // Share
  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: C.black,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 36,
    width: "100%",
    justifyContent: "center",
  },
  shareBtnText: {
    color: C.white,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});