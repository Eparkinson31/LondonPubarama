import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Confirmation({ okay }: any) {
  return (
    <View style={styles.confirmationContainer}>
      <View style={styles.confirmationCircle}>
        <Ionicons name="checkmark" size={50} color="#FFFCF2" />
      </View>

      <Text style={styles.confirmationTitle}>Third Place Added!</Text>

      <Text style={styles.confirmationText}>
        Your Third Place has been successfully added to your collection.
      </Text>

      <Pressable style={styles.confirmationButton} onPress={okay}>
        <Text style={styles.confirmationButtonText}>Done</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  confirmationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  confirmationCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#6F6C43",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  confirmationTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6F6C43",
    textAlign: "center",
    marginBottom: 15,
  },

  confirmationText: {
    fontSize: 16,
    color: "#6F6C43",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },

  confirmationButton: {
    width: 200,
    height: 55,
    backgroundColor: "#ce9fa7",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  confirmationButtonText: {
    color: "#FFFCF2",
    fontSize: 17,
    fontWeight: "600",
  },
});
