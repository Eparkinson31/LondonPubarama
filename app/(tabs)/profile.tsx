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

  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const preferences = [
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
    "Sunday Roast",
    "Pub Quiz",
    "Live Music",
    "Sports Screening",
    "Fish and Chips",
    "Open Mic Night",
    "DJ Nights",
    "Pool Table",
    "Darts",
    "Board Games",
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
    "Good for Groups",
    "Local Favourite",
    "Tourist Friendly",
    "Wheelchair Accessible",
  ];

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

  const togglePreference = (preference: string) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(
        selectedPreferences.filter((item) => item !== preference),
      );
    } else {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };

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
                  : require("../../assets/profile.jpg")
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

      <View style={styles.preferencesContainer}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        {isEditing ? (
          <View style={styles.chipsContainer}>
            {preferences.map((preference) => (
              <Pressable
                key={preference}
                onPress={() => togglePreference(preference)}
                style={[
                  styles.preferenceChip,
                  selectedPreferences.includes(preference) &&
                    styles.selectedPreferenceChip,
                ]}
              >
                <Text
                  style={[
                    styles.preferenceText,
                    selectedPreferences.includes(preference) &&
                      styles.selectedPreferenceText,
                  ]}
                >
                  {preference}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.chipsContainer}>
            {selectedPreferences.length > 0 ? (
              selectedPreferences.map((preference) => (
                <View key={preference} style={styles.selectedPreferenceChip}>
                  <Text style={styles.selectedPreferenceText}>
                    {preference}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.location}>No preferences selected</Text>
            )}
          </View>
        )}
      </View>

      <Pressable style={styles.button} onPress={() => setIsEditing(!isEditing)}>
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

  button: {
    marginTop: 30,
    backgroundColor: "#6F6C43",
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
