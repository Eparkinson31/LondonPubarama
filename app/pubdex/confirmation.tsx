import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thanks for adding a pub!</Text>
      <Text style={styles.text}>stickers to your photos and save them!</Text>
      <Text style={styles.text}>Enjoy!</Text>
      <Text style={styles.text}>Created by Elizabeth Parkinson</Text>

      <Link href="/pubdex2.0" asChild>
        <Pressable style={styles.okayButton}>
          <Text style={styles.okayButtonText}>Okay</Text>
        </Pressable>
      </Link>
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
    color: "#e2409f",
    fontWeight: "bold",
  },
  okayButton: {
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

  okayButtonText: {
    color: "#6F6C43",
    fontSize: 16,
    fontWeight: "600",
  },
});

//Defines the styling for the about screen centering the content on the screen and setting background text and color//
