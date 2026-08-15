import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import BackEnd from "@/components/BackEnd";
import * as ImagePicker from "expo-image-picker";

interface Props {
  setImageFullPath: (path: string, uri: string) => void;
  cancel: () => void;
  setCurrentProgress: (progress: number) => void;
}

export default function PhotoUpload({
  setImageFullPath,
  cancel,
  setCurrentProgress,
}: Props) {
  const [asset, setAsset] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setAsset(result.assets[0]);
    }
  };

  const uploadPhoto = async () => {
    if (!asset) return;

    const formData = new FormData();

    formData.append("file", {
      uri: asset.uri,
      name: asset.fileName ?? `photo.${asset.uri.split(".").pop()}`,
      type: asset.mimeType ?? "image/jpeg",
    } as any);

    const response = await fetch(`${BackEnd()}/thirdplacephotoupload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setCurrentProgress(99);
    setImageFullPath(data.fullPath, asset.uri);
  };

  return (
    <View style={styles.container}>
      {/* Photo Preview */}
      <View style={styles.previewContainer}>
        {asset ? (
          <Image source={{ uri: asset.uri }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No photo selected</Text>
          </View>
        )}
      </View>
      {asset && (
        <Pressable style={styles.savebutton} onPress={uploadPhoto}>
          <Text style={styles.savetext}>Save</Text>
        </Pressable>
      )}
      <Pressable style={styles.chooseButton} onPress={pickPhoto}>
        <Text style={styles.chooseButtonText}>Choose Photo</Text>
      </Pressable>

      <Pressable style={styles.cancelButton} onPress={cancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  savebutton: {
    marginTop: 20,
    width: 90,
    height: 40,
    backgroundColor: "#6F6C43",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  savetext: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  previewContainer: {
    width: 300,
    height: 300,
    marginBottom: 30,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },

  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    color: "#888",
    fontSize: 16,
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
    marginRight: 10,
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
  chooseButton: {
    width: 140,
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

  chooseButtonText: {
    color: "#FFFCF2",
    fontSize: 16,
    fontWeight: "600",
  },
});
