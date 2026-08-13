import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";

export default function ConfirmationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.circle1}>
        <Ionicons name="fast-food-outline" size={28} color="#fffcf2" />
      </View>

      <View style={styles.circle2}>
        <Ionicons name="fast-food-outline" size={28} color="#fffcf2" />
      </View>

      <View style={styles.circle3}>
        <Ionicons name="fast-food-outline" size={28} color="#fffcf2" />
      </View>

      <View style={styles.circle4}>
        <Ionicons name="fast-food-outline" size={28} color="#fffcf2" />
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
  circle1: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ce9fa7",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  circle2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#bdcfd3",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  circle3: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6F6C43",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  circle4: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#b03924",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
