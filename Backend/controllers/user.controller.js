import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    // Ambil ID pengguna yang sedang login dari tiket (token)
    const loggedInUserId = req.user._id;

    // Cari semua pengguna di database KECUALI pengguna yang sedang login ($ne = not equal)
    // Sembunyikan kata sandi menggunakan .select("-password")
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error di fungsi getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Kesalahan pada server internal" });
  }
};
