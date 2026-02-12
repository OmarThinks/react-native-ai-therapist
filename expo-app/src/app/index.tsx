import { useColors } from "@/hooks/colors";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colors = useColors();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <Text style={{ color: colors.text }}>
        Edit app/index.tsx to edit this screen.
      </Text>
    </SafeAreaView>
  );
}
