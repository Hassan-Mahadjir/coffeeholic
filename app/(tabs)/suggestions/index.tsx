import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

const SuggestionsIndex = () => {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>Suggestion index</ThemedText>
    </ThemedView>
  );
};

export default SuggestionsIndex;

const styles = StyleSheet.create({});
