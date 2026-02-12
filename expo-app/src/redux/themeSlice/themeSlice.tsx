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
  value: ThemeTypeEnum;
}

const initialState: ThemeState = {
  value: ThemeTypeEnum.Dark,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateThemeAction: (state, action: PayloadAction<ThemeTypeEnum>) => {
      state.value = action.payload;
      AsyncStorage.setItem(AsyncStorageKeysEnum.THEME, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
const { updateThemeAction } = themeSlice.actions;

export { themeSlice, updateThemeAction };
export { ThemeTypeEnum };
