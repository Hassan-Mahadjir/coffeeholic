import CategoryButtonItem from "@/components/all-coffees/CategoryButtonItem";
import CoffeeItem from "@/components/all-coffees/CoffeeItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { coffeesData } from "@/data/coffeesData";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const AllCoffees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredCoffees, setFilteredCoffees] = useState(coffeesData);

  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "background");

  const categories = ["All", "Single Origin", "Blend", "Premium", "Organic"];

  useEffect(() => {
    let filtered = coffeesData;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (coffee) =>
          coffee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coffee.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          coffee.origin.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (coffee) => coffee.category === selectedCategory
      );
    }

    setFilteredCoffees(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            All Coffees
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Discover our premium coffee collection
          </ThemedText>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: "#f0f0f0" }]}>
          <Ionicons
            name="search"
            size={20}
            color={textColor}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Search coffees..."
            placeholderTextColor={textColor + "80"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category Filter */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <CategoryButtonItem
                category={item}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                textColor={textColor}
              />
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Results Count */}
        <ThemedText style={styles.resultsCount}>
          {filteredCoffees.length} coffee
          {filteredCoffees.length !== 1 ? "s" : ""} found
        </ThemedText>

        {/* Coffee Grid */}
        <FlatList
          data={filteredCoffees}
          renderItem={({ item }) => <CoffeeItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.coffeesList}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default AllCoffees;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(50),
  },
  header: {
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
  headerTitle: {
    fontSize: moderateScale(28),
    fontWeight: "bold",
    marginBottom: verticalScale(5),
  },
  headerSubtitle: {
    fontSize: moderateScale(16),
    opacity: 0.7,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scale(20),
    marginBottom: verticalScale(20),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(25),
  },
  searchIcon: {
    marginRight: scale(10),
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(16),
  },
  categoriesContainer: {
    marginBottom: verticalScale(15),
  },
  categoriesList: {
    paddingHorizontal: scale(20),
  },
  resultsCount: {
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(15),
    fontSize: moderateScale(14),
    opacity: 0.7,
  },
  coffeesList: {
    paddingHorizontal: scale(15),
    paddingBottom: verticalScale(20),
  },
  row: {
    justifyContent: "space-between",
    gap: scale(10),
  },
});
