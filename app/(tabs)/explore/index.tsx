import CategoryButtonItem from "@/components/all-coffees/CategoryButtonItem";
import CoffeeItem from "@/components/all-coffees/CoffeeItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { coffeesData } from "@/data/coffeesData";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const ExploreIndex = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredCoffees, setFilteredCoffees] = useState(coffeesData);

  // Animated values for header subtitle and search bar visibility
  const headerAnim = useRef(new Animated.Value(1)).current; // 1 = shown, 0 = hidden
  const searchAnim = useRef(new Animated.Value(1)).current; // 1 = shown, 0 = hidden
  const categoryMarginAnim = useRef(new Animated.Value(0)).current; // 0 = normal, negative = moved up
  const lastOffsetYRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const isShownRef = useRef(true);
  const screenHeight = useRef(Dimensions.get("window").height).current;
  const thresholdY = screenHeight * 0.1;

  const animateVisibility = (show: boolean) => {
    if (isShownRef.current === show) return;
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    Animated.parallel([
      Animated.timing(headerAnim, {
        toValue: show ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(searchAnim, {
        toValue: show ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(categoryMarginAnim, {
        toValue: show ? 0 : -verticalScale(80), // Move up by ~80px when hidden
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => {
      isAnimatingRef.current = false;
      isShownRef.current = show;
    });
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = e.nativeEvent.contentOffset.y;
    // Toggle visibility based on 20% screen height threshold
    if (currentY > thresholdY) {
      animateVisibility(false);
    } else {
      animateVisibility(true);
    }
    lastOffsetYRef.current = currentY;
  };

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
          <Animated.View
            style={{
              opacity: headerAnim,
              transform: [
                {
                  translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-8, 0],
                  }),
                },
              ],
            }}
          >
            <ThemedText style={styles.headerSubtitle}>
              Discover our premium coffee collection
            </ThemedText>
          </Animated.View>
        </View>

        {/* Search Bar */}
        <Animated.View
          style={{
            opacity: searchAnim,
            transform: [
              {
                translateY: searchAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 0],
                }),
              },
            ],
          }}
        >
          <View
            style={[styles.searchContainer, { backgroundColor: "#f0f0f0" }]}
          >
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
        </Animated.View>

        {/* Category Filter */}
        <Animated.View
          style={[
            styles.categoriesContainer,
            {
              marginTop: categoryMarginAnim,
            },
          ]}
        >
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
        </Animated.View>

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
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default ExploreIndex;

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
    paddingBottom: verticalScale(100),
  },
  row: {
    justifyContent: "space-between",
    gap: scale(10),
  },
});
