import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // ID ini didapat dari middleware penjaga gerbang

    // 1. Cari riwayat percakapan sebelumnya
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // 2. Buat percakapan baru jika ini adalah chat pertama
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // 3. Buat wujud pesan baru
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // 4. Masukkan pesan ke dalam percakapan
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // 5. Simpan percakapan dan pesan ke database secara bersamaan
    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to().emit() hanya mengirim pesan ke klien tujuan yang spesifik
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    // 6. Kirim respons berhasil ke pengguna
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error di fungsi sendMessage:", error.message);
    res.status(500).json({ error: "Kesalahan pada server internal" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    // Cari percakapan antara pengguna yang sedang login dan teman obrolannya
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // .populate() mengubah deretan ID menjadi wujud teks pesan asli

    // Jika belum pernah mengobrol, kembalikan array kosong
    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error di fungsi getMessages:", error.message);
    res.status(500).json({ error: "Kesalahan pada server internal" });
  }
};
