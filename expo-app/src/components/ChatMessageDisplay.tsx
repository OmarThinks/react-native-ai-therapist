import { useColors } from "@/hooks/colors";
import { UIMessage } from "ai";
import React from "react";
import { Text, View } from "react-native";

const ChatMessageDisplay = ({ message }: { message: UIMessage }) => {
  const colors = useColors();

  return (
    <View
      key={message.id}
      style={{
        maxWidth: "80%",
        alignSelf: message.role === "user" ? "flex-end" : "flex-start",
      }}
    >
      <View style={{ marginVertical: 8 }}>
        <Text style={{ fontWeight: 700, color: colors.text }}>
          {message.role}
        </Text>
        {message.parts.map((part, i) => {
          switch (part.type) {
            case "text":
              return (
                <Text key={`${message.id}-${i}`} style={{ color: colors.text }}>
                  {part.text}
                </Text>
              );
          }
        })}
      </View>
    </View>
  );
};

export default ChatMessageDisplay;
