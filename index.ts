import express, { Request, Response } from "express";
import { Client, middleware, WebhookEvent, MessageEvent, FollowEvent, JoinEvent } from "@line/bot-sdk";
import dotenv from "dotenv";

dotenv.config();

const CONFIG = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
    channelSecret: process.env.CHANNEL_SECRET || ""
};

if (!CONFIG.channelAccessToken || !CONFIG.channelSecret) {
    throw new Error("LINEの環境変数が設定されていません。");
}

const PORT = 3000;
const client = new Client(CONFIG);

const app = express();

function isReplyableEvent(event: WebhookEvent): event is MessageEvent | FollowEvent | JoinEvent {
    return "replyToken" in event;
}

// ここで express.json() などは使わない！

app.post("/webhook", middleware(CONFIG), async (req: Request, res: Response) => {
    res.status(200).end();
    const events = req.body.events as WebhookEvent[];
    await Promise.all(events.map(async (event) => {
        if (isReplyableEvent(event)) {
            try {
                await client.replyMessage(event.replyToken, { type: "text", text: "こんちゃ！" });
                console.log("event", event);
            } catch (err) {
                console.error("Reply error:", err);
            }
        } else {
            console.log("replyTokenがないイベント:", event.type);
        }
    }));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));