import { Buffer } from "buffer";

const combineBase64ArrayList = (base64Array: string[]): string => {
  const pcmChunks: Uint8Array[] = base64Array.map((base64Text) => {
    if (base64Text) {
      const buf = Buffer.from(base64Text, "base64"); // decode base64 to raw bytes
      const toReturn = new Uint8Array(
        buf.buffer,
        buf.byteOffset,
        buf.byteLength
      );
      return toReturn;
    } else {
      return new Uint8Array();
    }
  });

  // Calculate total length
  const totalLength = pcmChunks.reduce((acc, chunk) => acc + chunk.length, 0);

  // Create one big Uint8Array
  const combined = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of pcmChunks) {
    combined.set(chunk, offset);
    offset += chunk.length;
  }

  // Convert back to base64
  const combinedBase64 = Buffer.from(combined.buffer).toString("base64");

  return combinedBase64;
};

export { combineBase64ArrayList };
