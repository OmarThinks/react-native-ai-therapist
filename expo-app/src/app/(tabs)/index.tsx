import { useColors } from "@/hooks/colors";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const colors = useColors();

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center bg-white"
      style={{ backgroundColor: colors.background }}
    >
      <Text
        className="text-xl font-bold text-blue-500"
        style={{ color: colors.text }}
      >
        Welcome to Nativewind!
      </Text>
    </SafeAreaView>
  );
}
