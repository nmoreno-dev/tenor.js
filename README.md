# tenor.js

## Introduction

`tenor.js` is a simple and easy-to-use wrapper for the Tenor API, enabling quick and effective integrations for searching and sharing GIFs and stickers. This package simplifies the process of interacting with Tenor's extensive multimedia library.

For more detailed information about the Tenor API, visit the [official Tenor API documentation](https://tenor.com/gifapi).

## Installation

Install the package via npm:

```bash
npm install tenor.js
```

## Usage

Basic Example
Here's a quick example of how to use tenor.js to search for GIFs:

```typescript
import { TenorClient } from 'tenor.js';

const client = new TenorClient('YOUR_API_KEY');

async function searchGIFs() {
  const response = await client.search.query({ q: 'funny', limit: 5 });
  console.log(response.results);
}

searchGIFs();
```

## Services

### Search

Search for GIFs, stickers, and other media.

```typescript
Copiar código
const response = await client.search.getGIFs({ q: 'hello', limit: 10 });
```

### Featured

Get a list of the current global featured GIFs.

```typescript
const response = await client.featured.getFeatured({ limit: 5 });
```

### Categories

Retrieve a list of GIF categories.

```typescript
const response = await client.categories.getCategories();
```

### Suggestions

Get a list of alternative search terms for a given search term.

```typescript
const response = await client.suggestions.getSuggestions({ q: 'happy' });
```

### Autocomplete

Fetch a list of completed search terms for a given partial search term.

```typescript
const response = await client.autocomplete.getAutocomplete({ q: 'fun' });
```

### Trending

Fetch a list of the current trending search terms.

```typescript
const response = await client.trending.getTrendingTerms();
```

### Register Share

Register a user's sharing of a GIF or sticker.

```typescript
await client.registerShare.registerShare({ id: 'GIF_ID' });
```

### Posts

Fetch GIFs, stickers, or a combination of both for the specified IDs.

```typescript
const response = await client.posts.getPosts({ ids: 'GIF_ID' });
```

## API Reference

### TenorClient

The TenorClient class provides access to all services available through the Tenor API.

#### Constructor

```typescript
constructor(apiKey: string, clientKey?: string)
```

- apiKey: Your Tenor API key.
- clientKey: Optional. A unique client key to differentiate integrations.

#### Services Overview

- search: Handles searching for GIFs, stickers, and other content.
- featured: Retrieves featured content.
- categories: Fetches available categories.
- suggestions: Provides search suggestions.
- autocomplete: Autocompletes search terms.
- trending: Gets trending search terms.
- registerShare: Registers user shares.
- posts: Fetches posts by ID.

For detailed parameters and examples for each service, refer to the API documentation.

## Configuration

To use tenor.js, you need to configure your API key. Optionally, you can provide a clientKey to differentiate your integrations.

Setting the API Key
You can set the API key when initializing TenorClient:

```typescript
const client = new TenorClient('YOUR_API_KEY');
```

- Optional Configuration
- clientKey: A unique string to differentiate multiple integrations.

## Error Handling

All methods return promises that may reject with errors. Use try...catch blocks or .catch() methods to handle errors.

```typescript
try {
  const response = await client.search.getGIFs({ q: 'oops' });
} catch (error) {
  console.error('Error fetching GIFs:', error);
}
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/my-feature).
3. Commit your changes (git commit -am 'Add some feature').
4. Push to the branch (git push origin feature/my-feature).
5. Create a new Pull Request.

Please make sure your code passes all tests before submitting a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, feel free to open an issue on the GitHub repository.

## Changelog

All notable changes to this project will be documented in this section.

Acknowledgements
Special thanks to the developers at Tenor for providing a robust and versatile API.

## FAQ

Q: How do I get an API key?

A: You can obtain an API key by signing up at the Tenor API website.

Q: Can I use this package in a Node.js environment?

A: Yes, tenor.js is designed to work in both browser and Node.js environments.
