import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColors } from "@/redux/settingsSlice/hooks/useColors";
import { useGeminiLiveAudio } from "@/hooks/useGeminiLiveAudio";

const Voice = () => {
  const colors = useColors();

  const { isConnected, connectSocket, isSocketConnecting } =
    useGeminiLiveAudio();

  return (
    <SafeAreaView
      className="flex-1 self-stretch "
      style={{ backgroundColor: colors.background }}
    >
      <Text>{isConnected ? "Connected" : "Disconnected"}</Text>
      <Text>{isSocketConnecting ? "Connecting..." : "Not connecting"}</Text>
      <Button
        onPress={() => {
          connectSocket({
            /*apiKey: process.env
              .EXPO_PUBLIC_GOOGLE_API_KEY as string,*/
            accessToken: process.env.EXPO_PUBLIC_GOOGLE_API_KEY as string,
            apiKey: undefined,
          });
        }}
        title="Connect"
      />
    </SafeAreaView>
  );
};

export default Voice;
