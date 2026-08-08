import BackEnd from "@/components/BackEnd";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

interface Suggestion {
  id: number;
  name: string;
  location: string;
  summary: string;
}

export default function DiscoverScreen() {
  const [suggestions, setSuggestions] = useState<Suggestion[] | string>(
    "fetching recommendation...",
  );

  useEffect(() => {
    fetch(`${BackEnd()}/structuredsuggestthirdplaces/6`)
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.suggestions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {typeof suggestions === "string" ? (
        <Text style={styles.heading}>{suggestions}</Text>
      ) : (
        suggestions.map((suggestion) => (
          <View key={suggestion.id} style={styles.card}>
            <Text style={styles.title}>{suggestion.name}</Text>
            <Text style={styles.location}>{suggestion.location}</Text>
            <Text style={styles.summary}>{suggestion.summary}</Text>
          </View>
        ))
      )}

      <MapView style={styles.map} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "90%",
    height: "90%",
    margin: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fffcf2",
    paddingTop: 5,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 15,
    color: "#6F6C43",
  },

  title: {
    fontSize: 18,
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
    borderWidth: 4,
    borderColor: "#bdcfd3",
    padding: 10,
    borderRadius: 20,
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: "#ce9fa7",
  },
  summary: {
    fontSize: 14,
    color: "#6F6C43",
  },
});
