export class Mimetype {
  private value: string;
  private VALID_MIME_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/bmp",
    "image/tiff",
    "image/heif",
    "image/heic",
    "video/mp4",
    "video/mpeg",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-ms-wmv",
    "video/webm",
    "video/ogg",
    "video/3gpp",
    "video/3gpp2",
  ]);

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error("Invalid mimetype");
    }
    // Validate mimytpe
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  /**
   * Verifica se um MIME type é de imagem ou vídeo
   * @param mimeType string - O MIME type do arquivo
   * @returns boolean - Verdadeiro se for um tipo válido
   */
  isValid(mimeType: string): boolean {
    return this.VALID_MIME_TYPES.has(mimeType);
  }

  /**
   * Retorna a extensão do arquivo com base no MIME type
   * @returns string | null - Extensão do arquivo ou null se não for reconhecido
   */
  getExtension(): string | null {
    const mimeToExtensionMap: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "image/webp": "webp",
      "image/svg+xml": "svg",
      "image/bmp": "bmp",
      "image/tiff": "tiff",
      "image/heif": "heif",
      "image/heic": "heic",
      "video/mp4": "mp4",
      "video/mpeg": "mpeg",
      "video/quicktime": "mov",
      "video/x-msvideo": "avi",
      "video/x-ms-wmv": "wmv",
      "video/webm": "webm",
      "video/ogg": "ogv",
      "video/3gpp": "3gp",
      "video/3gpp2": "3g2",
    };

    return mimeToExtensionMap[this.value] || null;
  }

  isPhoto(): boolean {
    return this.value.startsWith("image/");
  }

  isVideo(): boolean {
    return this.value.startsWith("video/");
  }
}
