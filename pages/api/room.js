import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const rooms = readDB();
  res.status(200).json({
    ok: true,
    rooms: rooms.map((room) => {
      return {
        roomId: room.roomId,
        roomName: room.roomName,
      };
    }),
  });
}
