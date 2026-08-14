import { AutocompleteInput, ItemData } from "@/components/AutocompleteInput";
import BackEnd from "@/components/BackEnd";
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
  cancel,
  label,
}: {
  setCurrentProgress: (progress: number) => void;
  styles: any;
  saveLocationName: (location: string) => void;
  cancel: () => void;
  label: string;
}) {
  const [location, setLocation] = useState("");
  const [isLinkVisible, setIsLinkVisible] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [itemData, setItemData] = useState<ItemData[]>([]);

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
        const itemDataArray: ItemData[] = data.map((location: Location) => ({
          id: location.id.toString(),
          name: location.location,
        }));
        setItemData(itemDataArray);
        //console.log("Fetched locations:", itemDataArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSelection = (selectedItem: ItemData) => {
    console.log("Selected:", selectedItem);
    validateLocation(String(selectedItem.name));
  };

  return (
    <View style={styles.container}>
      {/* Location */}
      <View>
        <Text style={styles.sectionTitle}>{label}</Text>
        <AutocompleteInput
          data={itemData}
          placeholder="Type Location..."
          onSelect={handleSelection}
        />
      </View>
      {isLinkVisible && (
        <Pressable
          style={styles.nextButton}
          onPress={() => saveLocationName(location)}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      )}
      <Pressable
        style={styles.cancelButton}
        onPress={() => {
          cancel();
        }}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
    </View>
  );
}
