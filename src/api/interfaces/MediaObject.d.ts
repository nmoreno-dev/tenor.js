// src/api/interfaces/MediaObject.ts

/**
 * Interface representing a media object from the Tenor API.
 */
export interface MediaObject {
  /**
   * A URL to the media source.
   */
  url: string;

  /**
   * An array containing the width and height of the media in pixels.
   *
   * The first element is the width, and the second element is the height.
   */
  dims: number[];

  /**
   * Represents the time in seconds for one loop of the content.
   *
   * If the content is static, the duration is set to 0.
   */
  duration: number;

  /**
   * The size of the file in bytes.
   */
  size: number;
}
