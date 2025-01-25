import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: false,
};

// Create the slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
  },
});

// Export actions and reducer
export const { toggleDarkMode, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
