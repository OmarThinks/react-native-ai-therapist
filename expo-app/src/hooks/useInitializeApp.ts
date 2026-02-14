import { AsyncStorageKeysEnum } from "@/constants/AsyncStorageKeysEnum";
import {
  ThemeTypeEnum,
  updateFontSizeAction,
} from "@/redux/settingsSlice/settingsSlice";
import { useAppDispatch } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useUpdateTheme } from "./colors";

const useInitializeApp = () => {
  const [isColorInitialized, setIsColorInitialized] = useState(false);
  const [isFontSizeInitialized, setIsFontSizeInitialized] = useState(false);
  const dispatch = useAppDispatch();

  const { updateTheme } = useUpdateTheme();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const [[, theme], [, fontSize]] = await AsyncStorage.multiGet([
          AsyncStorageKeysEnum.THEME,
          AsyncStorageKeysEnum.FONT_SIZE,
        ]);

        try {
          if (
            theme === ThemeTypeEnum.Light ||
            theme === ThemeTypeEnum.Dark ||
            theme === ThemeTypeEnum.System
          ) {
            updateTheme(theme);
          }
        } catch {
        } finally {
          setIsColorInitialized(true);
        }

        if (fontSize) {
          try {
            const fontSizeNumber = parseInt(fontSize, 10);
            if (!isNaN(fontSizeNumber)) {
              dispatch(updateFontSizeAction(fontSizeNumber));
            }
          } catch {
          } finally {
            setIsFontSizeInitialized(true);
          }
        }
      } catch {
      } finally {
        setIsColorInitialized(true);
        setIsFontSizeInitialized(true);
      }
    };
    initializeApp();
  }, [dispatch, updateTheme]);

  return { isAppInitialized: isColorInitialized && isFontSizeInitialized };
};

export { useInitializeApp };
