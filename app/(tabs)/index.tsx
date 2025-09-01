import AnimationStackCard from "@/components/home/AnimationStackCard";
import RecommondationSlider from "@/components/home/RecommondationSlider";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

const HomeIndex = () => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText type="subtitle" style={{ marginTop: 100, marginLeft: 15 }}>
        Home index
      </ThemedText>
      <RecommondationSlider />
      <ThemedText type="subtitle" style={{ marginLeft: 15, marginTop: 10 }}>
        Most poplar coffees
      </ThemedText>
      <AnimationStackCard />
    </ThemedView>
  );
};

export default HomeIndex;

const styles = StyleSheet.create({});
