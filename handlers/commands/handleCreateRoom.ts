import { MessageEvent, Client } from "@line/bot-sdk";
import { getRoomByGroupId, createRoom } from "../../data/rooms";
import { roomJoinFlex } from "../../flexTemplates/roomJoin";

export async function handleCreateRoom(event: MessageEvent, client: Client) {
    const groupId = event.source.type === "group" ? event.source.groupId : undefined;
    if (!groupId) {
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: "この機能はグループでのみ利用できます。"
        });
        return;
    }

    const room = getRoomByGroupId(groupId);
    if (room) {
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: "このグループには既に村が作成されています"
        });
        return;
    }

    const userId = event.source.userId || "unknown";
    const newRoom = createRoom(groupId, userId);
    console.log("ルーム作成:", newRoom);

    await client.replyMessage(event.replyToken, roomJoinFlex);
}