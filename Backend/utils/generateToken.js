import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  // 1. Buat token dengan ID pengguna
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // 2. Simpan token ke dalam cookie browser
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Format milidetik (15 hari)
    httpOnly: true, // Cegah akses dari serangan XSS (Cross-Site Scripting)
    sameSite: "strict", // Cegah serangan CSRF
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
