import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

interface Card {
  id: string;
  title: string;
}

export default function DiscoverScreen() {
  const cards: Card[] = [
    { id: "1", title: "Pub Gardens" },
    { id: "2", title: "Pub Quiz happening tonight" },
    { id: "3", title: "Traditional Pubs" },
    { id: "4", title: "Dog Friendly" },
    { id: "5", title: "Riverside Pubs" },
  ];

  const renderCard = ({ item }: { item: Card }) => {
    if (item.id === "1") {
      return (
        <Pressable style={styles.cardGarden}>
          <Text style={styles.title}>{item.title}</Text>
        </Pressable>
      );
    }

    if (item.id === "2") {
      return (
        <Pressable style={styles.cardTonight}>
          <Text style={styles.title}>{item.title}</Text>
        </Pressable>
      );
    }

    return (
      <Pressable style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Discover London Pubs</Text>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
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
