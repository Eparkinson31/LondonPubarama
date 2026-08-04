import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const features = {
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

export default function Features({
  setCurrentProgress,
  styles,
  saveFeatureSelection,
}: {
  setCurrentProgress: (progress: number) => void;
  styles: any;
  saveFeatureSelection: (features: string[]) => void;
}) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof features>("Beverages");
  const [isLinkVisible, setIsLinkVisible] = useState(false);

  const updatePreferences = (prefs: string[]) => {
    setIsLinkVisible(prefs.length > 0);
    if (prefs.length > 0) {
      setCurrentProgress(60);
    } else {
      setCurrentProgress(40);
    }
    setSelectedFeatures(prefs);
  };

  const toggleFeature = (preference: string) => {
    if (selectedFeatures.includes(preference)) {
      updatePreferences(selectedFeatures.filter((item) => item !== preference));
    } else {
      updatePreferences([...selectedFeatures, preference]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Features */}
      <Text style={[styles.sectionTitle]}>Third Place Features</Text>
      <Text style={styles.sectionSubtitle}>
        Please select the features that apply to your Third Place:
      </Text>

      <View style={featurestyles.tabsContainer}>
        {Object.keys(features).map((category) => (
          <Pressable
            key={category}
            onPress={() =>
              setSelectedCategory(category as keyof typeof features)
            }
            style={[
              featurestyles.tab,

              category === "Beverages" && featurestyles.beveragesTab,
              category === "Food" && featurestyles.foodTab,
              category === "Entertainment" && featurestyles.entertainmentTab,
              category === "Ambience" && featurestyles.ambienceTab,

              selectedCategory === category && featurestyles.activeTab,
            ]}
          >
            <Text
              style={[
                featurestyles.tabText,
                selectedCategory === category && featurestyles.activeTabText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={featurestyles.featuresContainer}>
        {features[selectedCategory].map((preference) => (
          <Pressable
            key={preference}
            onPress={() => toggleFeature(preference)}
            style={[
              featurestyles.featuresChip,
              selectedFeatures.includes(preference) &&
                featurestyles.featuresChipSelected,
            ]}
          >
            <Text
              style={[
                featurestyles.featuresText,
                selectedFeatures.includes(preference) &&
                  featurestyles.featuresTextSelected,
              ]}
            >
              {preference}
            </Text>
          </Pressable>
        ))}
      </View>
      {isLinkVisible && (
        <View>
          <Pressable
            style={styles.nextButton}
            onPress={() => saveFeatureSelection(selectedFeatures)}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const featurestyles = StyleSheet.create({
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
});
