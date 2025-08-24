import slides from "@/data/onboardingSlides";
import React from "react";
import { FlatList } from "react-native";
import OnboardingItem from "./OnboardingItem";
import { ThemedView } from "./ThemedView";

const Onboarding = () => {
  return (
    <ThemedView>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </ThemedView>
  );
};

export default Onboarding;
