import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { verticalScale } from "react-native-size-matters";
import { data } from "../../data/StackCardData";
import StackCardItem from "./StackCardItem";
const AnimationStackCard = () => {
  const [actualIndex, setActualIndex] = useState(data.length - 1);

  return (
    <GestureHandlerRootView style={styles.gestureHandlerView}>
      <View style={styles.container}>
        {data.map((item, index) => (
          <StackCardItem
            actualIndex={actualIndex}
            item={item}
            index={index}
            setActualIndex={setActualIndex}
            key={item.id}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

export default AnimationStackCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: verticalScale(-90),
  },
  gestureHandlerView: {
    flex: 1,
  },
});
