import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [areas, setAreas] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [selectedPubPreferences, setSelectedPubPreferences] = useState<
    string[]
  >([]);

  const pubPreferences = [
    "Traditional Pub",
    "Craft Beer",
    "Real Ale",
    "IPA",
    "Lager",
    "Cider",
    "Alcohol Free Beer",
    "Guiness",
    "Pimms",
    "Aperol Spritz",
    "Sunday Roast",
    "Burgers",
    "Vegan Options",
    "Vegetarian Options",
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
  ];
  // List of preferences for users to select from when editing their profile//
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const togglePubPreference = (pubpreference: string) => {
    if (selectedPubPreferences.includes(pubpreference)) {
      setSelectedPubPreferences(
        selectedPubPreferences.filter((item) => item !== pubpreference),
      );
    } else {
      setSelectedPubPreferences([...selectedPubPreferences, pubpreference]);
    }
  };
  // UseEffect hook fetches the list of London areas from the backend API when the component mounts and stores
  // it in the areas state variable, which is then used to populate the location picker in the profile editing form.
  useEffect(() => {
    fetch("http://127.0.0.1:5000/location")
      .then((response) => response.json())
      .then((data) => {
        setAreas(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View style={styles.header}>
        <View style={styles.profilePicContainer}>
          <Pressable onPress={pickImageAsync}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../assets/profilepicillustration.jpg")
              }
              style={styles.profilePic}
            />
          </Pressable>

          <Pressable style={styles.editPhotoButton} onPress={pickImageAsync}>
            <Text style={styles.editPhotoText}>+</Text>
          </Pressable>
        </View>

        <View style={styles.infoContainer}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.nameInput}
                placeholder="Enter Name"
                placeholderTextColor="#6F6C43"
                value={name}
                onChangeText={setName}
              />

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={location}
                  onValueChange={(itemValue) => setLocation(String(itemValue))}
                >
                  <Picker.Item label="Select your London area" value="" />

                  {areas.map((area, index) => (
                    <Picker.Item key={index} label={area} value={area} />
                  ))}
                </Picker>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.name}>{name || "No name entered"}</Text>

              <Text style={styles.location}>
                {location || "No location selected"}
              </Text>
            </>
          )}
        </View>
      </View>
      {/* Displays the preferences section of the profile, showing either editable chips
        for selecting preferences or static chips displaying the selected preferences, 
        depending on whether the user is in editing mode or not. The togglePreference 
        function is used to add or remove preferences from the selectedPreferences state 
        when a chip is pressed. */}
      <View style={styles.preferencesContainer}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        {isEditing ? (
          <View style={styles.chipsContainer}>
            {pubPreferences.map((pubPreference) => (
              <Pressable
                key={pubPreference}
                onPress={() => togglePubPreference(pubPreference)}
                style={[
                  styles.preferenceChip,
                  selectedPubPreferences.includes(pubPreference) &&
                    styles.selectedPreferenceChip,
                ]}
              >
                <Text
                  style={[
                    styles.preferenceText,
                    selectedPubPreferences.includes(pubPreference) &&
                      styles.selectedPreferenceText,
                  ]}
                >
                  {pubPreference}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.chipsContainer}>
            {selectedPubPreferences.length > 0 ? (
              selectedPubPreferences.map((pubPreference) => (
                <View key={pubPreference} style={styles.selectedPreferenceChip}>
                  <Text style={styles.selectedPreferenceText}>
                    {pubPreference}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.location}>No preferences selected</Text>
            )}
          </View>
        )}
      </View>

      <Pressable
        style={styles.editprofilebutton}
        onPress={() => setIsEditing(!isEditing)}
      >
        <Text style={styles.buttonText}>
          {isEditing ? "Save Profile" : "Edit Profile"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffcf2",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  profilePicContainer: {
    position: "relative",
    marginRight: 20,
  },

  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  editPhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#bdcfd3",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fffcf2",
  },

  editPhotoText: {
    fontSize: 18,
    color: "#fffcf2",
    fontWeight: "bold",
  },

  infoContainer: {
    flex: 1,
  },

  nameInput: {
    fontSize: 30,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#6F6C43",
    paddingBottom: 5,
    marginBottom: 10,
    color: "#6F6C43",
  },

  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6F6C43",
  },

  location: {
    fontSize: 18,
    color: "#6F6C43",
    marginTop: 5,
  },

  pickerContainer: {
    backgroundColor: "#fffcf2",
    borderWidth: 2,
    borderColor: "#6F6C43",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
  },

  preferencesContainer: {
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6F6C43",
    marginBottom: 12,
  },

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  preferenceChip: {
    borderWidth: 1,
    borderColor: "#6F6C43",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },

  selectedPreferenceChip: {
    backgroundColor: "#6F6C43",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },

  preferenceText: {
    color: "#6F6C43",
  },

  selectedPreferenceText: {
    color: "#fffcf2",
  },

  editprofilebutton: {
    marginTop: 10,
    backgroundColor: "#bdcfd3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  buttonText: {
    color: "#fffcf2",
    fontWeight: "bold",
    fontSize: 16,
  },
});
