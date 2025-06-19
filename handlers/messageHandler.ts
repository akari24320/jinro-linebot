import { MessageEvent, Client } from "@line/bot-sdk";
import { createRoom, getRoomByGroupId, deleteRoomByGroupId } from "../data/rooms";
import { roomCreateFlex } from "../flexTemplates/roomCreate";

export async function handleMessageEvent(event: MessageEvent, client: Client) {
    
    const groupId = event.source.type === "group" ? event.source.groupId : undefined;

    if (event.message.type === "text" && event.message.text === "@村を作成") {
        // グループID取得（グループでのみ動作）
        if (!groupId) {
            await client.replyMessage(event.replyToken, {
                type: "text",
                text: "この機能はグループでのみ利用できます。"
            });
            return;
        }
        // 既にグループにルームが存在するかチェック
        const room = getRoomByGroupId(groupId!);
        if (room) {
            await client.replyMessage(event.replyToken, {
                type: "text",
                text: "このグループには既に村が作成されています"
            });
            return;
        }
        // 送信者IDでルーム作成
        const userId = event.source.userId || "unknown";
        const newRoom = createRoom(groupId!, userId);
        console.log("ルーム作成:", newRoom);

        await client.replyMessage(event.replyToken, {
            type: "text",
            text: "村を作成しました！",
        });
        return;
    }

    if (event.message.type === "text" && event.message.text === "@終了") {
        const deleted = deleteRoomByGroupId(groupId!);
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

    await client.replyMessage(event.replyToken, roomCreateFlex);
}