import { StyleSheet, Text, View } from "react-native";

export default function ConfirmationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Badges Tracker</Text>
      <Text style={styles.text}>
        Collect badges as you explore London pubs!
      </Text>
      <View style={styles.circlesContainer}>
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>
    </View>
  );
}
//Defines the confirmation screen//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffcf2",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#6F6C43",
    fontWeight: "bold",
  },
  circlesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ce9fa7",
    marginHorizontal: 10,
  },
});
