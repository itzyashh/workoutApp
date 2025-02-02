import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as SQLite from 'expo-sqlite';
import { dbName, getDB } from "@/db";
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useWorkoutStore } from "@/store";
import { useEffect } from "react";

DarkTheme.colors.primary = Colors.dark.tint
DefaultTheme.colors.primary = Colors.light.tint

const db = SQLite.openDatabaseSync(dbName)
// SQLite.deleteDatabaseSync(dbName)

export default function RootLayout() {

  const colorScheme = useColorScheme();
  console.log(colorScheme);
  useDrizzleStudio(db);
  const loadWorkouts = useWorkoutStore(state => state.loadWorkouts)

  useEffect(() => {
    loadWorkouts()
  }, [])


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }}  />
      <Stack.Screen name="workout/current" options={{ title: "Workout" }}  />
      <Stack.Screen name="workout/[id]" options={{ title: "Workout Details" }}  />
    </Stack>
    </ThemeProvider>
    </GestureHandlerRootView>
  )
}
// 