const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const encodeText = (text: string): string => {
  const encoded = encoder.encode(text);
  return btoa(String.fromCharCode(...encoded));
};

export const decodeText = (base64: string): string => {
  const decoded = atob(base64);
  return decoder.decode(Uint8Array.from(decoded.split(''), c => c.charCodeAt(0)));
};


