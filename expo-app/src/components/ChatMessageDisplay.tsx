import { useColors } from "@/hooks/colors";
import { useAppSelector } from "@/redux/store";
import { UIMessage } from "ai";
import React from "react";
import { Text, View } from "react-native";

const ChatMessageDisplay = ({ message }: { message: UIMessage }) => {
  const colors = useColors();

  const backgroundColor =
    message.role === "user" ? colors.primary : colors.card;

  const fontSize = useAppSelector((state) => state.settings.fontSize);

  return (
    <View
      key={message.id}
      style={{
        maxWidth: "80%",
        alignSelf: message.role === "user" ? "flex-end" : "flex-start",
      }}
    >
      <View
        style={{
          marginVertical: 8,
          backgroundColor,
          padding: 8,
          borderRadius: 12,
        }}
      >
        {message.parts.map((part, i) => {
          switch (part.type) {
            case "text":
              return (
                <Text
                  key={`${message.id}-${i}`}
                  style={{ color: colors.text, fontSize }}
                  className=" font-semibold"
                >
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
