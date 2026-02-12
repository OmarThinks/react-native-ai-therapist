import { useAppSelector } from "@/redux/store";
import { lightColors } from "@/constants/colors/lightColors";
import { darkColors } from "@/constants/colors/darkColors";
import { useColorScheme } from "react-native";

const useColors = () => {
  const theme = useAppSelector((state) => state.theme.value);
  const colorsScheme = useColorScheme();

  if (theme === "light") {
    return lightColors;
  } else if (theme === "dark") {
    return darkColors;
  } else {
    return colorsScheme === "light" ? lightColors : darkColors;
  }
};

export { useColors };
