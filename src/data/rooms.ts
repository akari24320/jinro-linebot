// bot/state/rooms.ts
export interface Room {
  id: string;
  players: string[]; // userIdの配列
  started: boolean;
}

export const rooms = new Map<string, Room>();
