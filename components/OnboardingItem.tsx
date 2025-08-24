import React from "react";
import { Image, useWindowDimensions } from "react-native";
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
  const { width } = useWindowDimensions();

  return (
    <ThemedView style={{ width: width }}>
      <Image source={item.image} style={{ width, resizeMode: "contain" }} />
    </ThemedView>
  );
};

export default OnboardingItem;
