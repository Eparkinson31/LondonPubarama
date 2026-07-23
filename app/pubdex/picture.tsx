//This file defines the default screen that is shown when tabs is opened//
import domtoimage from "dom-to-image";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
    GestureHandlerRootView,
    Pressable,
} from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";
import { Link } from "expo-router";

const PlaceholderImage = require("@/assets/images/background-image.png");
// Download placeholder image//
export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );
  //store selected image//
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  //what editing options are shown//
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  // permission for media library use of user//
  const imageRef = useRef<View>(null);
  //creates reference of the image to be accessed later//
  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);
  //checks if app has permission to access media library//
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    //function opens users image library and lets them select and edit a phot and returns the image//
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };
  //makes sure user has selected image and alerts if they didn't//
  const onReset = () => {
    setShowAppOptions(false);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  // functions that controls if user reset the app view, opens emoji picker, closes emoji picker//
  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        //function starts saving the edited image by checking the platform and capturing the image view as a file on mobile devices//
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
          //saves image and alerts it was saved//
        }
      } catch (e) {
        console.log(e);
        //catches any errors that hapen during saving//
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });
        //converts the image view into a JPEG file using domtoimage so it can be downloaded//

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };
  //creates a temporary download link for the image and then triggers//
  //a download in the browser and logs errors//
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            imgSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a pub photo"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <Link href="/pubdex/confirmation" asChild>
        <Pressable style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      </Link>
    </GestureHandlerRootView>
  );
}
//renders the app and shows the image with an optional emoji sticker, displays, editing buttons or uploaded//
//depending on state, and includes an emoji picker modal for selecting stickers//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFCF2",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 75,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
    backgroundColor: "#FFFCF2",
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
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
  choosePhotoButton: {
    width: 220,
    height: 40,
    backgroundColor: "#6F6C43",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
