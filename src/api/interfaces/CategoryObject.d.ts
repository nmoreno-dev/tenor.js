// src/api/interfaces/CategoryObject.ts

/**
 * Interface representing a category object from the Tenor API.
 */
export interface CategoryObject {
  /**
   * The search term that corresponds to the category.
   *
   * The search term is translated to match the locale of the corresponding request.
   */
  searchterm: string;

  /**
   * The URL to initiate a search if the user selects this category.
   */
  path: string;

  /**
   * A URL to the media source for the category's example GIF.
   */
  image: string;

  /**
   * The name of the category to be displayed over the image.
   *
   * The name is translated to match the locale of the corresponding request.
   */
  name: string;
}
