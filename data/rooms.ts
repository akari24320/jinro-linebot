export interface Room {
    id: string;
    groupId: string;
    createdAt: Date;
    members: string[];
}

const rooms: Room[] = [];

export function createRoom(groupId: string, creatorId: string): Room {
    const room: Room = {
        id: `room-${Date.now()}`,
        groupId,
        createdAt: new Date(),
        members: []
    };
    rooms.push(room);
    return room;
}

export function getRoomByGroupId(groupId: string): Room | undefined {
    return rooms.find(room => room.groupId === groupId);
}

export function deleteRoomByGroupId(groupId: string): Room | undefined {
    const idx = rooms.findIndex(room => room.groupId === groupId);
    if (idx !== -1) {
        return rooms.splice(idx, 1)[0];
    }
    return undefined;
}

// join

export function addMemberToRoom(groupId: string, userId: string): boolean {
    const room = rooms.find(room => room.groupId === groupId);
    if (!room) return false;
    if (!room.members.includes(userId)) {
        room.members.push(userId);
        return true;
    }
    return false; // すでに参加済み
}