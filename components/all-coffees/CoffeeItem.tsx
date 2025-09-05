import { Coffee } from "@/data/coffeesData";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ThemedText } from "../ThemedText";

const CoffeeItem = ({ item }: { item: Coffee }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/[id]",
      params: { id: item.id.toString() },
    });
  };

  return (
    <Pressable style={styles.coffeeCard} onPress={handlePress}>
      <View style={{ position: "relative", alignItems: "center" }}>
        <View style={styles.imageBackground} />
        <Image source={item.image} style={styles.coffeeImage} />
      </View>
      <View style={styles.coffeeInfo}>
        <ThemedText type="subtitle" style={styles.coffeeName}>
          {item.name}
        </ThemedText>
        <ThemedText style={styles.coffeeOrigin}>
          {item.origin} • {item.roast} roast
        </ThemedText>
        <ThemedText style={styles.coffeeDescription} numberOfLines={2}>
          {item.description}
        </ThemedText>
      </View>
    </Pressable>
  );
};

export default CoffeeItem;

const styles = StyleSheet.create({
  coffeeCard: {
    width: scale(160),
    marginBottom: verticalScale(20),
    borderRadius: moderateScale(15),
    overflow: "hidden",
    backgroundColor: "#ffffff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  coffeeImage: {
    width: "80%",
    height: verticalScale(100),
    resizeMode: "cover",
  },
  coffeeInfo: {
    padding: scale(12),
  },
  coffeeName: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginBottom: verticalScale(4),
  },
  coffeeOrigin: {
    fontSize: moderateScale(12),
    opacity: 0.7,
    marginBottom: verticalScale(6),
  },
  coffeeDescription: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    marginBottom: verticalScale(10),
  },
  imageBackground: {
    position: "absolute",
    top: verticalScale(35),
    width: "80%",
    height: "60%",
    backgroundColor: "#8B4513",
    borderRadius: moderateScale(20),
  },
});
