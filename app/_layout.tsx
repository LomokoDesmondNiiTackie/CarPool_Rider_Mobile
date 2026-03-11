import { Stack } from "expo-router";
import { useAuthStore } from "@/store/auth.store";

export default function RootLayout() {
    const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
    return (
        <Stack>
            <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="auth/login"  options={{ headerShown: false, animation: "slide_from_left"  }} />
                <Stack.Screen name="auth/signup" options={{ headerShown: false, animation: "slide_from_right" }} />
            </Stack.Protected>

            <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack.Protected>

            {/* Modals — always registered so the navigator knows about them */}
            <Stack.Screen name="modals/destination" options={{ headerShown: false, presentation: "modal" }} />
            <Stack.Screen name="modals/confirm"      options={{ headerShown: false, presentation: "modal" }} />
            <Stack.Screen name="modals/booked"       options={{ headerShown: false, presentation: "modal" }} />
        </Stack>
    );
}