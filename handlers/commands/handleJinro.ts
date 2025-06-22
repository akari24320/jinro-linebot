import { MessageEvent, Client } from "@line/bot-sdk";
import { roomCreateFlex } from "../../flexTemplates/roomCreate";

export async function handleJinro(event: MessageEvent, client: Client) {
    await client.replyMessage(event.replyToken, roomCreateFlex);
}