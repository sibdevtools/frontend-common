const encoder = new TextEncoder();

const encodeReducer = (data: string, byte: number) => {
  return data + String.fromCharCode(byte);
}

/**
 * Encode array to base64
 * @param array array
 * @returns base64 string
 */
export const array2text = (array: Uint8Array): string => {
  const reduced = array.reduce(encodeReducer, '');
  return btoa(reduced);
};

/**
 * Encode array buffer to base64
 * @param arrayBuffer array buffer
 * @returns base64 string
 */
export const buffer2text = (arrayBuffer: ArrayBuffer): string => {
  const array = new Uint8Array(arrayBuffer);
  return array2text(array);
};

/**
 * Encode string to Base64 string
 * @param text raw string
 * @returns Base64 string
 */
export const text2text = (text: string): string => {
  const arrayBuffer = encoder.encode(text);
  return array2text(arrayBuffer);
};


