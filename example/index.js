import { ClientGoogleApi } from "@princevish/google-apis";
import express from "express";

const app = express();
const client = new ClientGoogleApi({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uris: process.env.REDIRECT_URIS,
});

app.get("/", async (req, res) => {
  const url = await client.getVerificationUrl();
  res.redirect(url);
});

app.get("/auth", async (req, res) => {
  const token = (await client.init()).credentials;
  res.send(token);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;
  const token = await client.getAccessToken(code);
  res.send(token);
});

app.get("/analytics", async (req, res) => {
  const token = await client.getAnalyticsData({
    propertyId: 458631734,
    query: {
      startDate: "2024-08-01",
      endDate: "2024-10-01",
      metrics: ["sessions"],
      dimensions: ["country"],
    },
  });
  res.send(token);
});

app.get("/search-console", async (req, res) => {
    const token = await client.getSearchConsoleData({
    siteUrl: process.env.SITE_URL,
      query: {
        startDate: "2024-08-01",
        endDate: "2024-10-01",
        dimensions: ["query", "page"],
      },
    });
  res.send(token);
});

app.listen(8080, () => {
  console.log("Listening on 8080");
});
