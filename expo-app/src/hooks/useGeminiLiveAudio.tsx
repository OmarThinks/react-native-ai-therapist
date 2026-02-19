import { useChatApiHook } from "@/redux/api/conversationApi/useChatApiHook";
import { combineBase64ArrayList } from "@/utils/audio/combineBase64ArrayList";
import { AvailableVoices } from "@/utils/audio/GeminiVoices";
import {
  type LiveClientMessage,
  type LiveClientSetup,
  type LiveServerMessage,
  type Part,
  type UsageMetadata,
} from "@google/genai";
import { useCallback, useEffect, useRef, useState } from "react";

//const model = "models/gemini-2.5-flash-preview-native-audio-dialog";

const useGeminiLiveAudio = ({
  apiKey,
  accessToken,
  onUsageReporting,
  onReceivingMessage,
  onSocketError,
  onSocketClose,
  onAiResponseCompleted,
  onResponseChunks,
  onUserInterruption,
  voiceName = AvailableVoices[0].voiceName,
  onTurnComplete,
  onAudioResponseChunk,
}: {
  apiKey?: string;
  accessToken?: string;
  onUsageReporting?: (usage: UsageMetadata) => void;
  onReceivingMessage?: (message: LiveServerMessage) => void;
  onSocketError?: (error: unknown) => void;
  onSocketClose?: (reason: unknown) => void;
  onAiResponseCompleted?: ({
    combinedBase64,
  }: {
    combinedBase64: string;
  }) => void;
  onResponseChunks?: (part: Part[]) => void;
  onUserInterruption?: () => void;
  voiceName?: string; // Optional voice name, default to first available voice
  onTurnComplete?: () => void;
  onAudioResponseChunk?: (chunk: string) => void;
}) => {
  // only keep for flagging
  const innerResponseQueue = useRef<Part[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const isSetupCompleteRef = useRef(false);
  const [turnComplete, setTurnComplete] = useState(true);
  const [isSocketConnecting, setIsSocketConnecting] = useState(false);

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

  const { handleReportLiveConversation } = useChatApiHook();

  const reportConversation = useCallback(() => {
    handleReportLiveConversation({
      conversation: JSON.stringify(innerResponseQueue.current),
    });
  }, [handleReportLiveConversation]);

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
    []
  );

  const connectSocket = useCallback(() => {
    setIsSocketConnecting(true);
    //console.log("Connecting to WebSocket...");
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      console.warn("WebSocket is already connected");
      return;
    }

    const urlParams = new URLSearchParams();

    if (apiKey) {
      urlParams.append("key", apiKey);
    }

    if (accessToken) {
      urlParams.append("access_token", accessToken);
    }

    const webSocketString = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContentConstrained?${urlParams.toString()}`;

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
            (part) => part.inlineData !== undefined
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
  }, [
    accessToken,
    apiKey,
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
  ]);

  useEffect(() => {
    if (isConnected && !isSetupCompleteRef.current && socketRef.current) {
      const setupConfig: LiveClientSetup = {
        generationConfig: {
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName,
              },
            },
          },
        },
      };

      sendMessage({ message: { setup: setupConfig }, isSetup: true });
    } else {
      //console.log("WebSocket is not connected");
    }
  }, [isConnected, voiceName, sendMessage]);

  const disconnectSocket = useCallback(() => {
    socketRef.current?.close?.();
  }, []);

  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, [disconnectSocket]);

  const sendRealtimeInput = useCallback(
    (message: string) => {
      if (!socketRef.current) {
        console.warn("No socketRef", socketRef.current);
        return;
      }

      const messageToSend: LiveClientMessage = {
        realtimeInput: {
          audio: {
            data: message,
            mimeType: "audio/pcm;rate=16000",
          },
        },
      };
      sendMessage({ message: messageToSend, isSetup: false });
    },
    [sendMessage]
  );

  return {
    isConnected: isConnected,
    isSetupComplete,
    connectSocket,
    disconnectSocket,
    sendRealtimeInput,
    //responseQueue,
    turnComplete,
    isSocketConnecting,
    reportConversation,
  };
};

export { useGeminiLiveAudio };
