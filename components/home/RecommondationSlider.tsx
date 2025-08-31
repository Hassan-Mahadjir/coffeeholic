import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import recommendatonSlides from "../../data/recommendatonSlides";
import RecommondationItem from "./RecommondationItems";
import DotsIndicator from "./RenderDots";

export type SliderProps = {
  id: number;
  background: string;
  title: string;
  description: string;
  coffeeImage: string;
};

const RecommondationSlider = () => {
  const data: SliderProps[] = recommendatonSlides;
  const { width } = useWindowDimensions();
  const screenWidth = width - moderateScale(30);
  const itemSpacing = scale(20); // gap between items
  const itemSize = screenWidth + itemSpacing;

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<SliderProps>>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.length;

        if (flatListRef.current) {
          flatListRef.current.scrollToOffset({
            offset: nextIndex * itemSize, // exact pixel offset
            animated: true,
          });
        }

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [data, itemSize]);

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / itemSize);
    setActiveIndex(index);
  };

  return (
    <View>
      {data && data.length > 0 ? (
        <>
          <FlatList
            ref={flatListRef}
            data={data}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  width: screenWidth,
                  marginHorizontal: itemSpacing / 2,
                }}
              >
                <RecommondationItem item={item} />
              </View>
            )}
            onScroll={handleScroll}
            snapToInterval={screenWidth + itemSpacing}
            decelerationRate="fast"
            snapToAlignment="center"
            contentContainerStyle={{}}
          />
          <DotsIndicator total={data.length} activeIndex={activeIndex} />
        </>
      ) : null}
    </View>
  );
};

export default RecommondationSlider;

const styles = StyleSheet.create({});
