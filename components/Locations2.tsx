import BackEnd from "@/components/BackEnd";
import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

interface Location {
  city: string;
  created_at: string;
  id: number;
  location: string;
  postal_code: string;
}

export default function Locations({
  setCurrentProgress,
  styles,
  saveLocationName,
}: {
  setCurrentProgress: (progress: number) => void;
  styles: any;
  saveLocationName: (location: string) => void;
}) {
  const [location, setLocation] = useState("");
  const [isLinkVisible, setIsLinkVisible] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);

  const validateLocation = (text: string) => {
    setLocation(text);
    setIsLinkVisible(text.trim().length > 0);
    if (text.trim().length > 0) {
      setCurrentProgress(40);
    } else {
      setCurrentProgress(2);
    }
  };

  useEffect(() => {
    fetch(`${BackEnd()}/alllocations`)
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* Location */}
      <View style={styles.pickerContainer}>
        <Text style={styles.sectionTitle}>Add Third Place Location</Text>
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
        <Pressable
          style={styles.nextButton}
          onPress={() => saveLocationName(location)}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      )}
      <Link href="/" asChild>
        <Pressable style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      </Link>
    </View>
  );
}
