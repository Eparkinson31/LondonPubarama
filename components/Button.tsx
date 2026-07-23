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
        style={[styles.buttonContainer]}
        // Border added to the button container to make it look like a sticker and border radius added to make the corners rounded//
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#6F6C43" }]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#fffcf2"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#fffcf2" }]}>
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
    width: 220,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 12,
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
    color: "#6F6C43",
    fontSize: 16,
  },
});
// Defines the styling for the button component, including dimensions, colors, and layout for the button and its contents//
