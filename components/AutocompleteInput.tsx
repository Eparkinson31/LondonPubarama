import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// 1. Define types for the items and component props
export interface ItemData {
  id: string;
  name: string;
}

interface AutocompleteInputProps {
  data: ItemData[];
  placeholder?: string;
  onSelect: (item: ItemData) => void;
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  data,
  placeholder = "Search...",
  onSelect,
}) => {
  const [query, setQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<ItemData[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // 2. Filter data as the user types
  const handleSearch = (text: string) => {
    console.log("User typed:", text);
    setQuery(text);
    if (text.trim() === "") {
      setFilteredData([]);
    } else {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
      console.log("Filtered results:", filtered);
      setFilteredData(filtered);
    }
  };

  // 3. Handle selection and update text
  const handleSelectItem = (item: ItemData) => {
    setQuery(item.name);
    setFilteredData([]); // Hide list after selection
    setIsFocused(false);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={query}
        onChangeText={handleSearch}
        onFocus={() => setIsFocused(true)}
      />

      {/* 4. Display suggestions list dynamically */}
      {isFocused && filteredData.length > 0 && (
        <View style={styles.listContainer}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled" // Ensures tap triggers before keyboard hides
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleSelectItem(item)}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative", // Crucial for absolute layout positioning of dropdown
    zIndex: 1, // Keeps list floating over elements below it
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  listContainer: {
    position: "absolute",
    top: 55, // Positions list immediately below the TextInput box
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    maxHeight: 200,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
  },
});
