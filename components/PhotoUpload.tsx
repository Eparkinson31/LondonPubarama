import { useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";

import BackEnd from "@/components/BackEnd";
import * as ImagePicker from "expo-image-picker";

interface Props {
  setImageFullPath: (path: string) => void;
  cancel: () => void;
}

export default function PhotoUpload({ setImageFullPath, cancel }: Props) {
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

    setImageFullPath(data.fullPath);
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

      <Button title="Choose Photo" onPress={pickPhoto} />

      {asset && (
        <Pressable style={styles.next} onPress={uploadPhoto}>
          <Text style={styles.text}>Next</Text>
        </Pressable>
      )}
      <Pressable style={styles.next} onPress={cancel}>
        <Text style={styles.text}>Cancel</Text>
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

  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },

  next: {
    marginTop: 20,
    backgroundColor: "#6F6C43",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
  },

  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
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
});
