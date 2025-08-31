import React from "react";
import { StyleSheet, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

type DotsIndicatorProps = {
  total: number;
  activeIndex: number;
};

const DotsIndicator = ({ total, activeIndex }: DotsIndicatorProps) => {
  if (total === 0) return null;

  return (
    <View style={styles.dotContainer}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            activeIndex === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

export default DotsIndicator;

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    marginTop: verticalScale(5),
    alignSelf: "center",
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
  inactiveDot: {
    backgroundColor: "white",
  },
});
