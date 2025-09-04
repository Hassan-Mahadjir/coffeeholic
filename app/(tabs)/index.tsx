import Carousel from "@/components/home/Carousel";
import RecommondationSlider from "@/components/home/RecommondationSlider";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
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
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ThemedText type="subtitle" style={{}}>
            Most poplar coffees
          </ThemedText>
          <Pressable onPress={() => router.push("/all-coffees")}>
            <ThemedText type="link">See All</ThemedText>
          </Pressable>
        </View>

        <Carousel />
      </View>
    </ThemedView>
  );
};

export default HomeIndex;

const styles = StyleSheet.create({});
