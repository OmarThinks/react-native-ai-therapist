import { useColors } from "@/hooks/colors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ThemeTypeEnum, updateThemeAction } from "@/redux/themeSlice/themeSlice";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
          <ThemeSelectorCard themeType={ThemeTypeEnum.Light} text="Light" />
          <ThemeSelectorCard themeType={ThemeTypeEnum.Dark} text="Dark" />
          <ThemeSelectorCard themeType={ThemeTypeEnum.System} text="System" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ThemeSelectorCard = ({
  text,
  themeType,
}: {
  themeType: ThemeTypeEnum;
  text: string;
}) => {
  const activeTheme = useAppSelector((state) => state.theme.value);

  const isActive = activeTheme === themeType;

  const colors = useColors();

  const dispatch = useAppDispatch();
  const onPress = () => {
    dispatch(updateThemeAction(themeType));
  };

  return (
    <TouchableOpacity
      className=" self-stretch border-[1] rounded-[8px] px-3 py-4 flex-row items-center gap-4 flex-wrap"
      style={{
        borderColor: isActive ? colors.primary : colors.border,
        borderWidth: 4,
      }}
      onPress={onPress}
    >
      <IsActiveRadioButton isActive={isActive} />

      <Text style={{ color: colors.text }} className=" text-[24px]">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const IsActiveRadioButton = ({ isActive }: { isActive: boolean }) => {
  const colors = useColors();
  return (
    <View
      className="w-[24px] h-[24px] border-[1] items-center justify-center"
      style={{ borderColor: isActive? colors.primary: colors.border, borderWidth: 2, borderRadius: 30 }}
    >
      {isActive && (
        <View
          className="w-[12px] h-[12px] rounded-full"
          style={{ backgroundColor: colors.primary }}
        />
      )}
    </View>
  );
};

export default Settings;
