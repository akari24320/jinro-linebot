import express, { Request, Response } from "express";
import { Client, middleware, WebhookEvent, MessageEvent, FollowEvent, JoinEvent } from "@line/bot-sdk";
import dotenv from "dotenv";
import { handleMessageEvent } from "./handlers/messageHandler";

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
        if (event.type === "message") {
            await handleMessageEvent(event as MessageEvent, client);
        } else if (event.type === "join") {
            // グループ招待時の挨拶
            const joinEvent = event as JoinEvent;
            try {
                await client.replyMessage(joinEvent.replyToken, {
                    type: "text",
                    text: "こんにちは！私は人狼ゲームbotです。\n「@人狼」でゲームを始められます。"
                });
            } catch (err) {
                console.error("Reply error:", err);
            }
        } 
        // else if (isReplyableEvent(event)) {
        //     // 他のイベント（例: follow, join）はテキストで返す
        //     try {
        //         await client.replyMessage(event.replyToken, { type: "text", text: "こんにちは！人狼ゲームがしたい場合は、「@人狼」と送ってね！" });
        //     } catch (err) {
        //         console.error("Reply error:", err);
        //     }
        // } 
        else {
            console.log("replyTokenがないイベント:", event.type);
        }
    }));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));