import { useCallback, useEffect, useRef, useState } from "react";
import {
  type LiveClientMessage,
  type LiveClientSetup,
  type LiveServerMessage,
  type Part,
  type UsageMetadata,
} from "@google/genai";
import { combineBase64ArrayList } from "@/utils/audio/combineBase64ArrayList";

const webSocketUrl =
  "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";

console.log(process.env.EXPO_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY);

const useGeminiLiveAudio = () => {
  const innerResponseQueue = useRef<Part[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const isSetupCompleteRef = useRef(false);
  const [turnComplete, setTurnComplete] = useState(true);
  const [isSocketConnecting, setIsSocketConnecting] = useState(false);

  const onUsageReporting: (usage: UsageMetadata) => void =
    useCallback(() => {}, []);
  const onReceivingMessage: (message: LiveServerMessage) => void =
    useCallback(() => {}, []);
  const onTurnComplete: () => void = useCallback(() => {}, []);
  const onResponseChunks: (parts: Part[]) => void = useCallback(() => {}, []);
  const onAudioResponseChunk: (audioChunk: string) => void =
    useCallback(() => {}, []);
  const onAiResponseCompleted: (response: { combinedBase64: string }) => void =
    useCallback(() => {}, []);
  const onUserInterruption: () => void = useCallback(() => {}, []);
  const onSocketError: (error: unknown) => void = useCallback((error) => {
    console.log("WebSocket error:", error);
  }, []);

  const onSocketClose: (reason: unknown) => void = useCallback(
    (event) => {},
    [],
  );

  const resetState = useCallback(() => {
    innerResponseQueue.current = [];
    socketRef.current = null;
    setIsConnected(false);
    setIsSetupComplete(false);
    isSetupCompleteRef.current = false;
    setTurnComplete(true);
    setIsSocketConnecting(false);
  }, []);

  const updateIsSetupComplete = useCallback((value: boolean) => {
    setIsSetupComplete(value);
    isSetupCompleteRef.current = value;
  }, []);

  const sendMessage = useCallback(
    ({
      message,
      isSetup,
    }: {
      message: LiveClientMessage;
      isSetup: boolean;
    }) => {
      if (!isSetup && !isSetupCompleteRef.current) {
        //console.warn("WebSocket is not set up");
        return;
      }
      if (!socketRef.current) {
        console.warn("WebSocket is not connected");
        return;
      }
      //console.log("Sending Message:", message);
      socketRef.current.send(JSON.stringify(message));
    },
    [],
  );

  const connectSocket = useCallback(
    (
      key:
        | {
            apiKey: string;
            accessToken: never;
          }
        | {
            accessToken: string;
            apiKey: never;
          },
    ) => {
      setIsSocketConnecting(true);
      //console.log("Connecting to WebSocket...");
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        console.warn("WebSocket is already connected");
        return;
      }

      const urlParams = new URLSearchParams();

      if (key?.apiKey) {
        urlParams.append("key", key.apiKey);
      } else if (key?.accessToken) {
        urlParams.append("access_token", key.accessToken);
      }

      const webSocketString = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContentConstrained?${urlParams.toString()}`;

      //console.log("webSocketString", webSocketString);

      const ws = new WebSocket(webSocketString);
      socketRef.current = ws;
      socketRef.current.onopen = () => {
        //console.log("WebSocket connection opened");
        setIsConnected(true);
        setIsSocketConnecting(false);
      };
      socketRef.current.onmessage = async (event: MessageEvent<Blob>) => {
        //console.debug("WebSocket message received:", event);
        //console.log("message received");

        let text = "";
        let message: LiveServerMessage;

        try {
          if (typeof event.data === "string") {
            text = event.data;
            // Text message (React Native default for text)
            // console.log("WebSocket message text:", event.data);
          } else if (event.data instanceof ArrayBuffer) {
            // Binary message
            text = new TextDecoder().decode(event.data);
            //console.log("WebSocket binary as text:", text);
          } else if (event.data instanceof Blob) {
            // Browser Blob case
            text = await event.data.text();
            //console.log("WebSocket blob text:", text);
          } else {
            console.warn("Unknown WebSocket message type:", typeof event.data);
            return; // Early return for unknown types
          }

          if (!text.trim()) {
            console.warn("Received empty message");
            return;
          }

          message = JSON.parse(text);
        } catch (error) {
          console.error("Error processing WebSocket message:", error);
          return;
        }
        //console.log("Received message:", message);

        if (message?.setupComplete || message?.serverContent) {
          updateIsSetupComplete(true);
        }

        if (message.usageMetadata) {
          onUsageReporting?.(message.usageMetadata);
        }
        onReceivingMessage?.(message);

        //console.log("turnComplete:", message.serverContent?.turnComplete);

        if (message.serverContent?.generationComplete) {
          setTurnComplete(true);
          onTurnComplete?.();

          const responseStrings: string[] = [];
          for (const part of innerResponseQueue.current) {
            const audioString = part?.inlineData?.data;
            if (audioString) {
              responseStrings.push(audioString);
            }
          }
          const combinedBase64 = combineBase64ArrayList(responseStrings);

          onAiResponseCompleted?.({ combinedBase64 });
          /*console.log(
          "AI Turn completed, base64 audio:",
          responseQueue,
          combinedBase64,
          innerResponseQueue.current
        );*/
          innerResponseQueue.current = [];
        }
        if (message?.serverContent?.modelTurn?.parts) {
          const parts: Part[] =
            message?.serverContent?.modelTurn?.parts.filter(
              (part) => part.inlineData !== undefined,
            ) ?? [];

          if (parts.length > 0) {
            onResponseChunks?.(parts);

            const newResponseQueue = [...innerResponseQueue.current, ...parts];
            for (const part of parts) {
              const audioResponse = part.inlineData?.data;
              if (audioResponse && onAudioResponseChunk) {
                onAudioResponseChunk(audioResponse);
              }
            }

            setTurnComplete(false);
            innerResponseQueue.current = newResponseQueue;
          }
        }
        if (message?.serverContent?.interrupted) {
          onUserInterruption?.();
        }
      };
      socketRef.current.onerror = (error) => {
        setIsSocketConnecting(false);
        console.log("WebSocket error:", error);
        //console.debug("Error:", error);
        onSocketError?.(error);
      };
      socketRef.current.onclose = (event) => {
        setIsSocketConnecting(false);
        resetState();
        //console.debug("Close:", event.reason);
        //console.log("Session closed:", event);
        socketRef.current = null;
        onSocketClose?.(event);
        setIsConnected(false);
        isSetupCompleteRef.current = false;
      };
    },
    [
      onAiResponseCompleted,
      onAudioResponseChunk,
      onReceivingMessage,
      onResponseChunks,
      onSocketClose,
      onSocketError,
      onTurnComplete,
      onUsageReporting,
      onUserInterruption,
      resetState,
      updateIsSetupComplete,
    ],
  );

  return {
    connectSocket,
    isConnected,
    isSetupComplete,
    turnComplete,
    sendMessage,
    isSocketConnecting,
  };
};

export { useGeminiLiveAudio };
