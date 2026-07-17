import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

interface BasicInformation {
  pubName: string;
  created_at: string;
  postal_code: string;
  Address: string;
  ShortDescription: string;
}

const pubPreferences = {
  Beverages: [
    "Traditional Pub",
    "Craft Beer",
    "Real Ale",
    "IPA",
    "Lager",
    "Cider",
    "Coke",
    "Coke Zero",
    "Diet Coke",
    "Sprite",
    "Coffee",
    "Tea",
    "Lemonade",
    "Alcohol Free Beer",
    "Guinness",
    "Pimms",
    "Aperol Spritz",
  ],
  Food: ["Sunday Roast", "Burgers", "Vegan Options", "Vegetarian Options"],
  Entertainment: [
    "Pub Quiz",
    "Live Music",
    "Sports Screening",
    "Fish and Chips",
    "Open Mic Night",
    "DJ Nights",
    "Pool Table",
    "Darts",
    "Board Games",
    "Fireplace",
    "Karaoke",
  ],
  Ambience: [
    "Dog Friendly",
    "Family Friendly",
    "Historic Pub",
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

  const togglePubPreference = (preference: string) => {
    if (selectedPubPreferences.includes(preference)) {
      setSelectedPubPreferences(
        selectedPubPreferences.filter((item) => item !== preference),
      );
    } else {
      setSelectedPubPreferences([...selectedPubPreferences, preference]);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Tracker */}
      <View style={styles.tracker}>
        <View style={styles.step}>
          <View style={styles.circle}>
            <Text style={styles.number}>1</Text>
          </View>
          <Text style={styles.label}>Details</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.step}>
          <View style={styles.circle}>
            <Text style={styles.number}>2</Text>
          </View>
          <Text style={styles.label}>Location</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.step}>
          <View style={styles.circle}>
            <Text style={styles.number}>3</Text>
          </View>
          <Text style={styles.label}>Finish</Text>
        </View>
      </View>

      {/* Features */}
      <Text style={styles.sectionTitle}>Pub Features</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6F6C43",
    width: 30,
    height: 20,
    borderRadius: 25,
    backgroundColor: "#bdcfd3",
    justifyContent: "center",
    alignItems: "center",
  },

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
    backgroundColor: "#E8EEF0",
    borderWidth: 1,
    borderColor: "#BDC3C7",
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
    color: "#6F6C43",
    fontWeight: "600",
  },

  featuresTextSelected: {
    color: "#FFFCF2",
  },

  tabsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  tab: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#E8EEF0",
    borderRadius: 20,
    marginRight: 10,
  },

  activeTab: {
    backgroundColor: "#6F6C43",
  },

  tabText: {
    color: "#6F6C43",
    fontWeight: "600",
  },

  activeTabText: {
    color: "#FFFCF2",
  },
});
