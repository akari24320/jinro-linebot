import { MessageEvent, Client } from "@line/bot-sdk";
import { handleJinro, handleCreateRoom, handleJoin, handleEndRoom } from "./commands/Handlers";

export async function handleMessageEvent(event: MessageEvent, client: Client) {
    if (event.message.type !== "text") return;
    const text = event.message.text;

    switch (text) {
        case "@人狼":
            await handleJinro(event, client);
            break;
        case "@村を作成":
            await handleCreateRoom(event, client);
            break;
        case "@参加":
            await handleJoin(event, client);
            break;
        case "@終了":
            await handleEndRoom(event, client);
            break;
        // 今後コマンド追加もここに
        default:
            // 未知のコマンドは無視 or ヘルプ表示
            break;
    }
}


// import { MessageEvent, Client } from "@line/bot-sdk";
// import { addMemberToRoom, getRoomByGroupId, createRoom, deleteRoomByGroupId } from "../data/rooms";
// import { roomCreateFlex } from "../flexTemplates/roomCreate";

// export async function handleMessageEvent(event: MessageEvent, client: Client) {
    
//     const groupId = event.source.type === "group" ? event.source.groupId : undefined;

//     if (event.message.type === "text" && event.message.text === "@人狼") {
//         await client.replyMessage(event.replyToken, roomCreateFlex);
//         return;
//     }

//     if (event.message.type === "text" && event.message.text === "@村を作成") {
//         // グループID取得（グループでのみ動作）
//         if (!groupId) {
//             await client.replyMessage(event.replyToken, {
//                 type: "text",
//                 text: "この機能はグループでのみ利用できます。"
//             });
//             return;
//         }
//         // 既にグループにルームが存在するかチェック
//         const room = getRoomByGroupId(groupId!);
//         if (room) {
//             await client.replyMessage(event.replyToken, {
//                 type: "text",
//                 text: "このグループには既に村が作成されています"
//             });
//             return;
//         }
//         // 送信者IDでルーム作成
//         const userId = event.source.userId || "unknown";
//         const newRoom = createRoom(groupId!, userId);
//         console.log("ルーム作成:", newRoom);

//         await client.replyMessage(event.replyToken, {
//             type: "text",
//             text: "村を作成しました！「@参加」で村に参加してください。",
//         });
//         return;
//     }

//     if (event.message.type === "text" && event.message.text === "@終了") {
//         const deleted = deleteRoomByGroupId(groupId!);
//         if (deleted) {
//             console.log(`ルーム削除:「${deleted.id}」`, deleted);
//             await client.replyMessage(event.replyToken, {
//                 type: "text",
//                 text: "村を削除しました。"
//             });
//         } else {
//             await client.replyMessage(event.replyToken, {
//                 type: "text",
//                 text: "削除できる村がありません。"
//             });
//         }
//         return;
//     }

//     if (event.message.type === "text" && event.message.text === "@参加") {
//         if (!groupId) {
//             await client.replyMessage(event.replyToken, {
//                 type: "text",
//                 text: "この機能はグループでのみ利用できます。"
//             });
//             return;
//         }
//         const userId = event.source.userId;
//         if (!userId) {
//             await client.replyMessage(event.replyToken, {
//                 type: "text",
//                 text: "ユーザー情報が取得できませんでした。"
//             });
//             return;
//         }
//         const room = getRoomByGroupId(groupId);
//         if (!room) {
//             await client.replyMessage(event.replyToken, {
//                 type: "text",
//                 text: "まず「@村を作成」で村を作成してください。"
//             });
//             return;
//         }

//         // ユーザー名取得
//         let displayName = "あなた";
//         try {
//             const profile = await client.getProfile(userId);
//             displayName = profile.displayName;
//         } catch (e) {
//         // 取得できない場合は「あなた」
//         }

//         const added = addMemberToRoom(groupId, userId);

//         // 参加者名一覧を取得
//         const memberNames: string[] = [];
//         for (const memberId of room.members) {
//             try {
//                 const profile = await client.getProfile(memberId);
//                 memberNames.push(profile.displayName);
//             } catch {
//                 memberNames.push("不明なユーザー");
//             }
//         }
//         const membersText = memberNames.join("、");

//         if (added) {
//             console.log(`ユーザー追加: ${userId} → ${room.id}`);
//             await client.replyMessage(event.replyToken, {
//                 type: "text",
//                 text: `${displayName}さんが村に参加しました！\n現在の参加者：${membersText}`
//             });
//         } else {
//             await client.replyMessage(event.replyToken, {
//                 type: "text",
//                 text: `${displayName}さんはすでに村に参加しています。\n現在の参加者：${membersText}`
//             });
//         }
//         return;
//     }
// }