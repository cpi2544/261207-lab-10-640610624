import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const roomId = req.query.roomId;

    const room = rooms.find((room) => room.roomId === roomId);
    if (room) {
      res.status(200).json({
        ok: true,
        messages: room.messages,
      });
    } else {
      res.status(404).json({
        ok: false,
        message: "Invalid room Id",
      });
    }
  } else if (req.method === "POST") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const newId = uuidv4();
    const text = req.body.text;

    const room = rooms.find((room) => room.roomId === roomId);
    if (room) {
      if (typeof text !== "string" || text.length < 1) {
        res.status(400).json({
          ok: false,
          message: "Invalid text input",
        });
      } else {
        const newpost = { messagesId: newId, text: text };
        room.messages = [...room.messages, newpost];
        res.status(201).json({
          ok: true,
          messages: newpost,
        });
      }
    } else {
      res.status(404).json({
        ok: false,
        message: "Invalid room Id",
      });
    }
  }
}
