import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js"; // 1. Impor file rute

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes); // 2. Gunakan rute untuk alamat /api/auth

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server berjalan di port ${PORT}`);
});
