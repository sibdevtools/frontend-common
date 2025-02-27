/**
 * Upload user file into browser, return Base64 string
 * @param file user file
 * @param maxFileSize max file size
 */
export const upload = async (file: File, maxFileSize: number): Promise<string> => {
  if (file.size > maxFileSize) {
    throw new Error(`File too big: ${file.size} > ${maxFileSize} bytes`)
  }
  const stream = file.stream();
  const reader = stream.getReader();
  const result = new Uint8Array(file.size);
  let offset = 0

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    result.set(value, offset)
    offset += value.length
  }

  return btoa(result.reduce(function (data, byte) {
    return data + String.fromCharCode(byte);
  }, ''));
};

/**
 * Offer download file to user
 * @param content Base64 file content
 * @param filename default file name
 */
export const download = (content: string, filename: string): void => {
  const byteCharacters = atob(content);
  const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'application/octet-stream' });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  link.click();
};

/**
 * Format file size into human-readable format.
 * If file size more than 0.01 GB, than return it.
 * Else and file size more than 0.01 MB, than return it.
 * Else and file size more than 0.01 KB, than return it.
 * Else return bytes.
 *
 * @param size file size in bytes
 */
export function formatFileSize(size: number): string {
  const kbFileSize = size / 1024;
  const mbFileSize = kbFileSize / 1024;
  const gbFileSize = mbFileSize / 1024;

  if (gbFileSize >= 0.01) {
    return `${gbFileSize.toFixed(2)} GB`;
  } else if (mbFileSize >= 0.01) {
    return `${mbFileSize.toFixed(2)} MB`;
  } else if (kbFileSize >= 0.01) {
    return `${kbFileSize.toFixed(2)} KB`;
  } else {
    return `${size} bytes`;
  }
}
