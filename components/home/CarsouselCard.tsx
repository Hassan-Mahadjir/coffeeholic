import React from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";

const CarsouselCard = ({
  item,
  index,
  scrollX,
}: {
  item: any;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const { width } = useWindowDimensions();
  const imageWidth = width * 0.55;
  const imageHeight = imageWidth * 1.55;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.6, 1, 1.6]
          ),
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [15, 0, -15]
          )}deg`,
        },
      ],
    };
  });

  return (
    <View
      style={{
        width: imageWidth,
        height: imageHeight,
        overflow: "hidden",
        borderRadius: moderateScale(15),
      }}
    >
      <Animated.Image
        source={item.image}
        style={[{ flex: 1, width: "100%", height: "100%" }, animatedStyle]}
      />
    </View>
  );
};

export default CarsouselCard;
