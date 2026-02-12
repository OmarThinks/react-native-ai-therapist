import { useColors } from "@/hooks/colors";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function TabTwoScreen() {
  const colors = useColors();

  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}><Text style={{ color: colors.text }}>Explore</Text></SafeAreaView>;
}
