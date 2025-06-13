import { messagingApi } from "@line/bot-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = new messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
});

export default client;
