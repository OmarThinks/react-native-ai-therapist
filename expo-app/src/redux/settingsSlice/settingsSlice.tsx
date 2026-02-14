import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeysEnum } from "@/constants/AsyncStorageKeysEnum";

enum ThemeTypeEnum {
  Light = "light",
  Dark = "dark",
  System = "system",
}

interface ThemeState {
  theme: ThemeTypeEnum;
}

const initialState: ThemeState = {
  theme: ThemeTypeEnum.Dark,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateThemeAction: (state, action: PayloadAction<ThemeTypeEnum>) => {
      state.theme = action.payload;
      AsyncStorage.setItem(AsyncStorageKeysEnum.THEME, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
const { updateThemeAction } = settingsSlice.actions;

export { settingsSlice, updateThemeAction };
export { ThemeTypeEnum };
