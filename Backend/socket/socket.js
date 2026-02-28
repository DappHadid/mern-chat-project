import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"], // Port frontend React kita nanti
    methods: ["GET", "POST"],
  },
});

// Fungsi untuk mendapatkan ID soket penerima pesan spesifik
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // Format penyimpanan: {userId: socketId}

io.on("connection", (socket) => {
  console.log("Pengguna terhubung:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Kirim status "online" ke semua pengguna yang terhubung
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("Pengguna terputus:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
