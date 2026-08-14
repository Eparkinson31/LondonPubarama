// Defines the screen/content for the about tab in app//
import BackEnd from "@/components/BackEnd";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Markdown from "react-native-markdown-display";

interface Message {
  role: string;
  content: string;
}

export default function AboutScreen() {
  const [prompt, setPrompt] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const getChat = async (newMessages: Message[]) => {
    try {
      const response = await fetch(`${BackEnd()}/chat`, {
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
        content: `You are a careful local assistant. 
          You are helping a user answer questions.
          You can use the information in the wiki to help answer questions.
          You are only querying the wiki for information. You are not making up information.
          You are not maintaining the wiki.
          If a user is mentioned with an '@' in the chat then read their profile. 
          Keep in mind their preferences when recommending a pub. Never invent file contents.`,
      };

      const updatedMessages = [...messages, firstMessage, newMessage];
      setThinking(true);
      getChat(updatedMessages).finally(() => setThinking(false));
    } else {
      const updatedMessages = [...messages, newMessage];
      setThinking(true);
      getChat(updatedMessages).finally(() => setThinking(false));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 128 : 0}
    >
      <FlatList
        inverted
        style={styles.containerlist}
        data={messages.slice(1).reverse()}
        renderItem={({ item }) => {
          if (item.role === "user") {
            return <Text style={styles.textuser}>{item.content}</Text>;
          }
          return (
            <View style={styles.textchatbot}>
              <Markdown style={{ body: { color: "#6F6C43" } }}>
                {item.content}
              </Markdown>
            </View>
          );
        }}
      />

      {thinking && (
        <View style={styles.thinkingContainer}>
          <Text style={{ color: "#6F6C43" }}>Thinking...</Text>
        </View>
      )}

      {!thinking && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ask your Third Place assistant..."
            placeholderTextColor="#6F6C43"
            value={prompt}
            onChangeText={setPrompt}
            returnKeyType="done"
            onSubmitEditing={(e) => addPrompt(e.nativeEvent.text)}
          />

          <Pressable
            style={styles.sendButton}
            onPress={() => addPrompt(prompt)}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
        </View>
      )}
    </KeyboardAvoidingView>
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
    color: "#ce9fa7",
    fontWeight: "bold",
  },
  textchatbot: {
    maxWidth: "80%",
    color: "#6F6C43",
    fontWeight: "bold",
    borderRadius: 45,
    padding: 20,
    marginVertical: 4,
    alignSelf: "flex-start",
    backgroundColor: "#F7F3E9",
    borderWidth: 2,
    borderColor: "#bdcfd3",
    marginLeft: 20,
  },
  textuser: {
    maxWidth: "80%",
    color: "#6F6C43",
    fontWeight: "bold",
    borderRadius: 45,
    padding: 20,
    marginVertical: 4,
    alignSelf: "flex-end",
    backgroundColor: "#bdcfd3",
    borderWidth: 2,
    borderColor: "#bdcfd3",
    marginLeft: 20,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    gap: 8,
  },

  sendButton: {
    backgroundColor: "#6F6C43",
    borderRadius: 20,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },

  sendButtonText: {
    color: "#fffcf2",
    fontWeight: "bold",
    fontSize: 16,
  },
  thinkingContainer: {
    maxWidth: "80%",
    color: "#ce9fa7",
    fontWeight: "bold",
    borderRadius: 45,
    padding: 20,
    marginVertical: 4,
    alignSelf: "flex-start",
    backgroundColor: "#F7F3E9",
    borderWidth: 2,
    borderColor: "#ce9fa7",
    marginLeft: 20,
  },
});
