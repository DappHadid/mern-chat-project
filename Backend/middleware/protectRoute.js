import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    // 1. Ambil tiket dari kuki peramban
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Akses ditolak. Anda belum login." });
    }

    // 2. Periksa keaslian tiket
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Akses ditolak. Tiket tidak valid." });
    }

    // 3. Cari pengguna di database tanpa mengambil kata sandinya
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan." });
    }

    // 4. Izinkan masuk dan lanjutkan ke fungsi berikutnya
    req.user = user;
    next();
  } catch (error) {
    console.log("Error di middleware protectRoute:", error.message);
    res.status(500).json({ error: "Kesalahan pada server internal" });
  }
};

export default protectRoute;
