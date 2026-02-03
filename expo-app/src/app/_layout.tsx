import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "@/global.css";

function RootLayout() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

export default RootLayout;
