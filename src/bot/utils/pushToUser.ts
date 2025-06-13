import { MessagingApiClient } from "/home/akari/jinro-linebot/node_modules/@line/bot-sdk/dist/messaging-api/api";

export async function pushToUser(client: MessagingApiClient, userId: string, text: string) {
  await client.pushMessage({
    to: userId,
    messages: [{ type: "text", text }],
  });
}