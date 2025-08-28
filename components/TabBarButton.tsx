import { icons } from "@/constants/TabBarIcons";
import { PlatformPressable } from "@react-navigation/elements";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";

import type { GestureResponderEvent } from "react-native";

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  label,
  routeName,
  tintColor,
}: {
  onPress: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent
  ) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  isFocused: Boolean;
  label: string;
  routeName: string;
  tintColor: string;
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : 0,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.3]);

    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return { transform: [{ scale: scaleValue }], top: top };
  });

  return (
    <PlatformPressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarItem}
    >
      <Animated.View style={animatedIconStyle}>
        {icons[routeName as keyof typeof icons](tintColor)}
      </Animated.View>
      <Animated.Text style={[{ color: tintColor }, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </PlatformPressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(5),
  },
});
