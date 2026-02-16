import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const webSocketUrl =
  "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";

const useGeminiLiveAudio = () => {
  const [socketUrl, setSocketUrl] = useState(webSocketUrl);
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);
};
