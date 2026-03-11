import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronLeft,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const C = {
  black: "#111111",
  red: "#ff5a5f",
  white: "#f8f8ff",
  green: "#058c42",
};

export default function SignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Password strength
  const strengthScore = () => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  };
  const score = strengthScore();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", C.red, "#F0A500", "#3B82F6", C.green];

  const signUp = () => {
    if (!fullName || !email || !password)
      return Alert.alert("Missing fields", "Please fill in all fields.");
    Alert.alert("Success", "Account created!");
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Decorative blobs */}
        <View style={styles.blobTopRight} />
        <View style={styles.blobBottomLeft} />

        {/* Back + Logo */}
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <ChevronLeft color={C.white} size={20} />
          </TouchableOpacity>
          <Text style={styles.logoText}>
            Car<Text style={styles.logoRed}>Pool</Text>
          </Text>
        </View>

        {/* Welcome */}
        <View style={styles.welcomeWrap}>
          <Text style={styles.eyebrow}>GET STARTED</Text>
          <Text style={styles.title}>Create{"\n"}Account</Text>
          <View style={styles.redRule} />
          <Text style={styles.subtitle}>
            Fill in your details to join the ride
          </Text>
        </View>

        {/* Inputs */}
        <View style={styles.inputGroup}>
          {/* Full Name */}
          <Text style={[styles.inputLabelText, { marginBottom: 8 }]}>
            FULL NAME
          </Text>
          <View style={[styles.inputWrap, { marginBottom: 16 }]}>
            <User color={"rgba(248,248,255,0.4)"} size={16} />
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor={"rgba(248,248,255,0.25)"}
              autoCapitalize="words"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Email */}
          <Text style={[styles.inputLabelText, { marginBottom: 8 }]}>
            EMAIL
          </Text>
          <View style={styles.inputWrap}>
            <Mail color={"rgba(248,248,255,0.4)"} size={16} />
            <TextInput
              style={styles.input}
              placeholder="you@email.com"
              placeholderTextColor={"rgba(248,248,255,0.25)"}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password */}
          <Text
            style={[styles.inputLabelText, { marginTop: 16, marginBottom: 8 }]}
          >
            PASSWORD
          </Text>
          <View style={styles.inputWrap}>
            <Lock color={"rgba(248,248,255,0.4)"} size={16} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={"rgba(248,248,255,0.25)"}
              secureTextEntry={!showPass}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              {showPass ? (
                <EyeOff color={"rgba(248,248,255,0.4)"} size={16} />
              ) : (
                <Eye color={"rgba(248,248,255,0.4)"} size={16} />
              )}
            </TouchableOpacity>
          </View>

          {/* Strength meter */}
          {password.length > 0 && (
            <View style={styles.strengthWrap}>
              <View style={styles.strengthBars}>
                {[1, 2, 3, 4].map((i) => (
                  <View
                    key={i}
                    style={[
                      styles.strengthBar,
                      {
                        backgroundColor:
                          i <= score
                            ? strengthColor[score]
                            : "rgba(255,255,255,0.1)",
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
        </View>

        {/* Buttons */}
        <View style={styles.btnGroup}>
          <TouchableOpacity
            style={styles.btnSignUp}
            onPress={signUp}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[C.green, "#046e34"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.btnGradient}
            >
              <Text style={styles.btnSignUpText}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.orLine} />
          </View>

          <TouchableOpacity
            style={styles.btnSignIn}
            onPress={() => router.push("/auth/login")}
            activeOpacity={0.8}
          >
            <Text style={styles.btnSignInText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: C.black },

  container: {
    flexGrow: 1,
    backgroundColor: C.black,
    paddingHorizontal: 28,
    paddingTop: 64,
    paddingBottom: 48,
    gap: 32,
  },

  // Blobs
  blobTopRight: {
    position: "absolute",
    top: -80,
    right: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: C.red,
    opacity: 0.07,
  },
  blobBottomLeft: {
    position: "absolute",
    bottom: -60,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: C.green,
    opacity: 0.07,
  },

  // Top row
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { fontSize: 24, color: C.white, fontWeight: "800" },
  logoRed: { color: C.red },

  // Welcome
  welcomeWrap: { gap: 6 },
  eyebrow: { color: C.red, fontSize: 11, fontWeight: "800", letterSpacing: 3 },
  title: {
    color: C.white,
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: -1.5,
    lineHeight: 44,
  },
  redRule: {
    height: 3,
    width: 36,
    backgroundColor: C.red,
    borderRadius: 2,
    marginTop: 4,
  },
  subtitle: {
    color: "rgba(248,248,255,0.38)",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 6,
  },

  // Inputs
  inputGroup: { gap: 4 },
  nameRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  halfWrap: { flex: 1, gap: 8 },
  inputLabelText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: "rgba(248,248,255,0.35)",
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 54,
  },
  input: {
    flex: 1,
    color: C.white,
    fontSize: 15,
    fontWeight: "500",
  },

  // Strength
  strengthWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  strengthBars: { flexDirection: "row", gap: 4, flex: 1 },
  strengthBar: { flex: 1, height: 4, borderRadius: 2 },
  strengthLabel: {
    fontSize: 11,
    fontWeight: "800",
    width: 48,
    textAlign: "right",
  },

  // Buttons
  btnGroup: { gap: 14 },
  btnSignUp: {
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: C.green,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  btnGradient: {
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  btnSignUpText: {
    color: C.white,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  orRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  orLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.1)" },
  orText: { color: "rgba(248,248,255,0.3)", fontSize: 13, fontWeight: "600" },

  btnSignIn: {
    height: 56,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  btnSignInText: {
    color: "rgba(248,248,255,0.7)",
    fontSize: 15,
    fontWeight: "700",
  },
});
