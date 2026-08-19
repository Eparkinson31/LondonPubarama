import BackEnd from "@/components/BackEnd";
import Confirmation from "@/components/Confirmation2";
import Features from "@/components/Features2";
import Locations from "@/components/Locations2";
import PhotoUpload from "@/components/PhotoUpload";
import { ProgressBar } from "@/components/ProgressBar2";
import ThirdPlaceName from "@/components/ThirdPlaceName";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Features {
  tags: string[];
}
{
  /* Matches Supabase Saved Third Places */
}
interface SavedThirdPlace {
  name: string;
  created_at: string;
  address: string;
  id: number;
  location: string;
  features: Features;
  image_url: string;
}

export default function Place() {
  const [savedThirdPlace, setSavedThirdPlace] = useState({} as SavedThirdPlace);
  const [currentProgress, setCurrentProgress] = useState(2);

  // Name of Page
  const [currentPage, setCurrentPage] = useState("PlaceMenu");

  const saveThirdPlace = (thirdPlace: SavedThirdPlace) => {
    // Save the third place to your database or state management
    fetch(`${BackEnd()}/createsavedthirdplace`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thirdPlace),
    })
      .then((response) => response.json())
      .then((data) => {
        setSavedThirdPlace(data);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("Saving third place:", thirdPlace);
  };

  return (
    <View style={styles.container}>
      {/* Tracker */}
      {currentPage !== "PlaceMenu" && (
        <ProgressBar progress={currentProgress} />
      )}

      {/* Tracker */}
      {currentPage === "PlaceMenu" && (
        <View style={styles.placeMenuButtons}>
          <Text style={styles.placeMenuTitle}>
            Add a Third Place You've Visited
          </Text>

          <Pressable
            style={styles.placeMenuButton}
            onPress={() => setCurrentPage("thirdPlaceName")}
          >
            <Text style={styles.createButtonText}>Create new Third Place</Text>
          </Pressable>

          <Pressable
            style={styles.editPlaceButton}
            onPress={() => setCurrentPage("thirdPlaceName")}
          >
            <Text style={styles.createButtonText}>Edit Third Place</Text>
          </Pressable>
        </View>
      )}

      {/* Asking name of third place */}
      {currentPage === "thirdPlaceName" && (
        <ThirdPlaceName
          setCurrentProgress={setCurrentProgress}
          styles={styles}
          saveThirdPlaceName={(name: string) => {
            setSavedThirdPlace({ ...savedThirdPlace, name });
            setCurrentPage("locations");
          }}
          label="Add Third Place Name"
          cancel={() => {
            setCurrentProgress(2);
            setCurrentPage("PlaceMenu");
          }}
        />
      )}

      {/* Asking for location information */}
      {currentPage === "locations" && (
        <Locations
          setCurrentProgress={setCurrentProgress}
          styles={styles}
          saveLocationName={(location: string) => {
            setSavedThirdPlace({ ...savedThirdPlace, location: location });
            setCurrentPage("features");
          }}
          label="Add Third Place Location"
          cancel={() => {
            setCurrentProgress(2);
            setCurrentPage("PlaceMenu");
          }}
        />
      )}

      {/* Asking for features */}
      {currentPage === "features" && (
        <Features
          setCurrentProgress={setCurrentProgress}
          styles={styles}
          saveFeatureSelection={(features: string[]) => {
            setSavedThirdPlace({
              ...savedThirdPlace,
              features: { tags: features },
            });
            setCurrentPage("picture");
          }}
          label="Add features about this third place"
          cancel={() => {
            setCurrentProgress(2);
            setCurrentPage("PlaceMenu");
          }}
        />
      )}

      {/* Asking for a picture */}
      {currentPage === "picture" && (
        <PhotoUpload
          setImageFullPath={(image_url: string, uri: string) => {
            const thirdplace = { ...savedThirdPlace, image_url: image_url };
            setSavedThirdPlace(thirdplace);
            saveThirdPlace(thirdplace);
            setCurrentPage("confirmation");
            setCurrentProgress(100);
          }}
          setCurrentProgress={setCurrentProgress}
          cancel={() => {
            setCurrentProgress(2);
            setCurrentPage("PlaceMenu");
          }}
        />
      )}

      {/* Confirmation */}
      {currentPage === "confirmation" && (
        <Confirmation
          styles={styles}
          okay={() => {
            setCurrentProgress(2);
            setCurrentPage("PlaceMenu");
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6F6C43",
    width: 30,
    height: 20,
    borderRadius: 25,
    backgroundColor: "#bdcfd3",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fffcf2",
    paddingTop: 40,
    paddingHorizontal: 20,
  },

  tracker: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 40,
  },

  step: {
    width: 70,
    alignItems: "center",
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#bdcfd3",
    justifyContent: "center",
    alignItems: "center",
  },

  number: {
    color: "#fffcf2",
    fontSize: 18,
    fontWeight: "bold",
  },

  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#bdcfd3",
    marginTop: 25,
    marginHorizontal: 8,
  },

  label: {
    marginTop: 10,
    textAlign: "center",
    color: "#6F6C43",
    fontWeight: "bold",
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6F6C43",
    marginBottom: 20,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#6F6C43",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#bdcfd3",
    paddingHorizontal: 16,
    marginBottom: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#6F6C43",
    paddingVertical: 14,
  },
  nextButton: {
    width: 90,
    height: 40,
    backgroundColor: "#6F6C43",
    borderWidth: 1,
    borderColor: "#6F6C43",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  nextButtonText: {
    color: "#FFFCF2",
    fontSize: 16,
    fontWeight: "600",
  },
  okayButton: {
    width: 90,
    height: 40,
    backgroundColor: "#6F6C43",
    borderWidth: 1,
    borderColor: "#6F6C43",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  okayButtonText: {
    color: "#fffcf2",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    width: 90,
    height: 40,
    backgroundColor: "#b03924",
    borderWidth: 1,
    borderColor: "#b03924",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 40,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFFCF2",
    fontSize: 16,
    fontWeight: "600",
  },
  createButton: {
    width: 300,
    height: 40,
    backgroundColor: "#6F6C43",
    borderWidth: 1,
    borderColor: "#6F6C43",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  createButtonText: {
    color: "#FFFCF2",
    fontSize: 16,
    fontWeight: "600",
  },
  pickerContainer: {
    backgroundColor: "#fffcf2",
    borderWidth: 2,
    borderColor: "#6F6C43",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
  },
  placeMenuButtons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -40,
  },

  placeMenuButton: {
    width: 300,
    height: 60,
    backgroundColor: "#6F6C43",
    borderWidth: 1,
    borderColor: "#6F6C43",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  placeMenuTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6F6C43",
    marginBottom: 5,
    textAlign: "center",
    transform: [{ translateY: -50 }],
  },

  editPlaceButton: {
    width: 300,
    height: 60,
    backgroundColor: "#ce9fa7",
    borderWidth: 1,
    borderColor: "#ce9fa7",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
});
