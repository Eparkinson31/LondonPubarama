import { StyleSheet, Text, View } from "react-native";

export default function FeedTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is your Main Tab Feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: { fontSize: 18 },
});
