import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

const ExploreIndex = () => {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>Explre index</ThemedText>
    </ThemedView>
  );
};

export default ExploreIndex;

const styles = StyleSheet.create({});
