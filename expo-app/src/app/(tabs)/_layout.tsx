import { useColors } from "@/hooks/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

function TabLayout() {
  const colors = useColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey,
        tabBarStyle: { backgroundColor: colors.card },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => {
            return <MaterialIcons color={color} size={28} name={"home"} />;
          },
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialIcons color={color} size={28} name={"settings"} />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
