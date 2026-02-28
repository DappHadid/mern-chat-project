import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

// Pasang penjaga gerbang agar hanya pengguna yang sudah login yang bisa melihat daftar
router.get("/", protectRoute, getUsersForSidebar);

export default router;
