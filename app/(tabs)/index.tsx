import Carousel from "@/components/home/Carousel";
import RecommondationSlider from "@/components/home/RecommondationSlider";
import React from "react";
import { StyleSheet, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

const HomeIndex = () => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={{ marginTop: verticalScale(50) }}>
        <ThemedText
          style={{ marginLeft: scale(10), marginBottom: verticalScale(5) }}
          type="title"
        >
          Hello, <ThemedText type="title">Hassan</ThemedText>
        </ThemedText>
        <ThemedText type="subtitle" style={{ marginLeft: scale(10) }}>
          Recommended for you
        </ThemedText>
        <RecommondationSlider />
        <View
          style={{
            marginLeft: scale(10),
            marginHorizontal: scale(10),
            marginTop: 10,
          }}
        >
          <ThemedText type="subtitle">Most poplar coffees</ThemedText>
        </View>

        <Carousel />
      </View>
    </ThemedView>
  );
};

export default HomeIndex;

const styles = StyleSheet.create({});
