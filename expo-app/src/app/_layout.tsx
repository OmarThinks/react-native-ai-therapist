import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "@/global.css";
import { useInitializeApp } from "@/hooks/useInitializeApp";

const AppInsideRedux = () => {
  const { isAppInitialized } = useInitializeApp();

  if (!isAppInitialized) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, alignSelf: "center" }}
      />
    );
  }

  return (
    <View style={{ flex: 1, alignSelf: "stretch" }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
};

function RootLayout() {
  return (
    <Provider store={store}>
      <AppInsideRedux />
    </Provider>
  );
}

export default RootLayout;
