import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ThemedText } from "../ThemedText";

interface CategoryButtonItemProps {
  category: string;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  textColor: string;
}

const CategoryButtonItem: React.FC<CategoryButtonItemProps> = ({
  category,
  selectedCategory,
  setSelectedCategory,
  textColor,
}) => {
  return (
    <Pressable
      style={[
        styles.categoryButton,
        {
          backgroundColor:
            selectedCategory === category ? "#8B4513" : "#f0f0f0",
        },
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <ThemedText
        style={[
          styles.categoryText,
          {
            color: selectedCategory === category ? "#fff" : textColor,
          },
        ]}
      >
        {category}
      </ThemedText>
    </Pressable>
  );
};

export default CategoryButtonItem;

const styles = StyleSheet.create({
  categoryButton: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
    marginRight: scale(10),
  },
  categoryText: {
    fontSize: moderateScale(14),
    fontWeight: "500",
  },
});
