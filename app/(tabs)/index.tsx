import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import ImageViewer from "@/components/ImageViewer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import domtoimage from "dom-to-image";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ImageSourcePropType,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { captureRef } from "react-native-view-shot";

import { GestureHandlerRootView } from "react-native-gesture-handler";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const imageRef = useRef<View>(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<
    ImageSourcePropType | undefined
  >(undefined);

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, [permissionResponse?.granted, requestPermission]);

  const useImagePressed = () => {
    setShowAppOptions(true);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const onReset = () => {
    setSelectedImage(undefined);
    setPickedEmoji(undefined);
    setShowAppOptions(false);
  };

  const onRemoveSticker = () => {
    setPickedEmoji(undefined);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
        alert("Could not save image. Please try again.");
      } finally {
        setIsSaving(false);
      }
    } else {
      try {
        const webNode = imageRef.current as unknown as Node | null;
        if (!webNode) {
          alert("Nothing to save yet.");
          setIsSaving(false);
          return;
        }

        const dataUrl = await domtoimage.toJpeg(webNode, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
        alert("Could not save image. Please try again.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  const editorReady = Boolean(selectedImage);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.orbTop} />
        <View style={styles.orbBottom} />

        <View style={styles.header}>
          <Text style={styles.eyebrow}>FIPP STUDIO</Text>
          <Text style={styles.title}>Create standout images in seconds.</Text>
          <Text style={styles.subtitle}>
            Pick a photo, add a sticker, and export your final result with a
            smooth one-screen workflow.
          </Text>
        </View>

        <View style={styles.canvasCard}>
          <View ref={imageRef} collapsable={false} style={styles.canvasFrame}>
            <ImageViewer
              imgSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
            {pickedEmoji && (
              <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
            )}
          </View>

          <View style={styles.statusRow}>
            <View style={styles.statusPill}>
              <Text style={styles.statusValue}>
                {selectedImage ? "Photo ready" : "Sample photo"}
              </Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusValue}>
                {pickedEmoji ? "Sticker added" : "No sticker"}
              </Text>
            </View>
          </View>
        </View>

        {!showAppOptions ? (
          <View style={styles.controlsCard}>
            <Pressable style={styles.primaryButton} onPress={pickImageAsync}>
              <MaterialIcons name="photo-library" size={20} color="#111317" />
              <Text style={styles.primaryButtonText}>Choose Photo</Text>
            </Pressable>

            <Pressable
              style={[
                styles.secondaryButton,
                !editorReady && styles.secondaryButtonDisabled,
              ]}
              onPress={useImagePressed}
              disabled={!editorReady}
            >
              <MaterialIcons
                name="edit"
                size={18}
                color={editorReady ? "#f5f7fb" : "#7d8795"}
              />
              <Text
                style={[
                  styles.secondaryButtonText,
                  !editorReady && styles.secondaryButtonTextDisabled,
                ]}
              >
                Open Editor
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.controlsCard}>
            <View style={styles.editorActionsRow}>
              <Pressable style={styles.actionButton} onPress={pickImageAsync}>
                <MaterialIcons name="swap-horiz" size={20} color="#dce4ef" />
                <Text style={styles.actionText}>Change</Text>
              </Pressable>

              <Pressable style={styles.actionButton} onPress={onAddSticker}>
                <MaterialIcons name="tag-faces" size={20} color="#dce4ef" />
                <Text style={styles.actionText}>Sticker</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.actionButton,
                  !pickedEmoji && styles.actionButtonDisabled,
                ]}
                onPress={onRemoveSticker}
                disabled={!pickedEmoji}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={20}
                  color={pickedEmoji ? "#dce4ef" : "#6f7886"}
                />
                <Text
                  style={[
                    styles.actionText,
                    !pickedEmoji && styles.actionTextDisabled,
                  ]}
                >
                  Remove
                </Text>
              </Pressable>
            </View>

            <View style={styles.bottomActionsRow}>
              <Pressable style={styles.ghostButton} onPress={onReset}>
                <Text style={styles.ghostButtonText}>Reset</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.primaryButton,
                  isSaving && styles.primaryDisabled,
                ]}
                onPress={onSaveImageAsync}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color="#111317" />
                ) : (
                  <MaterialIcons name="save-alt" size={20} color="#111317" />
                )}
                <Text style={styles.primaryButtonText}>
                  {isSaving ? "Saving..." : "Save Image"}
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0f1217",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 12,
  },
  orbTop: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    right: -70,
    top: -55,
    backgroundColor: "rgba(255, 211, 61, 0.12)",
  },
  orbBottom: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    left: -90,
    bottom: 40,
    backgroundColor: "rgba(86, 165, 255, 0.12)",
  },
  header: {
    marginBottom: 14,
  },
  eyebrow: {
    color: "#ffd33d",
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: "700",
    marginBottom: 6,
  },
  title: {
    color: "#f6f8fc",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
  },
  subtitle: {
    color: "#aeb8c7",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  canvasCard: {
    borderRadius: 22,
    backgroundColor: "#171c23",
    borderWidth: 1,
    borderColor: "#2b3440",
    padding: 12,
    marginBottom: 14,
    alignItems: "center",
  },
  canvasFrame: {
    borderRadius: 18,
    overflow: "hidden",
  },
  statusRow: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  statusPill: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  statusValue: {
    color: "#e3eaf3",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
  },
  controlsCard: {
    borderRadius: 18,
    backgroundColor: "#161b22",
    borderWidth: 1,
    borderColor: "#29323e",
    padding: 12,
  },
  primaryButton: {
    backgroundColor: "#ffd33d",
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#f2c31e",
  },
  primaryButtonText: {
    color: "#111317",
    fontSize: 16,
    fontWeight: "700",
  },
  primaryDisabled: {
    opacity: 0.8,
  },
  secondaryButton: {
    marginTop: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#3a4758",
    backgroundColor: "#222a35",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },
  secondaryButtonDisabled: {
    borderColor: "#343c48",
    backgroundColor: "#1b2028",
  },
  secondaryButtonText: {
    color: "#f5f7fb",
    fontSize: 15,
    fontWeight: "600",
  },
  secondaryButtonTextDisabled: {
    color: "#7d8795",
  },
  editorActionsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  actionButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#374352",
    backgroundColor: "#202732",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  actionButtonDisabled: {
    borderColor: "#313947",
    backgroundColor: "#1a2029",
  },
  actionText: {
    color: "#dce4ef",
    fontSize: 12,
    fontWeight: "600",
  },
  actionTextDisabled: {
    color: "#6f7886",
  },
  bottomActionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  ghostButton: {
    width: 90,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#455062",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#212936",
  },
  ghostButtonText: {
    color: "#d6deea",
    fontSize: 15,
    fontWeight: "600",
  },
});
