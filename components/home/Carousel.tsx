import { data } from "@/data/StackCardData";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { moderateScale, verticalScale } from "react-native-size-matters";
import CarsouselCard from "./CarsouselCard";

const Carousel = () => {
  const { width } = useWindowDimensions();
  const imageWidth = width * 0.5;
  const spacing = moderateScale(15);

  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (imageWidth + spacing);
  });

  return (
    <View style={{ marginTop: verticalScale(10) }}>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        decelerationRate={"fast"}
        style={{ flexGrow: 0 }}
        snapToInterval={imageWidth + spacing}
        onScroll={onScroll}
        pagingEnabled={false}
        scrollEventThrottle={1000 / 60}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={Math.floor(data.length / 2)}
        getItemLayout={(_, index) => ({
          length: imageWidth + spacing,
          offset: (imageWidth + spacing) * index,
          index,
        })}
        contentContainerStyle={{
          gap: spacing,
          paddingHorizontal: (width - imageWidth) / 4,
        }}
        renderItem={({ item, index }) => (
          <CarsouselCard item={item} index={index} scrollX={scrollX} />
        )}
      />
    </View>
  );
};

export default Carousel;
