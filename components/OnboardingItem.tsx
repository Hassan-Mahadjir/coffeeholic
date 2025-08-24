import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface OnboardingItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    image: any;
    buttonText: string;
  };
  index: number;
  itemIndex: number;
}

const OnboardingItem: React.FC<OnboardingItemProps> = ({
  item,
  index,
  itemIndex,
}) => {
  const { width, height } = useWindowDimensions();
  // Title animation: from top
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(-40);
  // Description animation: from bottom
  const descOpacity = useSharedValue(0);
  const descTranslateY = useSharedValue(40);

  // Button animation: fade in and scale up
  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.8);

  useEffect(() => {
    if (index === itemIndex) {
      // Animate in
      titleOpacity.value = 0;
      titleTranslateY.value = -40;
      descOpacity.value = 0;
      descTranslateY.value = 40;
      buttonOpacity.value = 0;
      buttonScale.value = 0.8;
      titleOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
      titleTranslateY.value = withDelay(200, withTiming(0, { duration: 600 }));
      descOpacity.value = withDelay(400, withTiming(1, { duration: 900 }));
      descTranslateY.value = withDelay(400, withTiming(0, { duration: 900 }));
      buttonOpacity.value = withDelay(900, withTiming(1, { duration: 500 }));
      buttonScale.value = withDelay(900, withTiming(1, { duration: 500 }));
    } else {
      // Animate out
      titleOpacity.value = withTiming(0, { duration: 200 });
      titleTranslateY.value = withTiming(-40, { duration: 200 });
      descOpacity.value = withTiming(0, { duration: 200 });
      descTranslateY.value = withTiming(40, { duration: 200 });
      buttonOpacity.value = withTiming(0, { duration: 200 });
      buttonScale.value = withTiming(0.8, { duration: 200 });
    }
  }, [index, itemIndex]);
  const animatedButtonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }],
  }));

  const animatedTitleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));
  const animatedDescStyle = useAnimatedStyle(() => ({
    opacity: descOpacity.value,
    transform: [{ translateY: descTranslateY.value }],
  }));

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

      {/* Animated Text overlay */}
      <View style={styles.textContainer}>
        <Animated.View style={animatedTitleStyle}>
          <ThemedText type="title" style={{ marginBottom: verticalScale(5) }}>
            {item.title}
          </ThemedText>
        </Animated.View>
        <Animated.View style={animatedDescStyle}>
          <ThemedText style={styles.description} type="default">
            {item.description}
          </ThemedText>
        </Animated.View>
      </View>

      {/* Button */}
      <AnimatedTouchable
        activeOpacity={1}
        style={[
          {
            position: "absolute",
            bottom: verticalScale(80),
            left: moderateScale(20),
            right: moderateScale(20),
            backgroundColor: "#836c4ee6",
            paddingVertical: verticalScale(10),
            borderRadius: moderateScale(30),
            alignItems: "center",
          },
          animatedButtonStyle,
        ]}
        onPress={() => {
          // Handle button press, e.g., navigate to next screen
        }}
      >
        <ThemedText
          type="default"
          style={{ color: "white", fontWeight: "bold" }}
        >
          {item.buttonText}
        </ThemedText>
      </AnimatedTouchable>
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
