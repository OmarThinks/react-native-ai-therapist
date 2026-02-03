import { darkColors } from "@/constants/colors/darkColors";
import { lightColors } from "@/constants/colors/lightColors";
import { store } from "@/redux/store";
import { ThemeType, updateThemeAction } from "@/redux/themeSlice/themeSlice";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";

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
    return darkColors;
  }, [theme, systemTheme]);

  return colors;
};

const useUpdateTheme = (newTheme: ThemeType) => {
  const dispatch = useDispatch();

  const updateTheme = () => {
    dispatch(updateThemeAction(newTheme));
  };

  return {
    updateTheme,
  };
};

export { useColors, useUpdateTheme };
