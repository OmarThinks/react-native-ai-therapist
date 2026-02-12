import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeysEnum } from "@/constants/AsyncStorageKeysEnum";

type ThemeType = "light" | "dark" | "system";

interface ThemeState {
  value: ThemeType;
}

const initialState: ThemeState = {
  value: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateThemeAction: (state, action: PayloadAction<ThemeType>) => {
      state.value = action.payload;
      AsyncStorage.setItem(AsyncStorageKeysEnum.THEME, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
const { updateThemeAction } = themeSlice.actions;

export { themeSlice, updateThemeAction };
export type { ThemeType };
