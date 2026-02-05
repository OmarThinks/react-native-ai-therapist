import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColors } from "@/hooks/colors";

const Settings = () => {
  const colors = useColors();
  return (
    <SafeAreaView
      //className="flex-1 items-center "
      style={{ backgroundColor: colors.background }}
    >
      <Text style={{ color: colors.text }}>Settings</Text>
    </SafeAreaView>
  );
};

export default Settings;
