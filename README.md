# Google APIs Node.js Client

## Overview

`@princevish/google-apis` is a Node.js client library that simplifies accessing the latest Google APIs, including Google Analytics and Google Search Console. It provides easy-to-use methods to interact with these services using URL-based queries. The library also includes built-in support for OAuth 2.0 authentication, API keys, and JWT tokens, ensuring secure and efficient interaction with Google APIs.

### Key Features:
- Latest Google API Support: Works with the latest versions of Google APIs.
- Easy-to-use functions for Google APIs like Analytics and Search Console.
- OAuth 2.0 integration for secure authentication.
- Automatic token refresh management.
- Simple API query building and request handling using `axios`.

## Installation

```bash
npm install @princevish/google-apis
```

## Usage

### Example: OAuth 2.0 Setup

```javascript
import { ClientGoogleApi } from "@princevish/google-apis";
import express from "express";

const app = express();
const client = new ClientGoogleApi({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uris: process.env.REDIRECT_URIS,
});

// Redirect users to the OAuth2 authorization URL
app.get("/", async (req, res) => {
  const url = await client.getVerificationUrl();
  res.redirect(url);
});

// Handle OAuth2 callback
app.get("/callback", async (req, res) => {
  const code = req.query.code;
  const token = await client.getAccessToken(code);
  res.send(token);
});

// Fetch Google Analytics data
app.get("/analytics", async (req, res) => {
  const data = await client.getAnalyticsData({
    propertyId: "PROPERTY_ID",
    query: {
      startDate: "2024-08-01",
      endDate: "2024-10-01",
      metrics: ["sessions"],
      dimensions: ["country"],
    },
  });
  res.send(data);
});

// Fetch Google Search Console data
app.get("/search-console", async (req, res) => {
  const data = await client.getSearchConsoleData({
    siteUrl: process.env.SITE_URL,
    query: {
      startDate: "2024-08-01",
      endDate: "2024-10-01",
      dimensions: ["query", "page"],
    },
  });
  res.send(data);
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
```

### API Methods

#### 1\. `getVerificationUrl()`

Generates a URL for the user to visit and authenticate their Google account.

```javascript
const url = client.getVerificationUrl();
```

#### 2\. `getAccessToken(code)`

Exchanges an authorization code for an access token.

```javascript
const token = await client.getAccessToken("AUTH_CODE_OR_REDIRECT_URL");
```

#### 3\. `getAnalyticsData({ propertyId, query })`

Fetches Google Analytics data.

```javascript
const analyticsData = await client.getAnalyticsData({
  propertyId: "PROPERTY_ID",
  query: {
    startDate: "2024-08-01",
    endDate: "2024-10-01",
    metrics: ["sessions"],
    dimensions: ["country"],
  },
});
```

#### 4\. `getSearchConsoleData({ siteUrl, query })`

Fetches data from Google Search Console for a given site URL.

```javascript
const searchConsoleData = await client.getSearchConsoleData({
  siteUrl: "https://example.com",
  query: {
    startDate: "2024-08-01",
    endDate: "2024-10-01",
    dimensions: ["query", "page"],
  },
});
```

## Authentication Methods

   **OAuth 2.0**: Supports user consent flows and token refreshing. Ideal for accessing data on behalf of users.


## Examples

Detailed examples are available in the `examples` folder of the repository.

## License

This project is licensed under the MIT License.

---

Feel free to explore the examples and extend this library to other Google APIs!

---

Distributed under the MIT License. See `LICENSE` for more information.

Happy Coding! 🚀

Made with ❤️ by [@princevish](https://github.com/princevish)