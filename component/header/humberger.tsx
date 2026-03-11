import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import {
  User,
  X,
  MapPin,
  LogOut,
  ChevronRight,
  Phone,
  Mail,
  Navigation,
  AlertTriangle,
} from "lucide-react-native";
import { useUserStore } from "@/store/user.store";
import { useAuthStore } from "@/store/auth.store";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};
const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.82;

const menuItems = [{ icon: Phone, label: "Support", color: C.green }];

export default function Hamburger() {
  const { fullname, email, phone, pickup, dropoff } = useUserStore();
  const router = useRouter();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  // Drawer anims
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Logout dialog anims
  const dialogScale = useRef(new Animated.Value(0.85)).current;
  const dialogFade = useRef(new Animated.Value(0)).current;

  // ── Drawer ──
  const openDrawer = () => {
    setDrawerVisible(true);
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
  };

  const closeDrawer = (cb?: () => void) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 240,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setDrawerVisible(false);
      cb?.();
    });
  };

  // ── Logout dialog ──
  const openLogout = () => {
    setLogoutVisible(true);
    Animated.parallel([
      Animated.spring(dialogScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 65,
        friction: 10,
      }),
      Animated.timing(dialogFade, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeLogout = (cb?: () => void) => {
    Animated.parallel([
      Animated.timing(dialogScale, {
        toValue: 0.85,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(dialogFade, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setLogoutVisible(false);
      cb?.();
    });
  };

  const handleLogoutPress = () => {
    // Close drawer first, then open logout dialog
    closeDrawer(() => openLogout());
  };

  const handleLogoutConfirm = () => {
    closeLogout(() => {
      useAuthStore.getState().logout();
      router.replace("/auth/login");
    });
  };

  return (
    <>
      {/* Trigger */}
      <TouchableOpacity
        style={styles.triggerBtn}
        onPress={openDrawer}
        activeOpacity={0.8}
      >
        <User color={C.white} size={20} />
      </TouchableOpacity>

      {/* ── DRAWER ── */}
      <Modal
        transparent
        visible={drawerVisible}
        animationType="none"
        statusBarTranslucent
      >
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <Pressable style={{ flex: 1 }} onPress={() => closeDrawer()} />
        </Animated.View>

        <Animated.View
          style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
        >
          {/* Header */}
          <View style={styles.drawerHeader}>
            <View style={styles.headerBlob} />
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => closeDrawer()}
            >
              <X color={C.white} size={18} />
            </TouchableOpacity>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarInitials}>
                  {fullname
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </View>
            </View>
            <Text style={styles.userName}>{fullname}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.drawerScroll}
          >
            {/* Contact */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>CONTACT</Text>
              <View style={styles.detailRow}>
                <View
                  style={[styles.detailIcon, { backgroundColor: C.red + "18" }]}
                >
                  <Phone color={C.red} size={15} />
                </View>
                <View>
                  <Text style={styles.detailLabel}>Phone</Text>
                  <Text style={styles.detailValue}>{phone}</Text>
                </View>
              </View>
              <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                <View
                  style={[styles.detailIcon, { backgroundColor: C.red + "18" }]}
                >
                  <Mail color={C.red} size={15} />
                </View>
                <View>
                  <Text style={styles.detailLabel}>Email</Text>
                  <Text style={styles.detailValue}>{email}</Text>
                </View>
              </View>
            </View>

            {/* Preferred Locations */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>PREFERRED LOCATIONS</Text>
              <View style={styles.detailRow}>
                <View
                  style={[
                    styles.detailIcon,
                    { backgroundColor: C.green + "18" },
                  ]}
                >
                  <MapPin color={C.green} size={15} />
                </View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Pickup Point</Text>
                  <Text style={styles.detailValue}>{pickup}</Text>
                </View>
              </View>
              <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                <View
                  style={[styles.detailIcon, { backgroundColor: C.red + "18" }]}
                >
                  <Navigation color={C.red} size={15} />
                </View>
                <View style={styles.detailTextWrap}>
                  <Text style={styles.detailLabel}>Drop-off Point</Text>
                  <Text style={styles.detailValue}>{dropoff}</Text>
                </View>
              </View>
            </View>

            {/* Menu */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>MENU</Text>
              {menuItems.map((item, i) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.menuRow,
                    i === menuItems.length - 1 && { borderBottomWidth: 0 },
                  ]}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.detailIcon,
                      { backgroundColor: item.color + "18" },
                    ]}
                  >
                    <item.icon color={item.color} size={15} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <ChevronRight
                    color="#CCC"
                    size={16}
                    style={{ marginLeft: "auto" }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Logout button */}
            <TouchableOpacity
              style={styles.logoutBtn}
              activeOpacity={0.85}
              onPress={handleLogoutPress}
            >
              <LogOut color={C.red} size={17} />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </Modal>

      {/* ── LOGOUT DIALOG ── */}
      <Modal
        transparent
        visible={logoutVisible}
        animationType="none"
        statusBarTranslucent
      >
        <Animated.View style={[styles.dialogBackdrop, { opacity: dialogFade }]}>
          <Pressable style={{ flex: 1 }} onPress={() => closeLogout()} />
        </Animated.View>

        <View style={styles.dialogCentered}>
          <Animated.View
            style={[
              styles.dialogCard,
              { transform: [{ scale: dialogScale }], opacity: dialogFade },
            ]}
          >
            {/* Close */}
            <TouchableOpacity
              style={styles.dialogCloseBtn}
              onPress={() => closeLogout()}
            >
              <X color="#AAA" size={16} />
            </TouchableOpacity>

            {/* Icon */}
            <View style={styles.dialogIconOuter}>
              <View style={styles.dialogIconInner}>
                <AlertTriangle color={C.white} size={28} strokeWidth={2} />
              </View>
            </View>

            <Text style={styles.dialogEyebrow}>CONFIRM ACTION</Text>
            <Text style={styles.dialogTitle}>Log Out?</Text>
            <View style={styles.dialogRedRule} />
            <Text style={styles.dialogSub}>
              Are you sure you want to log out of your Carpool account?
            </Text>

            {/* Buttons */}
            <View style={styles.dialogBtnRow}>
              <TouchableOpacity
                style={styles.dialogBtnCancel}
                onPress={() => closeLogout()}
                activeOpacity={0.8}
              >
                <Text style={styles.dialogBtnCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dialogBtnConfirm}
                onPress={handleLogoutConfirm}
                activeOpacity={0.85}
              >
                <LogOut color={C.white} size={16} />
                <Text style={styles.dialogBtnConfirmText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  triggerBtn: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: C.black,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: C.red + "55",
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  // Drawer
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "#F2F2F7",
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 20,
  },
  drawerScroll: { paddingBottom: 48 },
  drawerHeader: {
    backgroundColor: C.black,
    paddingTop: 64,
    paddingBottom: 28,
    paddingHorizontal: 24,
    alignItems: "flex-start",
    overflow: "hidden",
  },
  headerBlob: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: C.red,
    opacity: 0.12,
  },
  closeBtn: {
    position: "absolute",
    top: 56,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarWrap: { marginBottom: 14 },
  avatar: {
    width: 64,
    height: 64,
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
  userName: {
    color: C.white,
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  userEmail: {
    color: "rgba(248,248,255,0.45)",
    fontSize: 15,
    marginBottom: 20,
  },

  section: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: C.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#AAA",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  detailIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  detailTextWrap: { flex: 1 },
  detailLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#AAA",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  detailValue: { fontSize: 15, fontWeight: "700", color: C.black },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuLabel: { fontSize: 14, fontWeight: "700", color: C.black },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.red + "55",
    backgroundColor: C.red + "10",
  },
  logoutText: {
    color: C.red,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  // Logout dialog
  dialogBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  dialogCentered: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  dialogCard: {
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
  dialogCloseBtn: {
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
  dialogIconOuter: {
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
  dialogIconInner: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: C.red,
    alignItems: "center",
    justifyContent: "center",
  },
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
  dialogRedRule: {
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
  dialogBtnRow: { flexDirection: "row", gap: 12, width: "100%" },
  dialogBtnCancel: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#DDD",
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
  },
  dialogBtnCancelText: { color: C.black, fontSize: 15, fontWeight: "700" },
  dialogBtnConfirm: {
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
  dialogBtnConfirmText: { color: C.white, fontSize: 15, fontWeight: "800" },
});
