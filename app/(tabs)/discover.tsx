import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Card {
  id: string;
  title: string;
}

export default function DiscoverScreen() {
  const [recommendation, setRecommendation] = useState(
    "fetching recommendation...",
  );

  useEffect(() => {
    fetch("http://127.0.0.1:5000/suggestpubs/6")
      .then((response) => response.json())
      .then((data) => {
        setRecommendation(data.ai_response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Discover London Pubs</Text>
      <Text style={styles.heading}>{recommendation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffcf2",
    paddingTop: 50,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 15,
    color: "#6F6C43",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6F6C43",
  },

  cardTonight: {
    backgroundColor: "#F7F3E9",
    borderWidth: 5,
    borderColor: "#bdcfd3",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },

  cardGarden: {
    backgroundColor: "#F7F3E9",
    borderWidth: 5,
    borderColor: "#bdcfd3",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#F7F3E9",
    borderWidth: 5,
    borderColor: "#bdcfd3",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
});
