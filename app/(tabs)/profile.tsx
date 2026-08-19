import BackEnd from "@/components/BackEnd";
import Features from "@/components/Features2";
import Locations from "@/components/Locations2";
import PhotoUpload from "@/components/PhotoUpload";
import { ProgressBar } from "@/components/ProgressBar2";
import ThirdPlaceName from "@/components/ThirdPlaceName";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Polygon } from "react-native-svg";

interface Location {
  city: string;
  created_at: string;
  id: number;
  location: string;
  postal_code: string;
}

interface Profile {
  created_at: string;
  id: number;
  name: string;
  location: string;
  friends: string[];
  features: string[];
  image_url: string;
}

interface ProfileUpdate {
  id: number;
  profile: Profile;
}

export default function ProfileScreen() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentProgress, setCurrentProgress] = useState(2);
  const [uri, setUri] = useState("");

  const [currentPage, setCurrentPage] = useState("profileMenu");

  const [profile, setProfile] = useState<Profile>({
    name: "",
    location: "",
    created_at: "",
    id: 0,
    friends: [],
    features: [],
    image_url: "",
  });

  const OldFeatures = [
    "Traditional Pub",
    "Craft Beer",
    "Real Ale",
    "IPA",
    "Lager",
    "Cider",
    "Alcohol Free Beer",
    "Guinness",
    "Pimms",
    "Aperol Spritz",
    "Sunday Roast",
    "Burgers",
    "Vegan Options",
    "Vegetarian Options",
    "Pub Quiz",
    "Live Music",
    "Sports Screening",
    "Fish and Chips",
    "Open Mic Night",
    "DJ Nights",
    "Pool Table",
    "Darts",
    "Board Games",
    "Fireplace",
    "Karaoke",
    "Dog Friendly",
    "Family Friendly",
    "Historic Pub",
    "Riverside",
    "Beer Garden",
    "Rooftop",
    "Cosy",
    "Quiet",
    "Lively",
    "Late Night",
    "Outdoor Seating",
    "Wheelchair Accessible",
  ];

  const createProfile = (updatedProfile: Profile) => {
    fetch(`${BackEnd()}/createprofile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateProfile = (updatedProfile: Profile) => {
    const profileupdate: ProfileUpdate = {
      id: updatedProfile.id,
      profile: updatedProfile,
    };

    fetch(`${BackEnd()}/updateprofile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileupdate),
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);

    if (updatedProfile.id === 0) {
      createProfile(updatedProfile);
    } else {
      updateProfile(updatedProfile);
    }
  };

  const setProfileName = (name: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      name: name,
    }));
  };

  const setProfileLocation = (location: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      location: location,
    }));
  };

  useEffect(() => {
    fetch(`${BackEnd()}/alllocations`)
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* Progress bar */}
      {currentPage !== "profileMenu" && currentPage !== "confirmation" && (
        <ProgressBar progress={currentProgress} />
      )}

      {/* Profile menu */}
      {currentPage === "profileMenu" && (
        <View style={styles.placeMenuButtons}>
          <Pressable
            style={styles.placeMenuButton}
            onPress={() => setCurrentPage("profileName")}
          >
            <Text style={styles.createButtonText}>Create New Profile</Text>
          </Pressable>

          <Pressable
            style={styles.editPlaceButton}
            onPress={() => setCurrentPage("profileName")}
          >
            <Text style={styles.createButtonText}>Edit Profile</Text>
          </Pressable>
        </View>
      )}

      {/* Profile name */}
      {currentPage === "profileName" && (
        <ThirdPlaceName
          setCurrentProgress={setCurrentProgress}
          styles={styles}
          saveThirdPlaceName={(name: string) => {
            setProfileName(name);
            setCurrentPage("locations");
          }}
          cancel={() => {
            setCurrentProgress(2);
            setCurrentPage("profileMenu");
          }}
          label="Add Profile Name"
        />
      )}

      {/* Profile location */}
      {currentPage === "locations" && (
        <Locations
          setCurrentProgress={setCurrentProgress}
          styles={styles}
          saveLocationName={(location: string) => {
            setProfileLocation(location);
            setCurrentPage("features");
          }}
          label="Add Profile Location"
          cancel={() => {
            setCurrentProgress(2);
            setCurrentPage("profileMenu");
          }}
        />
      )}

      {/* Profile features */}
      {currentPage === "features" && (
        <Features
          setCurrentProgress={setCurrentProgress}
          styles={styles}
          saveFeatureSelection={(features: string[]) => {
            setProfile((prevProfile) => ({
              ...prevProfile,
              features: features,
            }));

            setCurrentPage("picture");
          }}
          label="Press on features that you enjoy about third places"
          cancel={() => {
            setCurrentProgress(2);
            setCurrentPage("profileMenu");
          }}
        />
      )}

      {/* Profile picture */}
      {currentPage === "picture" && (
        <PhotoUpload
          setImageFullPath={(image_url: string, uri: string) => {
            const newprofile = {
              ...profile,
              image_url: image_url,
            };

            setProfile(newprofile);
            saveProfile(newprofile);

            setUri(uri);
            setCurrentPage("confirmation");
            setCurrentProgress(100);
          }}
          setCurrentProgress={setCurrentProgress}
          cancel={() => {
            setCurrentProgress(2);
            setCurrentPage("profileMenu");
          }}
        />
      )}

      {/* Profile page */}
      {currentPage === "confirmation" && (
        <ScrollView
          style={styles.profilePage}
          contentContainerStyle={styles.profileContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile header */}
          <View style={styles.profileHeader}>
            {/* Profile picture */}
            <View style={styles.profilePicContainer}>
              <Image
                source={
                  uri
                    ? { uri: uri }
                    : require("../../assets/profilepicillustration.jpg")
                }
                style={styles.profilePic}
              />
            </View>

            {/* Name and statistics */}
            <View style={styles.profileInfo}>
              <Text style={styles.name}>
                {profile.name || "No name entered"}
              </Text>

              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>5</Text>
                  <Text style={styles.statLabel}>Third Places</Text>
                </View>

                <View style={styles.stat}>
                  <Text style={styles.statNumber}>1</Text>
                  <Text style={styles.statLabel}>Badges</Text>
                </View>

                <View style={styles.stat}>
                  <Text style={styles.statNumber}>7</Text>
                  <Text style={styles.statLabel}>Friends</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Location */}
          <Text style={styles.location}>
            {profile.location || "No location selected"}
          </Text>

          {/* Edit profile */}
          <Pressable
            style={styles.editProfileButton}
            onPress={() => setCurrentPage("profileName")}
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </Pressable>

          {/* Preferences */}
          <Text style={styles.preferencesTitle}>My Preferences</Text>

          <View style={styles.chipsContainer}>
            {profile.features.length > 0 ? (
              profile.features.map((feature) => (
                <View key={feature} style={styles.selectedFeatureChip}>
                  <Text style={styles.selectedFeatureText}>{feature}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.location}>No preferences selected</Text>
            )}
          </View>

          {/* Badge star */}
          <Text style={styles.preferencesTitle}>My Badges</Text>

          <View style={styles.star}>
            <Svg width={80} height={80} viewBox="0 0 100 100">
              <Polygon
                points="50,5 61,35 95,35 68,55 78,90 50,70 22,90 32,55 5,35 39,35"
                fill="#ce9fa7"
              />
            </Svg>

            <Ionicons
              name="pizza-outline"
              size={28}
              color="#fffcf2"
              style={styles.starIcon}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  /* Main screen */

  container: {
    flex: 1,
    backgroundColor: "#fffcf2",
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  /* Profile menu */

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
    marginBottom: 15,
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

  createButtonText: {
    color: "#FFFCF2",
    fontSize: 16,
    fontWeight: "600",
  },

  /* Profile page */

  profilePage: {
    flex: 1,
    paddingTop: 20,
  },

  profileContent: {
    paddingBottom: 40,
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  profilePicContainer: {
    marginRight: 25,
  },

  profilePic: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  profileInfo: {
    flex: 1,
  },

  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6F6C43",
    marginBottom: 15,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  stat: {
    alignItems: "center",
    marginRight: 15,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6F6C43",
  },

  statLabel: {
    fontSize: 13,
    color: "#6F6C43",
  },

  location: {
    fontSize: 16,
    color: "#6F6C43",
    marginTop: 5,
  },

  /* Edit profile */

  editProfileButton: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#6F6C43",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 25,
  },

  editProfileButtonText: {
    color: "#6F6C43",
    fontSize: 15,
    fontWeight: "600",
  },

  /* Preferences */

  preferencesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6F6C43",
    marginBottom: 10,
  },

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  selectedFeatureChip: {
    backgroundColor: "#6F6C43",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },

  selectedFeatureText: {
    color: "#fffcf2",
  },

  /* Star */

  star: {
    width: 80,
    height: 80,
    marginTop: 1,
    alignSelf: "flex-start",
    position: "relative",
  },

  starIcon: {
    position: "absolute",
    top: 26,
    left: 26,
  },

  /* Form styles */

  pickerContainer: {
    backgroundColor: "#fffcf2",
    borderWidth: 2,
    borderColor: "#6F6C43",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#6F6C43",
    paddingVertical: 14,
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
});
