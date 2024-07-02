import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import ModalHeader from "@/components/navigation/ModalHeader";
import { getDatabase, loadDatabase } from "@/config/database";
import { SQLiteProvider } from "expo-sqlite/next";
import { dbName } from "@/utils/db_variables";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [dbLoaded, setDbLoaded] = useState(false);
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const initDB = async () => {
      await loadDatabase();
      getDatabase();
      setDbLoaded(true);
      SplashScreen.hideAsync();
    };

    initDB();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, dbLoaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SQLiteProvider databaseName={dbName}>
      <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="add-account"
            options={{
              presentation: "modal",
              header: ({ navigation }) => (
                <ModalHeader navigation={navigation} title="Add Account" />
              ),
            }}
          />
          <Stack.Screen
            name="transaction-modal"
            options={{
              presentation: "modal",
              header: ({ navigation }) => (
                <ModalHeader navigation={navigation} title="Add Transaction" />
              ),
            }}
          />
        </Stack>
      </ThemeProvider>
    </SQLiteProvider>
  );
}
