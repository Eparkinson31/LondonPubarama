import { ProgressBar } from "@/components/ProgressBar2";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const pubPreferences = {
  Beverages: [
    "Craft Beer",
    "Real Ale",
    "IPA",
    "Lager",
    "Cider",
    "Coke",
    "Coke Zero",
    "Diet Coke",
    "7 Up",
    "Coffee",
    "Tea",
    "Ginger Ale",
    "J2O",
    "Lemonade",
    "Alcohol Free Beer",
    "Guinness",
    "Pimms",
    "Aperol Spritz",
  ],
  Food: [
    "Sunday Roast",
    "Burgers",
    "Vegan Options",
    "Vegetarian Options",
    "Gluten Free Options",
    "Fish and Chips",
    "Scotch Egg",
    "Sausage Rolls",
    "Pork Pies",
    "Bangers and Mash",
    "Steak and Ale Pie",
    "Ploughman's Lunch",
    "Full English Breakfast",
    "Chips",
    "Sticky Toffee Pudding",
    "Apple Crumble",
    "Brownie",
    "Nuts",
    "Pork Scatchings",
  ],
  Entertainment: [
    "Pub Quiz",
    "Live Music",
    "Sports Screening",
    "Open Mic Night",
    "DJ Nights",
    "Pool Table",
    "Darts",
    "Board Games",
    "Fireplace",
    "Karaoke",
    "Live Sports",
  ],
  Ambience: [
    "Traditional Pub",
    "Historic Pub",
    "Dog Friendly",
    "Family Friendly",
    "Riverside",
    "Beer Garden",
    "Rooftop",
    "Cosy",
    "Quiet",
    "Lively",
    "Late Night",
    "Outdoor Seating",
    "Wheelchair Accessible",
  ],
};

export default function Pubdex() {
  const [selectedPubPreferences, setSelectedPubPreferences] = useState<
    string[]
  >([]);

  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof pubPreferences>("Beverages");
  const [currentProgress, setCurrentProgress] = useState(40);
  const [isLinkVisible, setIsLinkVisible] = useState(false);

  const updatePreferences = (prefs: string[]) => {
    setIsLinkVisible(prefs.length > 0);
    if (prefs.length > 0) {
      setCurrentProgress(60);
    } else {
      setCurrentProgress(40);
    }
    setSelectedPubPreferences(prefs);
  };

  const togglePubPreference = (preference: string) => {
    if (selectedPubPreferences.includes(preference)) {
      updatePreferences(
        selectedPubPreferences.filter((item) => item !== preference),
      );
    } else {
      updatePreferences([...selectedPubPreferences, preference]);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Tracker */}
      <ProgressBar progress={currentProgress} />

      {/* Features */}
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Pub Features</Text>
      <Text style={styles.sectionSubtitle}>
        Please select the features that apply to your pub:
      </Text>

      <View style={styles.tabsContainer}>
        {Object.keys(pubPreferences).map((category) => (
          <Pressable
            key={category}
            onPress={() =>
              setSelectedCategory(category as keyof typeof pubPreferences)
            }
            style={[
              styles.tab,

              category === "Beverages" && styles.beveragesTab,
              category === "Food" && styles.foodTab,
              category === "Entertainment" && styles.entertainmentTab,
              category === "Ambience" && styles.ambienceTab,

              selectedCategory === category && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                selectedCategory === category && styles.activeTabText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.featuresContainer}>
        {pubPreferences[selectedCategory].map((preference) => (
          <Pressable
            key={preference}
            onPress={() => togglePubPreference(preference)}
            style={[
              styles.featuresChip,
              selectedPubPreferences.includes(preference) &&
                styles.featuresChipSelected,
            ]}
          >
            <Text
              style={[
                styles.featuresText,
                selectedPubPreferences.includes(preference) &&
                  styles.featuresTextSelected,
              ]}
            >
              {preference}
            </Text>
          </Pressable>
        ))}
      </View>
      {isLinkVisible && (
        <View>
          <Link href="/pubdex/picture" asChild>
            <Pressable style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Next</Text>
            </Pressable>
          </Link>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffcf2",
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  tracker: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 40,
  },

  step: {
    width: 70,
    alignItems: "center",
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#bdcfd3",
    justifyContent: "center",
    alignItems: "center",
  },

  number: {
    color: "#fffcf2",
    fontSize: 18,
    fontWeight: "bold",
  },

  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#bdcfd3",
    marginTop: 25,
    marginHorizontal: 8,
  },

  label: {
    marginTop: 10,
    textAlign: "center",
    color: "#6F6C43",
    fontWeight: "bold",
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6F6C43",
    marginBottom: 20,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#6F6C43",
    marginBottom: 20,
  },

  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  featuresChip: {
    backgroundColor: "#bdcfd3",
    borderWidth: 1,
    borderColor: "#bdcfd3",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
  },

  featuresChipSelected: {
    backgroundColor: "#6F6C43",
    borderColor: "#6F6C43",
  },

  featuresText: {
    color: "#fffcf2",
    fontWeight: "600",
  },

  featuresTextSelected: {
    color: "#FFFCF2",
  },

  tabsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },

  tab: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#E8EEF0",
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },

  activeTab: {
    backgroundColor: "#6F6C43",
  },

  tabText: {
    color: "#FFFCF2",
    fontWeight: "600",
  },

  activeTabText: {
    color: "#FFFCF2",
  },
  beveragesTab: {
    backgroundColor: "#ce9fa7",
  },

  foodTab: {
    backgroundColor: "#ce9fa7",
  },

  entertainmentTab: {
    backgroundColor: "#ce9fa7",
  },

  ambienceTab: {
    backgroundColor: "#ce9fa7",
  },

  nextButton: {
    width: 90,
    height: 40,
    backgroundColor: "#6F6C43",
    borderWidth: 1,
    borderColor: "#6F6C43",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  nextButtonText: {
    color: "#FFFCF2",
    fontSize: 16,
    fontWeight: "600",
  },
});
