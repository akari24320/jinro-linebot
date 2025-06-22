import { MessageEvent, Client } from "@line/bot-sdk";
import { getRoomByGroupId, deleteRoomByGroupId } from "../../data/rooms";

// @終了
export async function handleEndRoom(event: MessageEvent, client: Client) {
    const groupId = event.source.type === "group" ? event.source.groupId : undefined;
    
    if (!groupId) {
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: "この機能はグループでのみ利用できます。"
        });
        return;
    }

    const deleted = deleteRoomByGroupId(groupId);
    if (deleted) {
        console.log(`ルーム削除:「${deleted.id}」`, deleted);
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: "村を削除しました。"
        });
    } else {
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: "削除できる村がありません。"
        });
    }
    return;
}