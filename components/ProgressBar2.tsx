import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface ProgressBarProps {
  /** Value from 0 to 100 */
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // Ensure the progress value stays safely within 0 to 100 bounds
  const validatedProgress = Math.min(Math.max(progress, 0), 100);

  // Initialize the animated tracker value
  const animationController = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Triggers smooth width translation on progress update
    Animated.timing(animationController, {
      toValue: validatedProgress,
      duration: 350,
      useNativeDriver: false, // Must be false for width variations
    }).start();
  }, [validatedProgress]);

  // Map numerical bounds directly to percentage strings
  const barWidth = animationController.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.buttonLabel}>Progress</Text>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width: barWidth }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6F6C43", // Modern neutral text color
  },
  track: {
    height: 20,
    width: "100%",
    backgroundColor: "#E5E7EB", // Neutral light grey background track
    borderRadius: 10, // Rounded corners for a modern look
    overflow: "hidden", // Keeps the inner fill inside the rounded container boundaries
  },
  fill: {
    height: "100%",
    backgroundColor: "#ce9fa7", // Modern primary blue progress color
    borderRadius: 10, // Match the track's rounded corners
  },
  container: {
    width: "100%",
  },
});
