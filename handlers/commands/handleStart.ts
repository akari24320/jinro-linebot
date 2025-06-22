import { MessageEvent, Client } from "@line/bot-sdk";
import { getRoomByGroupId } from "../../data/rooms";
import { rolePatterns } from "../../patterns";
import { rolePatternSelectFlex } from "../../flexTemplates/rolePatternSelect";

export async function handleStart(event: MessageEvent, client: Client) {
    const groupId = event.source.type === "group" ? event.source.groupId : undefined;
    if (!groupId) return;

    const room = getRoomByGroupId(groupId);
    if (!room) return;

    const memberCount = room.members.length;
    const patterns = rolePatterns[memberCount];
    if (!patterns) {
        await client.replyMessage(event.replyToken, {
            type: "text",
            text: "この人数では開始できません。参加者は最低3人必要です。"
        });
        return;
    }

    // 役職パターン選択の促しとFlexメッセージを送信
    await client.replyMessage(event.replyToken, [
        {
            type: "text",
            text: "役職パターンを選択してください。"
        },
        rolePatternSelectFlex(patterns)
    ]);
    // await client.replyMessage(event.replyToken, rolePatternSelectFlex(patterns));
}