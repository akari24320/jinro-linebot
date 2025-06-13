import { MessagingApiClient } from "/home/akari/jinro-linebot/node_modules/@line/bot-sdk/dist/messaging-api/api";
import { MessageEvent } from "@line/bot-sdk";
import { rooms } from "../../data/rooms";
import { getParticipantNames } from "../utils/getParticipantNames";

export async function handleJoinCommand(client: MessagingApiClient, event: MessageEvent) {
  const groupId = event.source.groupId!;
  const userId = event.source.userId!;

  const room = rooms.get(groupId);
  if (room) {
    const participantText = await getParticipantNames(client, groupId, room.players);
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [{
        type: "text",
        text: `すでにこのグループでゲームが作成されています。\n現在の参加者（${room.players.length}人）:\n${participantText}`
      }],
    });
  } else {
    rooms.set(groupId, { id: groupId, players: [userId], started: false });
    const participantText = await getParticipantNames(client, groupId, [userId]);
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [{
        type: "text",
        text: `人狼ゲームのルームを作成しました！\n他の人は「@参加」で参加してください。\n\n現在の参加者（1人）:\n${participantText}`
      }],
    });
  }
}

export async function handleParticipateCommand(client: MessagingApiClient, event: MessageEvent) {
  const groupId = event.source.groupId!;
  const userId = event.source.userId!;

  const room = rooms.get(groupId);
  if (!room) {
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: "text", text: "まだゲームが作成されていません。「@人狼」で作成してください。" }],
    });
    return;
  }

  if (room.players.includes(userId)) {
    const participantText = await getParticipantNames(client, groupId, room.players);
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [{
        type: "text",
        text: `あなたはすでに参加しています！\n\n現在の参加者（${room.players.length}人）:\n${participantText}`
      }],
    });
    return;
  }

  room.players.push(userId);
  const participantText = await getParticipantNames(client, groupId, room.players);
  await client.replyMessage({
    replyToken: event.replyToken,
    messages: [{
      type: "text",
      text: `参加を受け付けました！\n\n現在の参加者（${room.players.length}人）:\n${participantText}`
    }],
  });
}
