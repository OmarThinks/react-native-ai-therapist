import { AsyncStorageKeysEnum } from "@/constants/AsyncStorageKeysEnum";
import { defaultValues } from "@/constants/defaultValues";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

enum ThemeTypeEnum {
  Light = "light",
  Dark = "dark",
  System = "system",
}

interface ThemeState {
  theme: ThemeTypeEnum;
  fontSize: number;
}

const initialState: ThemeState = {
  theme: ThemeTypeEnum.Dark,
  fontSize: defaultValues.fontSize,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateThemeAction: (state, action: PayloadAction<ThemeTypeEnum>) => {
      state.theme = action.payload;
      AsyncStorage.setItem(AsyncStorageKeysEnum.THEME, action.payload);
    },
    updateFontSizeAction: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
      AsyncStorage.setItem(
        AsyncStorageKeysEnum.FONT_SIZE,
        action.payload.toString(),
      );
    },
  },
});

// Action creators are generated for each case reducer function
const { updateThemeAction, updateFontSizeAction } = settingsSlice.actions;

export {
  settingsSlice,
  ThemeTypeEnum,
  updateFontSizeAction,
  updateThemeAction,
};
