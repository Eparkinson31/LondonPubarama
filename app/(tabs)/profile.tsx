import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [areas, setAreas] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/location")
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA:", data);
        console.log("TYPE:", typeof data);
        console.log("LENGTH:", data.length);

        setAreas(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  <Text>Areas loaded: {areas.length}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/profile.jpg")}
          style={styles.profilePic}
        />

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
                  onValueChange={(itemValue) => setLocation(itemValue)}
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

  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 20,
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
