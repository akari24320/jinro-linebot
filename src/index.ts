import express from "express";
import { middleware, Config } from "@line/bot-sdk";
import dotenv from "dotenv";
import ngrok from "ngrok";
import client from "./bot/lineClient";
import { handleEvent } from "./bot/handlers/messageHandler";

dotenv.config();

const channelAccessToken = process.env.CHANNEL_ACCESS_TOKEN;
const channelSecret = process.env.CHANNEL_SECRET;

if (!channelAccessToken || !channelSecret) {
    throw new Error("環境変数 CHANNEL_ACCESS_TOKEN または CHANNEL_SECRET が設定されていません。");
}

const config: Config = {
    channelAccessToken,
    channelSecret,
};
    // const config: Config = {
    // channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
    // channelSecret: process.env.CHANNEL_SECRET || "",
    // };

const app = express();
const port = process.env.PORT || 3000;

app.use("/webhook", middleware(config));
app.post("/webhook", (req, res) => {
  Promise.all(req.body.events.map((event) => handleEvent(event, client)))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error("Error handling webhook:", err);
      res.status(500).end();
    });
});

app.listen(port, async () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  try {
    const url = await ngrok.connect(port);
    console.log(`🌐 Ngrok webhook URL: ${url}/webhook`);
  } catch (err) {
    console.error("❌ Ngrok error:", err);
  }
});
