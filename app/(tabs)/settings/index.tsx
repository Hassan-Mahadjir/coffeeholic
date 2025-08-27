import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

const SettingsIndex = () => {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>Settings index</ThemedText>
    </ThemedView>
  );
};

export default SettingsIndex;

const styles = StyleSheet.create({});
