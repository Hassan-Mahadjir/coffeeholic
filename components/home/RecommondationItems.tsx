import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { ThemedText } from "../ThemedText";
import { SliderProps } from "./RecommondationSlider";

// Render Items to FlatList
const RecommondationItem = ({ item }: { item: SliderProps }) => {
  const { width } = useWindowDimensions();
  const screenWidth = width - scale(20);

  return (
    // <TouchableOpacity
    //   onPress={() => {
    //     if (item.id) {
    //       console.log("Navigating to details of item with id:", item.id);
    //     } else {
    //       console.warn("Item does not have a valid id");
    //     }
    //   }}
    // >
    <View>
      {/* <ImageBackground
          source={{ uri: item.background }}
          // resizeMode='cover'
          imageStyle={{ borderRadius: scale(10) }}
          style={{
            width: screenWidth,
            height: verticalScale(150),
            marginTop: scale(10),
          }}
        >
          <LinearGradient
            colors={["rgba(40,53,86,0.9)", "transparent"]}
            style={styles.linearGradientStyle}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          />

          <ThemedText style={styles.description}>{item.description}</ThemedText>
        </ImageBackground> */}
      <Image
        source={require("../../assets/images/recommadation-bg.jpg")}
        style={[styles.backgroundImage, { width: screenWidth }]}
      />
      <View style={[styles.innerContainer, { width: screenWidth }]}>
        <ThemedText type="subtitle" style={styles.description}>
          {item.description}
        </ThemedText>
        <Image
          source={require("../../assets/images/coffee-1.webp")}
          style={styles.coffeeImage}
        />
      </View>
    </View>
    // </TouchableOpacity>
  );
};

export default RecommondationItem;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    left: scale(20),
    top: verticalScale(30),
  },
  backgroundImage: {
    height: verticalScale(150),
    borderRadius: scale(10),
    marginTop: scale(10),
  },
  coffeeImage: {
    right: scale(20),
    top: verticalScale(-25),
    position: "absolute",
    width: scale(175),
    height: scale(175),
  },
  description: {
    color: "#fff",
    fontWeight: "bold",
    width: "50%",
  },
});
