// Defines the screen/content for the about tab in app//
import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>
      <Text style={styles.text}>
        Sticker Smash is an app that lets you add emoji
      </Text>
      <Text style={styles.text}>stickers to your photos and save them!</Text>
      <Text style={styles.text}>Enjoy!</Text>
      <Text style={styles.text}>Created by Elizabeth Parkinson</Text>
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
});

//Defines the styling for the about screen centering the content on the screen and setting background text and color//
