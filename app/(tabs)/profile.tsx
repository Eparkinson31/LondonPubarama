import BackEnd from "@/components/BackEnd";
import Features from "@/components/Features2";
import Locations from "@/components/Locations2";
import PhotoUpload from "@/components/PhotoUpload";
import { ProgressBar } from "@/components/ProgressBar2";
import ThirdPlaceName from "@/components/ThirdPlaceName";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
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
  //const [name, setName] = useState("");
  //const [location, setLocation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [currentProgress, setCurrentProgress] = useState(2);
  const [uri, setUri] = useState("");

  // Name of Page
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

  // List of preferences for users to select from when editing their profile//
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveImage = async (image: string): Promise<string> => {
    const formData = new FormData();
    var url = "https://example.com/placeholder-image.jpg";
    formData.append("savename", "profilepicture.jpg");
    formData.append("mimetype", "image/jpeg");
    formData.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "profilepicture.jpg",
    } as any);

    return fetch(`${BackEnd()}/profileuploadphoto`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        url = data.fullPath;
        return data.fullPath;
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        return url;
      });
  };

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
        // Handle the response data if needed
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
        // Handle the response data if needed
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
    setIsEditing(false);
  };

  const editProfile = () => {
    setIsEditing(true);
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

  const toggleFeatures = (feature: string) => {
    if (profile.features.includes(feature)) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        features: prevProfile.features.filter((item) => item !== feature),
      }));
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        features: [...prevProfile.features, feature],
      }));
    }
  };

  // UseEffect hook fetches the list of London areas from the backend API when the component mounts and stores
  // it in the areas state variable, which is then used to populate the location picker in the profile editing form.
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
      {/* Tracker */}
      {currentPage !== "profileMenu" && currentPage !== "confirmation" && (
        <ProgressBar progress={currentProgress} />
      )}

      {/* Tracker */}
      {currentPage === "profileMenu" && (
        <View style={styles.container}>
          <Pressable
            style={[styles.createButton]}
            onPress={() => setCurrentPage("profileName")}
          >
            <Text style={styles.createButtonText}>Create New Profile</Text>
          </Pressable>
          <Pressable
            style={[styles.createButton]}
            onPress={() => setCurrentPage("profileName")}
          >
            <Text style={styles.createButtonText}>Edit Profile</Text>
          </Pressable>
        </View>
      )}

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

      {/* Asking for features */}
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

      {/* Asking for a picture */}
      {currentPage === "picture" && (
        <PhotoUpload
          setImageFullPath={(image_url: string, uri: string) => {
            const newprofile = { ...profile, image_url: image_url };
            setProfile(newprofile);
            saveProfile(newprofile);
            setCurrentPage("confirmation");
            setCurrentProgress(100);
            setUri(uri);
          }}
          setCurrentProgress={setCurrentProgress}
          cancel={() => {
            setCurrentProgress(2);
            setCurrentPage("profileMenu");
          }}
        />
      )}

      {/* Confirmation */}
      {currentPage === "confirmation" && (
        <View>
          <Text style={styles.name}>{profile.name || "No name entered"}</Text>

          <Text style={styles.location}>
            {profile.location || "No location selected"}
          </Text>
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
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffcf2",
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  profilePicContainer: {
    position: "relative",
    marginRight: 20,
  },

  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  editPhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#bdcfd3",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fffcf2",
  },

  editPhotoText: {
    fontSize: 18,
    color: "#fffcf2",
    fontWeight: "bold",
  },

  infoContainer: {
    flex: 1,
  },

  nameInput: {
    fontSize: 30,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#6F6C43",
    paddingBottom: 5,
    marginBottom: 10,
    color: "#6F6C43",
  },

  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6F6C43",
  },

  location: {
    fontSize: 18,
    color: "#6F6C43",
    marginTop: 5,
  },

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
    marginBottom: 10,
    marginTop: 0,
  },

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  preferenceChip: {
    borderWidth: 1,
    borderColor: "#6F6C43",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },

  selectedFeatureChip: {
    backgroundColor: "#6F6C43",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },

  preferenceText: {
    color: "#6F6C43",
  },

  selectedFeatureText: {
    color: "#fffcf2",
  },

  editprofilebutton: {
    marginTop: 10,
    backgroundColor: "#bdcfd3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  buttonText: {
    color: "#fffcf2",
    fontWeight: "bold",
    fontSize: 16,
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
});
