import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  theme?: "primary";
  onPress?: () => void;
};
// Defines a reusable button component that can be used in the app with different themes and labels, and includes an optional onPress function for handling button presses//
export default function Button({ label, theme, onPress }: Props) {
  if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 2, borderColor: "#e2409f", borderRadius: 20 },
        ]}
        // Border added to the button container to make it look like a sticker and border radius added to make the corners rounded//
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#edf1f9" }]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#e2409f"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#e2409f" }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }
  // If the theme is primary, the button will have a picture icon and a pink color scheme, otherwise it will be a simple button with default styling//
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => alert("Hey! You pressed a button.")}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}
// Defines the default button styling and behavior when the theme is not primary, which will show an alert when pressed//
const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 10,
  },
  buttonLabel: {
    color: "#e2409f",
    fontSize: 16,
  },
});
// Defines the styling for the button component, including dimensions, colors, and layout for the button and its contents//
