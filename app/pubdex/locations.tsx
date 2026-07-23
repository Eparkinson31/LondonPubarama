import { ProgressBar } from "@/components/ProgressBar2";
import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

interface Location {
  city: string;
  created_at: string;
  id: number;
  location: string;
  postal_code: string;
}

export default function Pubdex() {
  const [location, setLocation] = useState("");
  const [isLinkVisible, setIsLinkVisible] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentProgress, setCurrentProgress] = useState(20);

  const validateLocation = (text: string) => {
    setLocation(text);
    setIsLinkVisible(text.trim().length > 0);
    if (text.trim().length > 0) {
      setCurrentProgress(40);
    } else {
      setCurrentProgress(2);
    }
  };

  // };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/alllocations")
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <ProgressBar progress={currentProgress} />

      {/* Location */}
      <View style={styles.pickerContainer}>
        <Text style={styles.sectionTitle}>Add Pub Location</Text>
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => validateLocation(String(itemValue))}
        >
          <Picker.Item
            label="Select the area where the pub is located"
            value=""
          />

          {locations.map((location, index) => (
            <Picker.Item
              key={index}
              label={location.location}
              value={location.location}
            />
          ))}
        </Picker>
      </View>
      {isLinkVisible && (
        <Link href="/pubdex/features" asChild>
          <Pressable style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        </Link>
      )}
      <Link href="/" asChild>
        <Pressable style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      </Link>
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

  pickerContainer: {
    backgroundColor: "#fffcf2",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
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
  cancelButton: {
    width: 90,
    height: 40,
    backgroundColor: "#b03924",
    borderWidth: 1,
    borderColor: "#b03924",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 40,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFFCF2",
    fontSize: 16,
    fontWeight: "600",
  },

  nextButtonText: {
    color: "#FFFCF2",
    fontSize: 16,
    fontWeight: "600",
  },
});
