// src/api/interfaces/ResponseObject.ts

import { MediaFormats } from './MediaFormat';

/**
 * Interface representing a response object from the Tenor API.
 */
export interface ResponseObject {
  /**
   * A Unix timestamp representing when this post was created.
   */
  created: number;

  /**
   * Indicates whether this post contains audio.
   *
   * Note: Only video formats support audio. The GIF format cannot contain audio information.
   */
  hasaudio: boolean;

  /**
   * The unique identifier for the Tenor result.
   */
  id: string;

  /**
   * A dictionary where the key is the content format (e.g., "gif", "mp4")
   * and the value is a MediaObject that contains details about the media in that format.
   */
  media_formats: MediaFormats;

  /**
   * An array of tags associated with the post.
   */
  tags: string[];

  /**
   * The title of the post.
   */
  title: string;

  /**
   * A textual description of the content.
   *
   * Recommended for user accessibility features.
   */
  content_description: string;

  /**
   * The full URL to view the post on tenor.com.
   */
  itemurl: string;

  /**
   * Indicates whether this post contains captions.
   */
  hascaption: boolean;

  /**
   * A comma-separated list to signify whether the content is a sticker, static image,
   * has audio, or is any combination of these.
   *
   * If both "sticker" and "static" are not present, the content is a GIF.
   * An empty "flags" field signifies a GIF without audio.
   */
  flags: string;

  /**
   * The most common background pixel color of the content.
   */
  bg_color: string;

  /**
   * A short URL to view the post on tenor.com.
   */
  url: string;
}
