import { useColors } from "@/hooks/colors";
import {
  ThemeTypeEnum,
  updateFontSizeAction,
  updateThemeAction,
} from "@/redux/settingsSlice/settingsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { defaultValues } from "@/constants/defaultValues";

const maxFontSize = 100;
const minFontSize = 5;

const Settings = () => {
  const colors = useColors();

  const fontSize = useAppSelector((state) => state.settings.fontSize);

  const dispatch = useAppDispatch();

  const updateFontSize = (newFontSize: number) => {
    if (newFontSize < minFontSize || newFontSize > maxFontSize) {
      return;
    }
    dispatch(updateFontSizeAction(newFontSize));
  };

  return (
    <SafeAreaView
      className="flex-1 self-stretch "
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={{ alignSelf: "stretch", flex: 1, padding: 16 }}
      >
        <Title text="Theme:" />

        <View className="gap-4 self-stretch">
          <ThemeSelectorCard themeType={ThemeTypeEnum.Light} text="Light" />
          <ThemeSelectorCard themeType={ThemeTypeEnum.Dark} text="Dark" />
          <ThemeSelectorCard themeType={ThemeTypeEnum.System} text="System" />
        </View>

        <HR />

        <Title text="Font Size:" />

        <Text
          className=" self-stretch text-center mb-4 font-semibold"
          style={{ color: colors.text, fontSize }}
        >
          {fontSize}
        </Text>

        <View className=" self-stretch flex-row items-start justify-between gap-5">
          <FontSizeChangeButton
            iconName="remove"
            onPress={() => updateFontSize(fontSize - 1)}
            disabled={fontSize <= minFontSize}
          />
          <FontSizeChangeButton
            iconName="refresh"
            onPress={() => updateFontSize(defaultValues.fontSize)}
            disabled={false}
          />
          <FontSizeChangeButton
            iconName="add"
            onPress={() => updateFontSize(fontSize + 1)}
            disabled={fontSize >= maxFontSize}
          />
        </View>

        <HR />
      </ScrollView>
    </SafeAreaView>
  );
};

const FontSizeChangeButton = ({
  onPress,
  iconName,
  disabled,
}: {
  iconName: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  disabled: boolean;
}) => {
  const colors = useColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-2 rounded flex-1 justify-center items-center py-3"
      style={{ backgroundColor: disabled ? colors.border : colors.primary }}
      disabled={disabled}
    >
      <MaterialIcons name={iconName} size={44} color={colors.background} />
    </TouchableOpacity>
  );
};

const HR = () => {
  const colors = useColors();
  return (
    <View
      className=" h-[2px] self-stretch my-8"
      style={{ backgroundColor: colors.border }}
    />
  );
};

const Title = ({ text }: { text: string }) => {
  const colors = useColors();
  return (
    <Text
      className=" text-[32px] font-semibold mb-4"
      style={{ color: colors.text }}
    >
      {text}
    </Text>
  );
};

const ThemeSelectorCard = ({
  text,
  themeType,
}: {
  themeType: ThemeTypeEnum;
  text: string;
}) => {
  const activeTheme = useAppSelector((state) => state.settings.theme);

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
      style={{
        borderColor: isActive ? colors.primary : colors.border,
        borderWidth: 2,
        borderRadius: 30,
      }}
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
