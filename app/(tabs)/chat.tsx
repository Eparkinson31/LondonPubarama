// Defines the screen/content for the about tab in app//
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface Message {
  role: string;
  content: string;
}

export default function AboutScreen() {
  const [prompt, setPrompt] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const getChat = async (newMessages: Message[]) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessages),
      });
      const messagesResponse = (await response.json()) as Message[];
      setMessages(messagesResponse);
      setPrompt("");
      return "okay";
    } catch (error) {
      console.error(error);
      return "Error fetching AI response";
    }
  };

  const addPrompt = async (newPrompt: string) => {
    if (newPrompt.trim().length === 0) return;
    const newMessage: Message = {
      role: "user",
      content: newPrompt,
    };
    if (messages.length === 0) {
      const firstMessage: Message = {
        role: "system",
        content:
          "You are a careful local assistant.,Never invent file contents.",
      };

      const updatedMessages = [...messages, firstMessage, newMessage];
      getChat(updatedMessages);
    } else {
      const updatedMessages = [...messages, newMessage];
      getChat(updatedMessages);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages.slice(1)}
        renderItem={({ item }) => (
          <Text style={styles.text}>{item.content}</Text>
        )}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="Enter question..."
        placeholderTextColor="#6F6C43"
        value={prompt}
        onChangeText={setPrompt}
        returnKeyType="done" // Customises the keyboard button label
        onSubmitEditing={(e) => addPrompt(e.nativeEvent.text)}
      />
    </View>
  );
}
//Defines the about screen//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffcf2",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#b03924",
    fontWeight: "bold",
  },
  TextInput: {
    fontSize: 18,
    color: "#6F6C43",
    backgroundColor: "#fffcf2",
    borderWidth: 1,
    borderColor: "#6F6C43",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 250,
  },
});
