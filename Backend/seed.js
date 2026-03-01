import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import Message from "./models/message.model.js";
import Conversation from "./models/conversation.model.js";

dotenv.config();

const seedDB = async () => {
  try {
    // 1. Hubungkan ke Database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Terhubung ke MongoDB!");

    // 2. Bersihkan semua data lama
    await User.deleteMany();
    await Message.deleteMany();
    await Conversation.deleteMany();
    console.log("Data lama berhasil dibersihkan.");

    // 3. Buat data pengguna baru
    const user1 = await User.create({
      fullName: "Daffa Maulana",
      email: "daffa@example.com",
      password: "password123", // Gunakan hash bcrypt jika skema Anda mewajibkannya
      profilePic: "",
    });

    const user2 = await User.create({
      fullName: "Budi Santoso",
      email: "budi@example.com",
      password: "password123",
      profilePic: "",
    });
    console.log("Pengguna berhasil dibuat.");

    // 4. Buat riwayat pesan
    const msg1 = await Message.create({
      senderId: user1._id,
      receiverId: user2._id,
      message: "Halo Budi! Proyek Rakit sudah sampai mana?",
    });

    const msg2 = await Message.create({
      senderId: user2._id,
      receiverId: user1._id,
      message: "Halo Daffa! Sedang mengurus integrasi Midtrans nih.",
    });
    console.log("Pesan berhasil dibuat.");

    // 5. Rangkai pesan ke dalam satu percakapan
    await Conversation.create({
      participants: [user1._id, user2._id],
      messages: [msg1._id, msg2._id],
    });
    console.log("Percakapan berhasil dirangkai. Seeder selesai!");

    // 6. Matikan proses otomatis
    process.exit();
  } catch (error) {
    console.error("Gagal menjalankan seeder:", error);
    process.exit(1);
  }
};

seedDB();

// Buat jalanin nya di terminal dengan perintah `npm run seed`
// setelah pastikan MongoDB sudah jalan dan variabel lingkungan `MONGO_URI` sudah diatur dengan benar.
