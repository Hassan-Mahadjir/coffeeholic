import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

const HomeIndex = () => {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>Home index</ThemedText>
    </ThemedView>
  );
};

export default HomeIndex;

const styles = StyleSheet.create({});
