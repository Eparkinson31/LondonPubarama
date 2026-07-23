import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
    fetch("http://127.0.0.1:5000/structuredsuggestpubs/6")
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.suggestions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Discover London Pubs</Text>
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
  location: {
    fontSize: 16,
    color: "#ce9fa7",
  },
  summary: {
    fontSize: 14,
    color: "#6F6C43",
  },
});
