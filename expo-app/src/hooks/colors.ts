import { store } from "@/redux/store";
import { useSelector } from "react-redux";
import { lightColors } from "@/constants/colors/lightColors";
import { darkColors } from "@/constants/colors/darkColors";
import { useMemo } from "react";
import { useColorScheme } from "react-native";

const themeSelector = (state: ReturnType<typeof store.getState>) =>
  state.theme.value;

const useColors = () => {
  const theme = useSelector(themeSelector);

  const systemTheme = useColorScheme();

  const colors = useMemo(() => {
    if (theme === "light") {
      return lightColors;
    }
    if (theme === "dark") {
      return darkColors;
    }
    if (theme === "system") {
      return systemTheme === "dark" ? darkColors : lightColors;
    }
  }, [theme, systemTheme]);

  return colors;
};

export { useColors };
