import { useAppSelector } from "@/redux/store";
import { lightColors } from "@/constants/colors/lightColors";
import { darkColors } from "@/constants/colors/darkColors";
import { useColorScheme } from "react-native";
import { ThemeTypeEnum } from "../settingsSlice";

const useColors = () => {
  const theme = useAppSelector((state) => state.settings.theme);
  const colorsScheme = useColorScheme();

  if (theme === ThemeTypeEnum.Light) {
    return lightColors;
  } else if (theme === ThemeTypeEnum.Dark) {
    return darkColors;
  } else {
    return colorsScheme === "light" ? lightColors : darkColors;
  }
};

export { useColors };
