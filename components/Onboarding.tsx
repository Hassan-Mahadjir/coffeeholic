import slides from "@/data/onboardingSlides";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import OnboardingItem from "./OnboardingItem";
import { ThemedView } from "./ThemedView";

const { width } = Dimensions.get("window");

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={({ item, index }) => (
            <OnboardingItem
              item={item}
              index={currentIndex}
              itemIndex={index}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={width}
          snapToAlignment="center"
        />
        {/* Pagination dots */}
        <View style={styles.indicatorOverlay}>
          {slides.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, currentIndex === idx && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  indicatorOverlay: {
    position: "absolute",
    bottom: verticalScale(50),
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // higher z-index
    elevation: 10, // for Android
  },
  dot: {
    width: scale(12),
    height: verticalScale(8),
    borderRadius: 5,
    backgroundColor: "#eeeeeeff", // white for visibility
    marginHorizontal: scale(2),
    opacity: 0.8,
    borderWidth: 1,
    borderColor: "#888",
  },
  activeDot: {
    backgroundColor: "#836c4ee6",
    width: scale(25),
    height: verticalScale(8),
    borderRadius: 5,
    opacity: 1,
    borderWidth: 1,
    borderColor: "rgba(68, 64, 45, 1)e6",
  },
});

export default Onboarding;
