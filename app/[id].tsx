import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { coffeesData } from "@/data/coffeesData";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const CoffeeDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const coffee = coffeesData.find((c) => c.id === parseInt(id as string));

  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "background");

  if (!coffee) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Coffee not found</ThemedText>
      </ThemedView>
    );
  }

  const getRoastColor = (roast: string) => {
    switch (roast) {
      case "light":
        return "#D4AF37";
      case "medium":
        return "#8B4513";
      case "dark":
        return "#2F1B14";
      default:
        return "#8B4513";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Single Origin":
        return "#4CAF50";
      case "Blend":
        return "#FF9800";
      case "Premium":
        return "#9C27B0";
      case "Organic":
        return "#4CAF50";
      default:
        return "#2196F3";
    }
  };

  const getCompositionColor = (ingredient: string) => {
    switch (ingredient.toLowerCase()) {
      case "coffee":
        return "#8B4513";
      case "water":
        return "#2196F3";
      case "milk":
        return "#FFF8DC";
      case "foam":
        return "#F5F5DC";
      case "chocolate":
        return "#D2691E";
      default:
        return "#9E9E9E";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "#4CAF50";
      case "Medium":
        return "#FF9800";
      case "Hard":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </Pressable>
        <View style={styles.headerActions}>
          <Pressable style={styles.actionButton}>
            <Ionicons name="heart-outline" size={24} color={textColor} />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Ionicons name="share-outline" size={24} color={textColor} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <View style={styles.imageBackground} />
          <Image source={coffee.image} style={styles.heroImage} />
        </View>

        {/* Coffee Info */}
        <View style={styles.contentContainer}>
          <View style={styles.titleSection}>
            <ThemedText type="title" style={styles.coffeeName}>
              {coffee.name}
            </ThemedText>
            <ThemedText style={styles.coffeeDescription}>
              {coffee.description}
            </ThemedText>
          </View>

          {/* Quick Info Cards */}
          <View style={styles.quickInfoContainer}>
            <View style={[styles.infoCard, { backgroundColor: cardColor }]}>
              <Ionicons name="location-outline" size={20} color={textColor} />
              <ThemedText style={styles.infoLabel}>Origin</ThemedText>
              <ThemedText style={styles.infoValue}>{coffee.origin}</ThemedText>
            </View>

            <View style={[styles.infoCard, { backgroundColor: cardColor }]}>
              <Ionicons
                name="flame-outline"
                size={20}
                color={getRoastColor(coffee.roast)}
              />
              <ThemedText style={styles.infoLabel}>Roast</ThemedText>
              <ThemedText
                style={[
                  styles.infoValue,
                  { color: getRoastColor(coffee.roast) },
                ]}
              >
                {coffee.roast}
              </ThemedText>
            </View>

            <View style={[styles.infoCard, { backgroundColor: cardColor }]}>
              <Ionicons
                name="pricetag-outline"
                size={20}
                color={getCategoryColor(coffee.category)}
              />
              <ThemedText style={styles.infoLabel}>Category</ThemedText>
              <ThemedText
                style={[
                  styles.infoValue,
                  { color: getCategoryColor(coffee.category) },
                ]}
              >
                {coffee.category}
              </ThemedText>
            </View>
          </View>

          {/* Composition Visualization */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="cafe-outline" size={24} color={textColor} />
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Composition
              </ThemedText>
            </View>
            <View
              style={[styles.compositionCard, { backgroundColor: cardColor }]}
            >
              {/* Visual bar */}
              <View style={styles.compositionBar}>
                {Object.entries(coffee.composition)
                  .filter(([, percentage]) => percentage !== undefined)
                  .map(([ingredient, percentage]) => {
                    const percentageValue = percentage as number;
                    return (
                      <View
                        key={ingredient}
                        style={[
                          styles.compositionSegment,
                          {
                            backgroundColor: getCompositionColor(ingredient),
                            width: `${percentageValue}%`,
                          },
                        ]}
                      >
                        {percentageValue > 15 && (
                          <ThemedText style={styles.compositionText}>
                            {percentageValue}%
                          </ThemedText>
                        )}
                      </View>
                    );
                  })}
              </View>

              {/* Detailed breakdown */}
              <View style={styles.compositionDetails}>
                {Object.entries(coffee.composition)
                  .filter(([, percentage]) => percentage !== undefined)
                  .map(([ingredient, percentage]) => {
                    const percentageValue = percentage as number;
                    return (
                      <View key={ingredient} style={styles.compositionItem}>
                        <View style={styles.compositionItemHeader}>
                          <View
                            style={[
                              styles.compositionDot,
                              {
                                backgroundColor:
                                  getCompositionColor(ingredient),
                              },
                            ]}
                          />
                          <ThemedText style={styles.compositionIngredient}>
                            {ingredient.charAt(0).toUpperCase() +
                              ingredient.slice(1)}
                          </ThemedText>
                          <ThemedText style={styles.compositionPercentage}>
                            {percentageValue}%
                          </ThemedText>
                        </View>
                        <View style={styles.progressBar}>
                          <View
                            style={[
                              styles.progressFill,
                              {
                                backgroundColor:
                                  getCompositionColor(ingredient),
                                width: `${percentageValue}%`,
                              },
                            ]}
                          />
                        </View>
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>

          {/* Coffee Details */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={textColor}
              />
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Coffee Details
              </ThemedText>
            </View>
            <View style={styles.detailsGrid}>
              <View style={[styles.detailItem, { backgroundColor: cardColor }]}>
                <Ionicons name="location-outline" size={20} color={textColor} />
                <ThemedText style={styles.detailLabel}>Region</ThemedText>
                <ThemedText style={styles.detailValue}>
                  {coffee.region}
                </ThemedText>
              </View>

              <View style={[styles.detailItem, { backgroundColor: cardColor }]}>
                <Ionicons
                  name="trending-up-outline"
                  size={20}
                  color={textColor}
                />
                <ThemedText style={styles.detailLabel}>Altitude</ThemedText>
                <ThemedText style={styles.detailValue}>
                  {coffee.altitude}
                </ThemedText>
              </View>

              <View style={[styles.detailItem, { backgroundColor: cardColor }]}>
                <Ionicons name="leaf-outline" size={20} color={textColor} />
                <ThemedText style={styles.detailLabel}>Process</ThemedText>
                <ThemedText style={styles.detailValue}>
                  {coffee.process}
                </ThemedText>
              </View>

              <View style={[styles.detailItem, { backgroundColor: cardColor }]}>
                <Ionicons name="flower-outline" size={20} color={textColor} />
                <ThemedText style={styles.detailLabel}>Variety</ThemedText>
                <ThemedText style={styles.detailValue}>
                  {coffee.variety.join(", ")}
                </ThemedText>
              </View>

              <View style={[styles.detailItem, { backgroundColor: cardColor }]}>
                <Ionicons name="calendar-outline" size={20} color={textColor} />
                <ThemedText style={styles.detailLabel}>Harvest</ThemedText>
                <ThemedText style={styles.detailValue}>
                  {coffee.harvest}
                </ThemedText>
              </View>

              <View style={[styles.detailItem, { backgroundColor: cardColor }]}>
                <Ionicons name="business-outline" size={20} color={textColor} />
                <ThemedText style={styles.detailLabel}>Roaster</ThemedText>
                <ThemedText style={styles.detailValue}>
                  {coffee.roaster}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Tasting Notes */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="wine-outline" size={24} color={textColor} />
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Tasting Notes
              </ThemedText>
            </View>
            <View style={styles.tastingNotesContainer}>
              {coffee.tastingNotes.map((note, index) => (
                <View
                  key={index}
                  style={[styles.tastingNote, { backgroundColor: cardColor }]}
                >
                  <ThemedText style={styles.tastingNoteText}>{note}</ThemedText>
                </View>
              ))}
            </View>
          </View>

          {/* Brewing Guide */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="cafe-outline" size={24} color={textColor} />
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Brewing Guide
              </ThemedText>
            </View>
            <View style={[styles.brewingCard, { backgroundColor: cardColor }]}>
              <View style={styles.brewingInfo}>
                <View style={styles.brewingInfoItem}>
                  <Ionicons name="time-outline" size={20} color={textColor} />
                  <ThemedText style={styles.brewingInfoLabel}>
                    Prep Time
                  </ThemedText>
                  <ThemedText style={styles.brewingInfoValue}>
                    {coffee.prepTime}
                  </ThemedText>
                </View>
                <View style={styles.brewingInfoItem}>
                  <Ionicons name="people-outline" size={20} color={textColor} />
                  <ThemedText style={styles.brewingInfoLabel}>
                    Servings
                  </ThemedText>
                  <ThemedText style={styles.brewingInfoValue}>
                    {coffee.servings}
                  </ThemedText>
                </View>
                <View style={styles.brewingInfoItem}>
                  <Ionicons
                    name="speedometer-outline"
                    size={20}
                    color={getDifficultyColor(coffee.difficulty)}
                  />
                  <ThemedText style={styles.brewingInfoLabel}>
                    Difficulty
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.brewingInfoValue,
                      { color: getDifficultyColor(coffee.difficulty) },
                    ]}
                  >
                    {coffee.difficulty}
                  </ThemedText>
                </View>
              </View>
            </View>
            <View style={styles.brewingSteps}>
              {coffee.instructions.map((instruction, index) => (
                <View key={index} style={styles.brewingStep}>
                  <View
                    style={[styles.stepNumber, { backgroundColor: textColor }]}
                  >
                    <ThemedText
                      style={[
                        styles.stepNumberText,
                        { color: backgroundColor },
                      ]}
                    >
                      {index + 1}
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.stepText}>{instruction}</ThemedText>
                </View>
              ))}
            </View>
          </View>

          {/* Pro Tips */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="bulb-outline" size={24} color={textColor} />
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Pro Tips
              </ThemedText>
            </View>
            <View style={styles.tipsContainer}>
              {coffee.tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <View
                    style={[styles.tipBullet, { backgroundColor: textColor }]}
                  />
                  <ThemedText style={styles.tipText}>{tip}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default CoffeeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(10),
  },
  backButton: {
    padding: scale(8),
  },
  headerActions: {
    flexDirection: "row",
    gap: scale(10),
  },
  actionButton: {
    padding: scale(8),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: verticalScale(100),
  },
  heroContainer: {
    alignItems: "center",
    paddingVertical: verticalScale(30),
    position: "relative",
  },
  imageBackground: {
    position: "absolute",
    width: scale(200),
    height: scale(200),
    backgroundColor: "#8B4513",
    borderRadius: scale(100),
    opacity: 0.1,
  },
  heroImage: {
    width: scale(180),
    height: scale(180),
    resizeMode: "cover",
    borderRadius: scale(90),
  },
  contentContainer: {
    paddingHorizontal: scale(20),
  },
  titleSection: {
    marginBottom: verticalScale(30),
    alignItems: "center",
  },
  coffeeName: {
    fontSize: moderateScale(28),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: verticalScale(10),
  },
  coffeeDescription: {
    fontSize: moderateScale(16),
    textAlign: "center",
    opacity: 0.8,
    lineHeight: moderateScale(24),
  },
  quickInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(30),
    gap: scale(10),
  },
  infoCard: {
    flex: 1,
    padding: scale(15),
    borderRadius: moderateScale(12),
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoLabel: {
    fontSize: moderateScale(12),
    opacity: 0.7,
    marginTop: verticalScale(5),
    marginBottom: verticalScale(2),
  },
  infoValue: {
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
  section: {
    marginBottom: verticalScale(30),
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(15),
    gap: scale(10),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: "600",
  },
  compositionCard: {
    padding: scale(20),
    borderRadius: moderateScale(12),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  compositionBar: {
    flexDirection: "row",
    height: verticalScale(30),
    borderRadius: moderateScale(15),
    overflow: "hidden",
    marginBottom: verticalScale(20),
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  compositionSegment: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  compositionText: {
    color: "#FFFFFF",
    fontSize: moderateScale(12),
    fontWeight: "bold",
  },
  compositionDetails: {
    gap: verticalScale(15),
  },
  compositionItem: {
    gap: verticalScale(5),
  },
  compositionItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  compositionDot: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
  },
  compositionIngredient: {
    flex: 1,
    fontSize: moderateScale(14),
    fontWeight: "500",
  },
  compositionPercentage: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    opacity: 0.8,
  },
  progressBar: {
    height: verticalScale(4),
    backgroundColor: "#E0E0E0",
    borderRadius: scale(2),
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: scale(2),
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(10),
  },
  detailItem: {
    width: "48%",
    padding: scale(15),
    borderRadius: moderateScale(12),
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  detailLabel: {
    fontSize: moderateScale(12),
    opacity: 0.7,
    marginTop: verticalScale(5),
    marginBottom: verticalScale(2),
    textAlign: "center",
  },
  detailValue: {
    fontSize: moderateScale(13),
    fontWeight: "600",
    textAlign: "center",
  },
  tastingNotesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(10),
  },
  tastingNote: {
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  tastingNoteText: {
    fontSize: moderateScale(14),
    fontWeight: "500",
  },
  brewingCard: {
    padding: scale(20),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(20),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  brewingInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  brewingInfoItem: {
    alignItems: "center",
    gap: verticalScale(5),
  },
  brewingInfoLabel: {
    fontSize: moderateScale(12),
    opacity: 0.7,
  },
  brewingInfoValue: {
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
  brewingSteps: {
    gap: verticalScale(15),
  },
  brewingStep: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(15),
  },
  stepNumber: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumberText: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
  stepText: {
    flex: 1,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(22),
  },
  tipsContainer: {
    gap: verticalScale(12),
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: scale(12),
  },
  tipBullet: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    marginTop: verticalScale(8),
  },
  tipText: {
    flex: 1,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(22),
    opacity: 0.8,
  },
});
