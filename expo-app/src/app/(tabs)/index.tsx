import { generateAPIUrl } from "@/utils/generateAPIUrl";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { fetch as expoFetch } from "expo/fetch";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function App() {
  const [input, setInput] = useState("");
  const { messages, error, sendMessage } = useChat({
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

  console.log(JSON.stringify(messages, null, 2));

  if (error) return <Text>{error.message}</Text>;

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View
        style={{
          height: "95%",
          display: "flex",
          flexDirection: "column",
          paddingHorizontal: 8,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          {messages.map((m) => (
            <View key={m.id} style={{ marginVertical: 8 }}>
              <View>
                <Text style={{ fontWeight: 700 }}>{m.role}</Text>
                {m.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return <Text key={`${m.id}-${i}`}>{part.text}</Text>;
                  }
                })}
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={{ marginTop: 8 }}>
          <TextInput
            style={{ backgroundColor: "white", padding: 8 }}
            placeholder="Say something..."
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
