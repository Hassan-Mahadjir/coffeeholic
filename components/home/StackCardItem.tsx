import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { data } from "../../data/StackCardData";
import { ThemedText } from "../ThemedText";

type StackCardItemProps = {
  item: any;
  index: number;
  actualIndex: number;
  setActualIndex: (index: number) => void;
};

const StackCardItem = ({
  item,
  index,
  actualIndex,
  setActualIndex,
}: StackCardItemProps) => {
  const position = useSharedValue({ x: 0, y: 0 });
  const lastOffset = useSharedValue({ x: 0, y: 0 });
  const value = useSharedValue(data.length);
  const panGestureHandler = Gesture.Pan()
    .runOnJS(true)
    .onUpdate(({ translationX, translationY }) => {
      position.value = {
        x: translationX + lastOffset.value.x,
        y: translationY + lastOffset.value.y,
      };
    })
    .onEnd(() => {
      if (
        Math.abs(position.value.x) > 100 &&
        Math.abs(position.value.y) < 100
      ) {
        lastOffset.value = { x: 0, y: 0 };
        position.value = withSpring({ x: 0, y: 0 });
      } else {
        lastOffset.value = { x: 0, y: 0 };
        position.value = withTiming({
          x: position.value.x * 10,
          y: position.value.y * 10,
        });
        setActualIndex(actualIndex - 1);
        data.pop();
      }
    });
  const rotate = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0, 8, -8, 0],
      Extrapolation.CLAMP
    );
  });
  const additionalTranslate = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0, 30, -30, 0],
      Extrapolation.CLAMP
    );
  });
  const additionalScale = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0.2, 0.9, 0.9, 1],
      Extrapolation.CLAMP
    );
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: position.value.x + additionalTranslate.value },
        { translateY: position.value.y },
        { scale: additionalScale.value },
        { rotateZ: `${rotate.value}deg` },
      ],
    };
  });

  useEffect(() => {
    value.value = withSpring(actualIndex, { damping: 10, stiffness: 190 });
  });
  return (
    <GestureDetector gesture={panGestureHandler}>
      <Animated.View
        style={[
          { zIndex: actualIndex + 1 },
          styles.animatedView,
          animatedStyle,
        ]}
      >
        <ImageBackground style={styles.image} source={item.image}>
          <View style={styles.imageView}>
            <View style={styles.imageTextView}>
              <ThemedText type="subtitle" style={[styles.imageText]}>
                {item.title}
              </ThemedText>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </GestureDetector>
  );
};

export default StackCardItem;

const styles = StyleSheet.create({
  animatedView: {
    position: "absolute",
    width: scale(200),
    height: verticalScale(230),
  },
  imageView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: moderateScale(20),
    objectFit: "contain",
  },
  imageTextView: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(15),
  },
  imageText: {
    color: "#fff",
    fontSize: moderateScale(20),
  },
});
