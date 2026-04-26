import ChatMessageDisplay from "@/components/ChatMessageDisplay";
import { useColors } from "@/hooks/colors";
import { useGeminiLiveAudio } from "@/hooks/useGeminiLiveAudio";
import { useAppSelector } from "@/redux/store";
import { generateAPIUrl } from "@/utils/generateApiUrl";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { DefaultChatTransport } from "ai";
import { fetch as expoFetch } from "expo/fetch";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Platform,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//console.log("Google API Key:", process.env.EXPO_PUBLIC_GOOGLE_API_KEY);

function App() {
  const [input, setInput] = useState("");

  const a = useGeminiLiveAudio();

  const {
    messages: _messages,
    error,
    sendMessage,
  } = useChat({
    transport: new DefaultChatTransport({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api:
        Platform.OS === "web"
          ? "http://localhost:3000/api/chat"
          : "http://10.0.2.2:3000/api/chat",
      //api: generateAPIUrl("/api/chat"),
    }),
    onError: (error) => console.error(error, "ERROR"),
    /*messages: [
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
    ],*/
  });

  const messages: UIMessage[] = _messages;

  const colors = useColors();

  const fontSize = useAppSelector((state) => state.settings.fontSize);

  if (error) return <Text>{error.message}</Text>;

  console.log(JSON.stringify(messages, null, 2));

  return (
    <SafeAreaView
      className=" self-stretch flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <View className=" flex-1 px-2 self-stretch">
        {/*<ScrollView className=" flex-1 self-stretch" style={{ gap: 8 }}>
          {messages.map((message) => (
            <ChatMessageDisplay key={message.id} message={message} />
          ))}
        </ScrollView>*/}

        {messages.length > 0 ? (
          <FlatList
            data={messages}
            renderItem={(item) => (
              <ChatMessageDisplay message={item.item} key={item.item.id} />
            )}
            keyExtractor={(message) => message.id}
            className=" flex-1 self-stretch"
          />
        ) : (
          <View className=" self-stretch flex-1 justify-center items-center">
            <Text
              style={{
                color: colors.text,
                fontSize: 36,
                fontWeight: "bold",
              }}
            >
              AI
            </Text>
            <Text
              style={{
                color: colors.text,
                fontSize: 36,
                fontWeight: "bold",
              }}
            >
              Therapist
            </Text>
          </View>
        )}

        <View style={{ marginTop: 8 }}>
          <TextInput
            style={{
              backgroundColor: colors.background,
              padding: 8,
              color: colors.text,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 4,
              fontSize,
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
