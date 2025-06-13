import type { MessagingApiClient } from "/home/akari/jinro-linebot/node_modules/@line/bot-sdk/dist/messaging-api/api";

export async function getParticipantNames(client: MessagingApiClient, groupId: string, userIds: string[]) {
  const names = await Promise.all(
    userIds.map(async (uid) => {
      try {
        const profile = await client.getGroupMemberProfile(groupId, uid);
        return profile.displayName;
      } catch {
        return "(不明な参加者)";
      }
    })
  );
  return names.map((name, i) => `${i + 1}. ${name}`).join("\n");
}
