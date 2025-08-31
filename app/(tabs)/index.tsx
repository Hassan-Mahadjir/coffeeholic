import RecommondationSlider from "@/components/home/RecommondationSlider";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

const HomeIndex = () => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText style={{ marginTop: 100 }}>Home index</ThemedText>
      <RecommondationSlider />
    </ThemedView>
  );
};

export default HomeIndex;

const styles = StyleSheet.create({});
