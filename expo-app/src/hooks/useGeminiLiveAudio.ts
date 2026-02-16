import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const webSocketUrl =
  "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";

console.log(process.env.EXPO_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY);

const useGeminiLiveAudio = () => {
  const [socketUrl, setSocketUrl] = useState(webSocketUrl);
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${socketUrl}?access_token=${process.env.EXPO_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY}`,
  );

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  console.log("connectionStatus", connectionStatus);
};

export { useGeminiLiveAudio };
