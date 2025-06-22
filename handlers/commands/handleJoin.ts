import { MessageEvent, Client } from "@line/bot-sdk";
import { addMemberToRoom, getRoomByGroupId } from "../../data/rooms";

export async function handleJoin(event: MessageEvent, client: Client) {
    const groupId = event.source.type === "group" ? event.source.groupId : undefined;
    if (!groupId) {
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: "この機能はグループでのみ利用できます。"
        });
        return;
    }
    const userId = event.source.userId;
    if (!userId) {
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: "ユーザー情報が取得できませんでした。"
        });
        return;
    }

    const room = getRoomByGroupId(groupId);
    if (!room) {
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: "このグループには村が存在しません。まず「@村を作成」で村を作成してください。"
        });
        return;
    }

    // 友だち追加チェック
    let displayName = "あなた";
    try {
        const profile = await client.getProfile(userId);
        displayName = profile.displayName || "あなた";
    } catch (error) {
        // 友だち追加していない場合
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: "村に参加するには、このBotを友だち追加してください！\n友だち追加後、もう一度「@参加」と送信してください。"
        });
        return;
    }

    const added = addMemberToRoom(groupId, userId);

    const memberNames: string[] = [];
    for (const memberId of room.members) {
        try {
            const profile = await client.getProfile(memberId);
            memberNames.push(profile.displayName || "不明なユーザー");
        } catch (error) {
            memberNames.push("不明なユーザー");
        }
    }
    const membersList = memberNames.join("、");

    if (added) {
        console.log(`ユーザー追加: ${userId} → ${room.id}`);
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: `${displayName}さんが村に参加しました！\n現在の参加者: ${membersList}`
        });
    } else {
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: `${displayName}さんはすでに村に参加しています。\n現在の参加者: ${membersList}`
        });
    }
    return;
}