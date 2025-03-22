const decoder = new TextDecoder();

/**
 * Decode Base64 string to array
 * @param base64 base64 string
 * @returns decoded array
 */
export const text2array = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
};

/**
 * Decode Base64 string to array buffer
 * @param base64 base64 string
 * @returns decoded array buffer
 */
export const text2buffer = (base64: string): ArrayBuffer => {
  const bytes = text2array(base64);
  return bytes.buffer;
};

/**
 * Decode Base64 string to string
 * @param base64 Base64 string
 * @returns decoded string
 */
export const text2text = (base64: string): string => {
  const buffer = text2buffer(base64);
  return decoder.decode(buffer);
};


