import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../i18n/translation";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRTL = i18n.dir() === "rtl";
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      // Optionally reload the app to apply changes
    }
  }, [i18n.language]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Welcome flow */}
        <Stack.Screen name="welcome" options={{ headerShown: false }} />

        {/*  main screens here */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        {/* Tabs  */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Fallback */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
