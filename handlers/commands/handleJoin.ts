import { MessageEvent, Client } from "@line/bot-sdk";
import { addMemberToRoom, getRoomByGroupId } from "../../data/rooms";

export async function handleJoin(event: MessageEvent, client: Client) {
    // グループIDを取得（グループでのみ動作）
    const groupId = event.source.type === "group" ? event.source.groupId : undefined;
    if (!groupId) {
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: "この機能はグループでのみ利用できます。"
        });
        return;
    }
    // ユーザーIDを取得
    // LINE Messaging APIでは、グループ内のユーザーIDはevent.source.userIdで取得できる。
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

    let displaName = "あなた";
    try {
        const profile = await client.getProfile(userId);
        displaName = profile.displayName || "あなた";
    } catch (error) {
        console.error("ユーザープロフィールの取得に失敗:", error);
    }

    const added = addMemberToRoom(groupId, userId);

    const memberNames: string[] = [];
    for (const memberId of room.members) {
        try {
            const profile = await client.getProfile(memberId);
            memberNames.push(profile.displayName || "不明なユーザー");
        } catch (error) {
            console.error("ユーザープロフィールの取得に失敗:", error);
            memberNames.push("不明なユーザー");
        }
    }
    const membersList = memberNames.join("、");

    if (added) {
        console.log(`ユーザー追加: ${userId} → ${room.id}`);
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: `${displaName}さんが村に参加しました！\n現在の参加者: ${membersList}`
        });
    } else {
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: `${displaName}さんはすでに村に参加しています。\n現在の参加者: ${membersList}`
        });
    }
    return;
}