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
        inverted
        style={styles.containerlist}
        data={messages.slice(1).reverse()}
        renderItem={({ item }) => {
          if (item.role === "user") {
            return <Text style={styles.textuser}>{item.content}</Text>;
          }
          return <Text style={styles.textchatbot}>{item.content}</Text>;
        }}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="Ask your AI pub concierge..."
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
  containerlist: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  text: {
    color: "#6F6C43",
    fontWeight: "bold",
  },
  textchatbot: {
    maxWidth: "80%",
    color: "#6F6C43",
    fontWeight: "bold",
    borderRadius: 12,
    padding: 8,
    marginVertical: 4,
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "#6F6C43",
    backgroundColor: "#bdcfd3",
    marginLeft: 20,
  },
  textuser: {
    maxWidth: "80%",
    color: "#6F6C43",
    fontWeight: "bold",
    borderRadius: 12,
    padding: 8,
    marginVertical: 4,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#6F6C43",
    backgroundColor: "#fffcf2",
    marginRight: 20,
  },
  TextInput: {
    fontSize: 16,
    color: "#6F6C43",
    backgroundColor: "#fffcf2",
    borderWidth: 1,
    borderColor: "#6F6C43",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: "80%",
  },
});
