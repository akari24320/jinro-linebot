import {MessagingApiClient } from "/home/akari/jinro-linebot/node_modules/@line/bot-sdk/dist/messaging-api/api";
import { MessageEvent} from "@line/bot-sdk";
import { rooms } from "../../data/rooms";
import { getParticipantNames } from "../utils/getParticipantNames";
import { assignRoles } from "../../game/roleAssigner";
import { pushToUser } from "../utils/pushToUser";

export async function handleStartCommand(client: MessagingApiClient, event: MessageEvent) {
  const groupId = event.source.groupId!;
  const room = rooms.get(groupId);

  if (!room) {
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: "text", text: "まだゲームが作成されていません。「@人狼」で作成してください。" }],
    });
    return;
  }

  if (room.started) {
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: "text", text: "すでにゲームが開始されています！" }],
    });
    return;
  }

  const count = room.players.length;
  if (count < 4 || count > 6) {
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [{
        type: "text",
        text: `参加者は4〜6人である必要があります。\n現在の参加者数: ${count}人`,
      }],
    });
    return;
  }

  const participantText = await getParticipantNames(client, groupId, room.players);
  await client.replyMessage({
    replyToken: event.replyToken,
    messages: [{
      type: "text",
      text: `ゲームを開始します！\n\n最終的な参加者（${count}人）:\n${participantText}`
    }],
  });

  // 今後：ここで役職配布・DM処理に移行
  // 役職を割り当てる（userIdをキーにした役職名のオブジェクトを返す想定）
const assignments = assignRoles(room.players);

// それぞれのプレイヤーにDMで役職を通知
for (const userId of room.players) {
  const role = assignments[userId];
  await pushToUser(client, userId, `あなたの役職は【${role}】です。ゲームを楽しんでください！`);
}


  room.started = true;
}
