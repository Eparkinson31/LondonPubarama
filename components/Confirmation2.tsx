import { Pressable, Text, View } from "react-native";

export default function Confirmation({
  styles,
  okay,
}: {
  styles: any;
  okay: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thanks for adding a third place!</Text>
      <Text style={styles.text}>Enjoy!</Text>

      <Pressable style={styles.okayButton} onPress={okay}>
        <Text style={styles.okayButtonText}>Okay</Text>
      </Pressable>
    </View>
  );
}
