// src/api/interfaces/ContentFormat.ts

/**
 * Enum representing the various media format types supported by the Tenor API.
 */
export enum ContentFormat {
  GIF = 'gif',
  MediumGIF = 'mediumgif',
  TinyGIF = 'tinygif',
  NanoGIF = 'nanogif',
  MP4 = 'mp4',
  LoopedMP4 = 'loopedmp4',
  TinyMP4 = 'tinymp4',
  NanoMP4 = 'nanomp4',
  WebM = 'webm',
  TinyWebM = 'tinywebm',
  NanoWebM = 'nanowebm',
  WebPTransparent = 'webp_transparent',
  TinyWebPTransparent = 'tinywebp_transparent',
  NanoWebPTransparent = 'nanowebp_transparent',
  GIFTransparent = 'gif_transparent',
  TinyGIFTransparent = 'tinygif_transparent',
  NanoGIFTransparent = 'nanogif_transparent',
}

/**
 * Interface representing a content format object in the Tenor API.
 * This interface can be used to define the properties for different formats such as GIF, MP4, WebM, etc.
 */
export interface ContentFormatDetails {
  /**
   * A URL to the media source.
   */
  url: string;

  /**
   * The dimensions of the media in pixels.
   * The first element is the width, and the second element is the height.
   */
  dims: number[];

  /**
   * The duration of the media in seconds for one loop of the content.
   * If the content is static, the duration is set to 0.
   */
  duration: number;

  /**
   * The size of the file in bytes.
   */
  size: number;
}

/**
 * Interface representing the media formats object returned by the Tenor API.
 * It maps each content format type to its corresponding details.
 */
export interface MediaFormats {
  [format in ContentFormat]?: ContentFormatDetails;
}
