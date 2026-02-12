import { AsyncStorageKeysEnum } from "@/constants/AsyncStorageKeysEnum";
import { ThemeTypeEnum } from "@/redux/themeSlice/themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useUpdateTheme } from "./colors";

const useInitializeApp = () => {
  const [isColorInitialized, setIsColorInitialized] = useState(false);

  const { updateTheme } = useUpdateTheme();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const [[, theme]] = await AsyncStorage.multiGet([
          AsyncStorageKeysEnum.THEME,
        ]);

        if (theme) {
          updateTheme(theme as ThemeTypeEnum);
          setIsColorInitialized(true);
        }
      } catch {
      } finally {
        setIsColorInitialized(true);
      }
    };
    initializeApp();
  }, [updateTheme]);

  return { isAppInitialized: isColorInitialized };
};

export { useInitializeApp };
