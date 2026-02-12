import { useColors } from "@/hooks/colors";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ThemeType } from "@/redux/themeSlice/themeSlice";
import { useAppSelector } from "@/redux/store";

const Settings = () => {
  const colors = useColors();
  return (
    <SafeAreaView
      className="flex-1 self-stretch "
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={{ alignSelf: "stretch", flex: 1, padding: 16 }}
      >
        <Text
          className=" text-[32px] font-semibold"
          style={{ color: colors.text }}
        >
          Theme:
        </Text>

        <View className="gap-4 mt-4 self-stretch">
          <ThemeSelectorCard themeType="light" text="Light" />
          <ThemeSelectorCard themeType="dark" text="Dark" />
          <ThemeSelectorCard themeType="system" text="System" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ThemeSelectorCard = ({
  text,
  themeType,
}: {
  themeType: ThemeType;
  text: string;
}) => {
  const activeTheme = useAppSelector((state) => state.theme.value);

  const isActive = activeTheme === themeType;

  const colors = useColors();

  return (
    <TouchableOpacity
      className=" self-stretch border-[1] rounded-[8px] px-3 py-4 flex-row items-center gap-4 flex-wrap"
      style={{
        borderColor: isActive ? colors.primary : colors.border,
        //padding: 16,
        borderWidth: 4,
      }}
    >
      <Text style={{ color: colors.text }} className=" text-[24px]">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Settings;
