import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

export default function ThirdPlaceName({
  setCurrentProgress,
  saveThirdPlaceName,
}: {
  setCurrentProgress: (progress: number) => void;
  saveThirdPlaceName: (name: string) => void;
}) {
  const [thirdPlaceName, setThirdPlaceName] = useState("");
  const [isLinkVisible, setIsLinkVisible] = useState(false);

  const validateThirdPlaceName = (text: string) => {
    setThirdPlaceName(text);
    setIsLinkVisible(text.trim().length > 0);
    if (text.trim().length > 0) {
      setCurrentProgress(20);
    } else {
      setCurrentProgress(2);
    }
  };

  return (
    <View
      style={styles.container}
      // ContainerStyle={{ paddingBottom: 40 }}
      // showsVerticalScrollIndicator={false}
    >
      {/* Add Third Place Name */}
      <Text style={styles.sectionTitle}>Add Third Place Name</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Third place name..."
          placeholderTextColor="#9B9B9B"
          value={thirdPlaceName}
          onChangeText={validateThirdPlaceName}
          autoCapitalize="words"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>
      {isLinkVisible && (
        <Pressable
          style={styles.nextButton}
          onPress={() => saveThirdPlaceName(thirdPlaceName)}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      )}
    </View>
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
