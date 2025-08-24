import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface OnboardingItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    image: any;
  };
}

const OnboardingItem: React.FC<OnboardingItemProps> = ({ item }) => {
  const { width, height } = useWindowDimensions();

  return (
    <ThemedView style={{ width, height }}>
      {/* Background image */}
      <Image
        source={item.image}
        style={[StyleSheet.absoluteFillObject, { width, height }]}
        resizeMode="cover"
      />

      {/* Gradient overlay */}
      <LinearGradient
        colors={["transparent", "rgba(45, 27, 1, 0.9)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          position: "absolute",
          width: "100%",
          height: "45%", // only behind text
        }}
      />

      {/* Text overlay */}
      <View style={styles.textContainer}>
        <ThemedText type="title" style={{ marginBottom: verticalScale(5) }}>
          {item.title}
        </ThemedText>
        <ThemedText style={styles.description} type="default">
          {item.description}
        </ThemedText>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(20),
  },
  description: {
    textAlign: "center",
  },
});

export default OnboardingItem;
