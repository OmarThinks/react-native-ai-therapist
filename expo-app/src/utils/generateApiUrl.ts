import Constants from "expo-constants";

const generateAPIUrl = (relativePath: string) => {
  const origin = Constants.experienceUrl.replace("exp://", "http://");
  const origin2 =
    "http://" + Constants?.manifest2?.extra?.expoClient?.hostUri ||
    "localhost:3000";

  console.log(JSON.stringify(Constants, null, 2));
  console.log(origin, origin2);
  const path = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;

  if (process.env.NODE_ENV === "development") {
    return origin.concat(path);
  }

  if (!process.env.EXPO_PUBLIC_API_BASE_URL) {
    throw new Error(
      "EXPO_PUBLIC_API_BASE_URL environment variable is not defined",
    );
  }

  return process.env.EXPO_PUBLIC_API_BASE_URL.concat(path);
};

export { generateAPIUrl };
