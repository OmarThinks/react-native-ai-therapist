import { AudioContext } from "react-native-audio-api";

const playBase64AudioText = async (base64: string, sampleRate: number) => {
  const audioContext = new AudioContext();

  // Convert base64 to raw PCM data
  const arrayBuffer = base64AudioTextToArrayBuffer(base64);
  const pcmData = new Int16Array(arrayBuffer);

  // Create audio buffer with the specified sample rate
  const audioBuffer = audioContext.createBuffer(1, pcmData.length, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  // Convert Int16 PCM data to Float32 for Web Audio API
  for (let i = 0; i < pcmData.length; i++) {
    channelData[i] = pcmData[i] / 32768.0; // Normalize 16-bit to -1.0 to 1.0
  }

  const playerNode = audioContext.createBufferSource();
  playerNode.buffer = audioBuffer;

  playerNode.connect(audioContext.destination);
  playerNode.start(audioContext.currentTime);
  playerNode.stop(audioContext.currentTime + audioBuffer.duration);
};

function base64AudioTextToArrayBuffer(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

function mergePCMBase64Strings(pcmBase64List: string[]): string {
  if (pcmBase64List.length === 0) {
    return "";
  }

  if (pcmBase64List.length === 1) {
    return pcmBase64List[0];
  }

  // Convert all base64 strings to binary data
  const binaryDataArrays: Uint8Array[] = pcmBase64List.map((base64String) => {
    // Remove any data URL prefix if present (e.g., "data:audio/pcm;base64,")
    const cleanBase64 = base64String.replace(/^data:.*?;base64,/, "");

    // Decode base64 to binary
    const binaryString = atob(cleanBase64);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  });

  // Calculate total length
  const totalLength = binaryDataArrays.reduce(
    (sum, array) => sum + array.length,
    0
  );

  // Create merged array
  const mergedArray = new Uint8Array(totalLength);
  let offset = 0;

  for (const array of binaryDataArrays) {
    mergedArray.set(array, offset);
    offset += array.length;
  }

  // Convert back to base64
  let binaryString = "";
  for (let i = 0; i < mergedArray.length; i++) {
    binaryString += String.fromCharCode(mergedArray[i]);
  }

  return btoa(binaryString);
}

export {
  base64AudioTextToArrayBuffer,
  playBase64AudioText,
  mergePCMBase64Strings,
};
