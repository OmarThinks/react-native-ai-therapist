/**
 * Audio processing utilities
 */

// Calculate RMS (Root Mean Square) for volume detection

const calculateVolumeFromStreamingModuleData = (
  audioData: number[]
): number => {
  if (audioData.length === 0) return 0;

  const sum = audioData.reduce((acc, sample) => acc + sample * sample, 0);
  const rms = Math.sqrt(sum / audioData.length);

  // Normalize to 0-100 range
  return Math.min(100, (rms / 32767) * 100);
};

// Detect if there's speech/sound activity
const detectSpeechActivityFromStreamingModuleData = (
  audioData: number[],
  threshold: number = 5
): boolean => {
  const volume = calculateVolumeFromStreamingModuleData(audioData);
  return volume > threshold;
};

// Convert audio data to base64 for transmission
const streamModuleAudioDataToBase64 = (audioData: number[]): string => {
  // Convert to 16-bit PCM buffer
  const buffer = new ArrayBuffer(audioData.length * 2);
  const view = new DataView(buffer);

  for (let i = 0; i < audioData.length; i++) {
    view.setInt16(i * 2, audioData[i], true); // little endian
  }

  // Convert to base64
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
};

export {
  calculateVolumeFromStreamingModuleData,
  detectSpeechActivityFromStreamingModuleData,
  streamModuleAudioDataToBase64,
};
