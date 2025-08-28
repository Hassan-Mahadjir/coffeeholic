import TabBar from "@/components/TabBar";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Octicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";
import { moderateScale } from "react-native-size-matters";

export default function TabsLayout() {
  const tabDefault = useThemeColor({}, "tabIconDefault");
  const tabActive = useThemeColor({}, "tabIconSelected");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tabActive,
        tabBarInactiveTintColor: tabDefault,
        tabBarStyle: { backgroundColor: useTheme().colors.card },
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={moderateScale(size)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="suggestions"
        options={{
          tabBarLabel: "Suggestion",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="smart-toy"
              size={moderateScale(size)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="search"
              size={moderateScale(size)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings-sharp"
              size={moderateScale(size)}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
