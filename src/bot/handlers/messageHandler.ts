import { WebhookEvent } from "@line/bot-sdk";
import type { MessagingApiClient } from "/home/akari/jinro-linebot/node_modules/@line/bot-sdk/dist/messaging-api/api";
import { rooms } from ".././../data/rooms";
import { handleJoinCommand, handleParticipateCommand } from "./joinHandler";
import { handleStartCommand } from "./phaseHandler";

export async function handleEvent(event: WebhookEvent, client: MessagingApiClient) {
  if (event.type !== "message" || event.message.type !== "text") return;

  const text = event.message.text.trim();
  const groupId = event.source.type === "group" ? event.source.groupId : null;

  if (!groupId || !event.source.userId) return;

  switch (text) {
    case "@人狼":
      return handleJoinCommand(client, event);
    case "@参加":
      return handleParticipateCommand(client, event);
    case "@開始":
      return handleStartCommand(client, event);
    // 他のコマンドもここに追加可能
  }
}
