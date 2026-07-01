/*"use dom";*/

import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

{
  /*interface MapProps {
  latitude: number;
  longitude: number;
  onMarkerClick: () => void; // Will bridge over asynchronously to native code
}*/
}

export default function SearchScreen() {
  const [search, setSearch] = useState("");

  const pubs = [""];

  const filteredPubs = pubs.filter((pub) =>
    pub.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        placeholder="Search Pubs in London"
        placeholderTextColor="#6F6C43"
      />

      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        placeholderTextColor="#6F6C43"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredPubs}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.result}>{item}</Text>}
      />

      {/*<div style={{ width: "100vw", height: "100vh" }}>
        <Map
          initialViewState={{ latitude: 51.5074, longitude: -0.1278, zoom: 12 }}
          mapStyle="https://maplibre.org"
        ></Map>
      </div>
      
   <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.5074,
          longitude: -0.1278,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fffcf2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#6F6C43",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fffcf2",
  },
  result: {
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#6F6C43",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
