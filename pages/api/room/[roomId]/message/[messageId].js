import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
  const rooms = readDB();

  const room = rooms.find((room) => room.roomId === roomId);
  if (room) {
    const message_idx = room.messages.findIndex(
      (message) => message.messageId === messageId
    );
    if (message_idx >= 0) {
      room.messages.splice(message_idx, 1);
      res.status(200).json({
        ok: true,
      });
    } else {
      res.status(404).json({
        ok: false,
        message: "Invalid message Id",
      });
    }
  } else {
    res.status(404).json({
      ok: false,
      message: "Invalid room Id",
    });
  }
}
