import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "@/global.css";
import { useInitializeApp } from "@/hooks/useInitializeApp";
import { useColors, useIsThemeLightOrDark } from "@/hooks/colors";

const AppInsideRedux = () => {
  const { isAppInitialized } = useInitializeApp();
  const isThemeLightOrDark = useIsThemeLightOrDark();
  const colors = useColors();

  if (!isAppInitialized) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          flex: 1,
          alignSelf: "stretch",
          backgroundColor: colors.background,
        }}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
      }}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={isThemeLightOrDark ? "dark" : "light"} />
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
