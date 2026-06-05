import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [areas, setAreas] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);

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
  // useEffect hook to fetch the list of London areas from the backend server when the component
  // mounts and stores it in the areas state variable, which is then used to populate the Picker
  // component for selecting a location in the profile screen.
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
  // Defines the profile screen where users can edit their name, select their location from a
  // list of London areas fetched from the backend server, and upload a profile picture from their image library.
  // The screen includes an edit button that toggles between editing and viewing modes, allowing users to save their
  // changes to the profile.
  return (
    <View style={styles.container}>
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

      <Pressable style={styles.button} onPress={() => setIsEditing(!isEditing)}>
        <Text style={styles.buttonText}>
          {isEditing ? "Save Profile" : "Edit Profile"}
        </Text>
      </Pressable>
    </View>
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
    backgroundColor: "#6F6C43",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fffcf2",
  },

  editPhotoText: {
    fontSize: 14,
    color: "#fffcf2",
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
