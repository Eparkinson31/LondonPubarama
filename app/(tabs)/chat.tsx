// Defines the screen/content for the about tab in app//
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function AboutScreen() {
  const [prompt, setPrompt] = useState("");

  const getchat = async (newpromptai: string) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/ai_response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newpromptai),
      });
      return await response.text();
    } catch (error) {
      console.error(error);
      return "Error fetching AI response";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>
      <Text style={styles.text}>
        Sticker Smash is an app that lets you add emoji
      </Text>
      <Text style={styles.text}>stickers to your photos and save them!</Text>
      <Text style={styles.text}>Enjoy!</Text>
      <Text style={styles.text}>Created by Elizabeth Parkinson</Text>
      <TextInput
        style={styles.nameInput}
        placeholder="Enter question..."
        placeholderTextColor="#6F6C43"
        value={prompt}
        onChangeText={setPrompt}
        returnKeyType="done" // Customises the keyboard button label
        onSubmitEditing={(e) => getchat(e.nativeEvent.text)}
      />
    </View>
  );
}
//Defines the about screen//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffcf2",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#b03924",
    fontWeight: "bold",
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
});
