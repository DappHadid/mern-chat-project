import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "Semua kolom wajib diisi" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email sudah terdaftar" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const profilePic = `https://avatar.iran.liara.run/public?username=${fullName}`;

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      profilePic,
    });

    if (newUser) {
      // Cetak token dan simpan ke kuki peramban
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Data pengguna tidak valid" });
    }
  } catch (error) {
    console.log("Error di fungsi signup:", error.message);
    res.status(500).json({ error: "Kesalahan pada server internal" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Cari pengguna berdasarkan email
    const user = await User.findOne({ email });

    // 2. Cocokkan kata sandi
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Email atau kata sandi salah" });
    }

    // 3. Cetak token jika berhasil masuk
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error di fungsi login:", error.message);
    res.status(500).json({ error: "Kesalahan pada server internal" });
  }
};

export const logout = async (req, res) => {
  try {
    // Hapus token dengan mengosongkan kuki
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Berhasil keluar" });
  } catch (error) {
    console.log("Error di fungsi logout:", error.message);
    res.status(500).json({ error: "Kesalahan pada server internal" });
  }
};
