import { ProgressBar } from "@/components/ProgressBar2";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface BasicInformation {
  pubName: string;
  created_at: string;
  postal_code: string;
  Address: string;
  ShortDescription: string;
}

export default function Pubdex() {
  const [pubName, setPubName] = useState("");
  const [isLinkVisible, setIsLinkVisible] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(2);

  const validatePubName = (text: string) => {
    setPubName(text);
    setIsLinkVisible(text.trim().length > 0);
    if (text.trim().length > 0) {
      setCurrentProgress(20);
    } else {
      setCurrentProgress(2);
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

      {/* Add Pub Name */}
      <Text style={styles.sectionTitle}>Add Pub Name</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pub name..."
          placeholderTextColor="#9B9B9B"
          value={pubName}
          onChangeText={validatePubName}
          autoCapitalize="words"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>
      {isLinkVisible && (
        <Link href="/pubdex/locations" asChild>
          <Pressable style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        </Link>
      )}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#bdcfd3",
    paddingHorizontal: 16,
    marginBottom: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#6F6C43",
    paddingVertical: 14,
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
