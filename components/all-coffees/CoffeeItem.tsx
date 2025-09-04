import { Coffee } from "@/data/coffeesData";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ThemedText } from "../ThemedText";

const CoffeeItem = ({ item }: { item: Coffee }) => {
  return (
    <Pressable style={styles.coffeeCard}>
      <Image source={item.image} style={styles.coffeeImage} />
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
        <View style={styles.coffeeFooter}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <ThemedText style={styles.rating}>{item.rating}</ThemedText>
          </View>
          <ThemedText type="subtitle" style={styles.price}>
            ${item.price}
          </ThemedText>
        </View>
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
    width: "100%",
    height: verticalScale(120),
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
  coffeeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: moderateScale(12),
    marginLeft: scale(4),
    fontWeight: "500",
  },
  price: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: "#8B4513",
  },
});
