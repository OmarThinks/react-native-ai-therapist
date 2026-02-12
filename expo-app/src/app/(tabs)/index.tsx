import ChatMessageDisplay from "@/components/ChatMessageDisplay";
import { useColors } from "@/hooks/colors";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { DefaultChatTransport } from "ai";
import { fetch as expoFetch } from "expo/fetch";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function App() {
  const [input, setInput] = useState("");
  const {
    messages: _messages,
    error,
    sendMessage,
  } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: "http://10.0.2.2:3000/api/chat",
    }),
    onError: (error) => console.error(error, "ERROR"),
    messages: [
      {
        parts: [
          {
            type: "text",
            text: "Yo",
          },
        ],
        id: "tHPAGNPsjSDJXrPd",
        role: "user",
      },
      {
        id: "q6vnyGxDxF9JBq04",
        role: "assistant",
        parts: [
          {
            type: "step-start",
          },
          {
            type: "text",
            text: "Hey there. Thanks for reaching out.\n\nI'm here to listen without judgment whenever you're ready to share what's on your mind. How can I help you today?",
            state: "done",
          },
        ],
      },
    ],
  });

  const messages: UIMessage[] = _messages;

  const colors = useColors();

  if (error) return <Text>{error.message}</Text>;

  return (
    <SafeAreaView
      className=" self-stretch flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <View className=" flex-1 px-2 self-stretch">
        <ScrollView className=" flex-1 self-stretch">
          {messages.map((message) => (
            <ChatMessageDisplay key={message.id} message={message} />
          ))}
        </ScrollView>

        <View style={{ marginTop: 8 }}>
          <TextInput
            style={{
              backgroundColor: colors.background,
              padding: 8,
              color: colors.text,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 4,
            }}
            placeholder="Say something..."
            placeholderTextColor={colors.grey}
            value={input}
            onChange={(e) => setInput(e.nativeEvent.text)}
            onSubmitEditing={(e) => {
              e.preventDefault();
              sendMessage({ text: input });
              setInput("");
            }}
            autoFocus={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
