import { darkColors } from "@/constants/colors/darkColors";
import { lightColors } from "@/constants/colors/lightColors";
import { store } from "@/redux/store";
import {
  ThemeTypeEnum,
  updateThemeAction,
} from "@/redux/themeSlice/themeSlice";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const themeSelector = (state: ReturnType<typeof store.getState>) =>
  state.theme.value;

const useColors = () => {
  const theme = useSelector(themeSelector);

  const systemTheme = useColorScheme();

  const colors = useMemo(() => {
    if (theme === ThemeTypeEnum.Light) {
      return lightColors;
    }
    if (theme === ThemeTypeEnum.Dark) {
      return darkColors;
    }
    if (theme === ThemeTypeEnum.System) {
      return systemTheme === "dark" ? darkColors : lightColors;
    }
    return darkColors;
  }, [theme, systemTheme]);

  return colors;
};

const useUpdateTheme = () => {
  const dispatch = useDispatch();

  const updateTheme = (newTheme: ThemeTypeEnum) => {
    dispatch(updateThemeAction(newTheme));
  };

  return {
    updateTheme,
  };
};

const useIsThemeLightOrDark = () => {
  const theme = useSelector(themeSelector);

  const systemTheme = useColorScheme();

  const isLightOrDark = useMemo(() => {
    if (theme === ThemeTypeEnum.Light) {
      return true;
    }
    if (theme === ThemeTypeEnum.Dark) {
      return false;
    }
    if (theme === ThemeTypeEnum.System) {
      return systemTheme === "light" ? true : false;
    }
    return false;
  }, [theme, systemTheme]);

  return isLightOrDark;
};

export { useColors, useUpdateTheme, useIsThemeLightOrDark };
